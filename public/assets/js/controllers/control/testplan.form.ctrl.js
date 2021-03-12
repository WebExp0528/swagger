(function () {
  TestPlanFormController.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    'OPRiskService',
    'Utils',
    'ControlService',
    '$filter',
    'ControlTestDataService',
  ];
  app.controller('TestPlanFormCtrl', TestPlanFormController);

  function TestPlanFormController(
    $scope,
    $rootScope,
    $state,
    OPRiskService,
    Utils,
    ControlService,
    $filter,
    ControlTestDataService
  ) {
    $scope.mainTitle = $state.current.title;
    $scope.mainDesc = 'Add Control Test Plan';

    $scope.isEdit = false;

    $scope.Form = {};
    $scope.VM = {
      controlDataModel: [],
      controlFrequency: '',
      controlMethod: '',
      controlPriority: '',
      controlStatus: '',
      department: [{ deptName: '', deptId: '' }],
      nextDueDate: '',
      regionName: '',
      testDueDate: '',
      testPlanDesc: '',
      testPlanFile: '',
      testPlanName: '',
      testplanFileModel: [],
      controlTestData: [],
    };

    $scope.addControls = function () {
      $scope.VM.controlDataModel = [];
      var headers = [
          'Control Category',
          'Control ID',
          'Control Name',
          'Control Source',
          'Business Procee',
          'Owner',
        ],
        cols = [
          'controlCategory',
          'controlRefID',
          'controlName',
          'controlSource',
          'businessProcess',
          'controlOwner',
        ];

      //:TODO: show control name

      // category

      // source

      $rootScope.app.Mask = true;
      OPRiskService.GetControlData().then(function (data) {
        data.forEach(function (c, i) {
          c.Selected = false;
          c.modifiedOn = Utils.createDate(c.modifiedOn);
        });
        var controlModal = Utils.CreateSelectListView(
          'Select Controls',
          data,
          headers,
          cols
        );
        controlModal.result.then(function (list) {
          $scope.isEdit = true;
          $scope.VM.controlDataModel = $scope.VM.controlDataModel.concat(list);
        });
        $rootScope.app.Mask = false;
      });
    };

    $scope.removeItem = function (type, idx) {
      $scope.VM[type].splice(idx, 1);
    };

    $scope.submitAction = function () {
      if ($scope.Form.TestPlan.$invalid) return false;
      $rootScope.app.Mask = true;

      var dtype = 'YYYY-MM-DD';
      var d1 = moment($scope.VM.testDueDate);
      var d2 = moment($scope.VM.nextDueDate);
      $scope.VM.testDueDate = d1.isValid() ? d1.format(dtype) : '';
      $scope.VM.nextDueDate = d2.isValid() ? d2.format(dtype) : '';
      $scope.VM.testDueDateStr = $scope.VM.testDueDate;
      $scope.VM.nextDueDateStr = $scope.VM.nextDueDate;

      var tmpdept = $filter('filter')(
        $rootScope.app.Lookup.Departments,
        { deptId: $scope.VM.department[0].deptId },
        true
      );

      $scope.VM.department[0] = tmpdept[0];

      var fileModel = $scope.VM.testplanFileModel;
      var d = new Date();
      var idd = 'Pol' + d.getTime();
      $scope.VM.key = idd;
      ControlService.FileUpload(idd, fileModel)
        .then(function (res) {
          if (res.status === 200) {
            for (var i in fileModel) {
              fileModel[i].id = res.data.fileId;
              fileModel[i].filePath = res.data.path;
            }
          }
        })
        .finally(function () {
          ControlService.AddTestPlans($scope.VM)
            .then(function (res) {
              console.log('res', res);
            })
            .finally(function () {
              $state.go('app.control.testplan.main');
            });
        });
    };

    $scope.downloadExcel = function () {
      console.log($scope.VM.controlDataModel);

      var tmpdept = $filter('filter')(
        $rootScope.app.Lookup.Departments,
        { deptId: $scope.VM.department[0].deptId },
        true
      );
      $scope.VM.department[0] =
        typeof tmpdept !== 'undefined' && tmpdept.length > 0
          ? tmpdept[0]
          : { deptId: '', deptName: '' };

      var data = {};
      data.heights = [];
      data.sheetName = 'Control Test Plan';
      data.filename = 'output.xlsx';
      data.body = [];
      var testPlan_data = [
        [
          'Test Plan Name',
          angular.isUndefined($scope.VM.testPlanName)
            ? ''
            : $scope.VM.testPlanName + '',
          '',
          'Test Plan Desc',
          angular.isUndefined($scope.VM.testPlanDesc)
            ? ''
            : $scope.VM.testPlanDesc + '',
        ],
        [
          'Region',
          angular.isUndefined($scope.VM.regionName)
            ? ''
            : $scope.VM.regionName + '',
          '',
          'Department',
          angular.isUndefined($scope.VM.department[0].deptName)
            ? ''
            : $scope.VM.department[0].deptName + '',
        ],
        [
          'Test Due Date',
          angular.isUndefined($scope.VM.testDueDate)
            ? ''
            : $scope.VM.testDueDate + '',
          '',
          'Next Due Date',
          angular.isUndefined($scope.VM.nextDueDate)
            ? ''
            : $scope.VM.nextDueDate + '',
        ],
        [
          'Test Plan File Name',
          angular.isUndefined($scope.VM.testPlanFile)
            ? ''
            : $scope.VM.testPlanFile + '',
          '',
          'Test Frequency',
          angular.isUndefined($scope.VM.controlFrequency)
            ? ''
            : $scope.VM.controlFrequency + '',
        ],
      ];

      for (var i = 0; i < testPlan_data.length; i++) {
        for (var j = 0; j <= 4; j++) {
          data.body.push({
            col: +j + 2,
            row: +i + 2,
            text: testPlan_data[i][j],
            font: {
              name: 'Calibri',
              sz: '11',
              family: '3',
              scheme: '-',
              bold: 'true',
              iter: 'true',
            },
            fill: { type: 'solid', fgColor: 'adadad' },
            border: {
              left: 'thin',
              top: 'thin',
              right: 'thin',
              bottom: 'thin',
            },
            wrap: 'true',
            align: 'center',
          });
        }
        data.heights.push({ row: +i + 2, height: 30 });
      }

      var head_txt = [
        'Control Name',
        'Control Desc',
        'Control Source',
        'Control Category',
        'Control Version',
        'Control Active',
        'Business Process',
        'Sub Process',
        'Start Date',
        'End Date',
        'Control Type',
        'Risk Type',
        'Nature of Control',
        'Control Frequency',
        'Supporting IT Application',
        'Control Owner',
        'Control Test Plan',
        'Control Ref ID',
        'Control Definition',
      ];
      for (var i = 0; i < head_txt.length; i++) {
        data.body.push({
          col: +i + 1,
          row: 7,
          text: head_txt[i],
          font: { name: 'Calibri', sz: '11', family: '3', scheme: '-' },
          fill: { type: 'solid', fgColor: '99b8ca' },
          border: { left: 'thin', top: 'thin', right: 'thin', bottom: 'thin' },
          wrap: 'true',
        });
      }
      data.heights.push({ row: 7, height: 30 });

      var control_data = $scope.VM.controlDataModel;
      var num = 8;
      var newObj = [];
      angular.forEach(control_data, function (obj, ind) {
        newObj.push([
          obj.controlName,
          obj.controlDescription,
          obj.controlSource,
          obj.controlCategory,
          obj.controlVersionNumber,
          obj.active,
          obj.businessProcess,
          obj.subprocess,
          moment(obj.controlEffectiveStartdateStr).format('MM-DD-YYYY'),
          moment(obj.controlEffectiveEnddateStr).format('MM-DD-YYYY'),
          obj.controlType,
          obj.riskTypes,
          obj.natureOfControl,
          obj.controlFrequency,
          obj.supportingITApplication,
          obj.controlOwner,
          obj.controlTestPlan,
          obj.controlRefID,
          obj.controlDefinition,
        ]);
        num++;
      });

      data.commonData = {
        data: newObj,
        font: { name: 'Calibri', sz: '11', family: '2', scheme: '-' },
        border: { left: 'thin', top: 'thin', right: 'thin', bottom: 'thin' },
        wrap: 'true',
        height: 30,
        srow: 8,
        scol: 1,
      };

      data.cols = 21;
      data.rows = num * 1 + 2;

      var wval = [
        30,
        30,
        15,
        15,
        15,
        15,
        15,
        15,
        15,
        15,
        15,
        15,
        15,
        15,
        15,
        15,
        15,
        15,
        15,
        15,
      ];
      data.widths = [];
      for (var i = 0; i < wval.length; i++) {
        data.widths.push({ col: +i + 1, width: wval[i] });
      }

      ControlService.DownloadExcel(data)
        .then(function (response) {
          var nodeUrl = $rootScope.app.NodeApi;
          location.assign(nodeUrl + '/downloadExcel/' + response.data);
        })
        .catch(function (error) {
          console.log('error!');
        });
    };

    $scope.cancelAction = function () {
      if ($scope.Form.TestPlan.$dirty || $scope.isEdit) {
        var confirm = Utils.CreateConfirmModal(
          'Confirmation',
          'Do you want to cancel and if yes you should go back to previous screen',
          'Yes',
          'No'
        );
        confirm.result.then(function () {
          $state.go('app.control.testplan.main');
        });
        return false;
      }
      $state.go('app.control.testplan.main');
    };

    $rootScope.app.Mask = false;

    /**
     * Save edit status of milestones table
     *
     */
    $scope.opened = {};

    $scope.open = function ($event, elementOpened) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened[elementOpened] = !$scope.opened[elementOpened];
    };

    /**
     * Save milestone
     *
     * @param {*} data
     * @param {*} id
     */
    $scope.saveTestData = function (data, index) {
      const {
        controlName,
        controlDescription,
        controlFrequency,
        controlType,
        design,
        controlTypeLevel1,
      } = data;
      var tempDataModel = {
        ...$scope.VM.controlDataModel[index],
        controlName,
        controlDescription,
        controlFrequency,
        controlType,
      };
      $scope.VM.controlDataModel[index] = tempDataModel;

      var tmpTestData = {
        ...$scope.VM.controlTestData[index],
        design,
        controlTypeLevel1,
      };
      $scope.VM.controlTestData[index] = tmpTestData;
    };

    /**
     * Remove milestone
     * @param {*} index
     */
    $scope.removeTestData = function (index) {
      $scope.VM.controlTestData.splice(index, 1);
      $scope.VM.controlDataModel.splice(index, 1);
    };

    /**
     * Add new test data
     */
    $scope.createNewTestData = function () {
      if ($scope.VM.controlTestData && $scope.VM.controlTestData.length) {
        $scope.VM.controlTestData[$scope.VM.controlTestData.length] = {};
      } else {
        $scope.VM.controlTestData = [{}];
      }
      console.log('~~~ creaetd new test plan data', $scope.VM.controlTestData);
    };

    $scope.addTestData = function () {
      $scope.VM.controlTestData = [];
      var headers = [
          'Description',
          'Operating Effectiveness',
          'Accountability',
          'Design Effectiveness',
          'Performance',
          'Justification',
        ],
        cols = [
          'description',
          'controlTypeLevel1',
          'accountability',
          'design',
          'performance',
          'justification',
        ];

      $rootScope.app.Mask = true;
      ControlTestDataService.Get().then(function (data) {
        data.forEach(function (c, i) {
          c.Selected = false;
          c.modifiedOn = Utils.createDate(c.modifiedOn);
        });
        var controlTestDataModel = Utils.CreateSelectListView(
          'Select Test Data',
          data,
          headers,
          cols
        );
        controlModal.result.then(function (list) {
          $scope.isEdit = true;
          $scope.VM.controlTestData = $scope.VM.controlTestData.concat(list);
        });
        $rootScope.app.Mask = false;
      });
    };
  }
})();
