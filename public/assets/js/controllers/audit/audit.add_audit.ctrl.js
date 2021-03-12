(function () {
  AuditADController.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$uibModal',
    '$filter',
    'AuditService',
    'Utils',
    'RiskService',
  ];
  app.controller('AuditAdd_AuditCtrl', AuditADController);

  function AuditADController(
    $scope,
    $rootScope,
    $state,
    $uibModal,
    $filter,
    AuditService,
    Utils,
    RiskService
  ) {
    var vm = this;
    vm.mainTitle = $state.current.title;
    vm.mainDesc = 'Add Audit';

    vm.isEdit = false;
    vm.enableTopicConfirmation = true;
    vm.isAuditSaved = false;

    vm.formdata = {
      auditName: '',
      auditDesc: '',
      region: '',
      department: '',
      auditStatus: 'Draft',
      auditControlValidated: '',
      dateOccurance: '',
      dueDate: '',
      resUserName: '',
      priority: '',
      policies: [],
      controlDataModel: [],
      auditFileModel: [],
      riskProfileModel: [],
      controlTestPlanModel: [],
      milestones: [{}],
      auditRiskScores: [],
      rcsaid: [],
    };

    $rootScope.app.Mask = false;
    vm.submitAction = function () {
      $rootScope.app.Mask = true;
      if (vm.isAuditSaved === true) {
        $rootScope.app.Mask = false;
        $state.go('app.audit.main');
        return false;
      }

      if (vm.Form.addAudit.$invalid) return false;
      var dtype = 'YYYY-MM-DD';
      var d1 = moment(vm.formdata.dateOccurance);
      var d2 = moment(vm.formdata.dueDate);
      vm.formdata.dateOccurance = d1.isValid() ? d1.format(dtype) : '';
      vm.formdata.dueDate = d2.isValid() ? d2.format(dtype) : '';
      vm.formdata.dateOccuranceDtStr = vm.formdata.dateOccurance;
      vm.formdata.dueDtStr = vm.formdata.dueDate;

      /**
       * Validate milestone data
       */
      var milestoneStartDate = moment(
        vm.formdata.milestones[0].control_Effective_Startdate
      );
      var milestoneEndDate = moment(
        vm.formdata.milestones[0].control_Effective_Enddate
      );
      vm.formdata.milestones[0].control_Effective_Startdate = milestoneStartDate.isValid()
        ? milestoneStartDate.format(dtype)
        : '';
      vm.formdata.milestones[0].control_Effective_Enddate = milestoneEndDate.isValid()
        ? milestoneEndDate.format(dtype)
        : '';

      if (vm.formdata.stakeholdersVM != null) {
        vm.formdata.stakeholders = [];
        vm.formdata.stakeholdersVM.forEach(function (data, i) {
          vm.formdata.stakeholders.push(data.name);
        });
      }

      var fileModel = vm.formdata.auditFileModel;
      var d = new Date();
      var idd = 'Aud' + d.getTime();
      AuditService.FileUpload(idd, fileModel)
        .then(function (res) {
          if (res.status === 200) {
            for (var i in fileModel) {
              fileModel[i].id = res.data.fileId;
              fileModel[i].filePath = res.data.path;
            }
          }
        })
        .finally(function () {
          var audit_id = '';
          var confirmation = '';
          console.log('~~~~ submitting', vm.formdata);
          AuditService.AddAudits(vm.formdata)
            .then(function (res) {
              console.log('add audit res', res);
              audit_id = res.data.id;
              if (audit_id) {
                vm.isAuditSaved = true;
              }
            })
            .finally(function () {
              if (vm.enableTopicConfirmation) {
                vm.enableTopicConfirmation = false;
                $rootScope.app.Mask = false;
                var confirmation = Utils.CreateConfirmModal(
                  'Confirm New Topic',
                  'Are you sure you want to create new topic',
                  'Yes',
                  'No'
                );
                confirmation.result.then(function () {
                  if (audit_id == '') return;
                  $rootScope.app.Mask = true;
                  $state.go('app.audit.add_topic', { audit_id: audit_id });
                });
              } else {
                $state.go('app.audit.main');
              }
            });
        });
    };

    vm.addControls = function () {
      //$rootScope.app.Mask = true;
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

      AuditService.GetControlData().then(function (data) {
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
          vm.isEdit = true;
          vm.formdata.controlDataModel = vm.formdata.controlDataModel.concat(
            list
          );
        });
        //$rootScope.app.Mask = false;
      });
    };

    $scope.addRiskProfiles = function () {
      var headers = [
          'Risk Description',
          'Category',
          'Inherent Risk',
          'Residual Risk',
          'Risk Direction',
          'Risk Accepted',
        ],
        cols = [
          'riskDescription',
          'riskCategory',
          'inherentRiskRating',
          'residualRisk',
          'riskDirection',
          'riskAccepted',
        ];

      $rootScope.app.Mask = true;
      RiskService.GetRiskProfile().then(function (data) {
        data.forEach(function (c, i) {
          c.Selected = false;
          c.modifiedOn = Utils.createDate(c.modifiedOn);
        });
        var profileModal = Utils.CreateSelectListView(
          'Select Risk Profiles',
          data,
          headers,
          cols
        );
        profileModal.result.then(function (list) {
          $scope.isEdit = true;
          $scope.vm.formdata.riskProfileModel = $scope.vm.formdata.riskProfileModel.concat(
            list
          );
          $rootScope.riskProfileModel = $scope.vm.formdata.riskProfileModel;
        });
        $rootScope.app.Mask = false;
      });
    };

    $scope.editStakeholders = function () {
      var headers = ['Stakeholders'],
        cols = ['name'];

      $rootScope.app.Mask = true;
      var stakeholdersData = [...$rootScope.app.Lookup.Users];
      stakeholdersData.forEach(function (c, i) {
        c.Selected = false;
      });
      var stakeholderModal = Utils.CreateSelectListView(
        'Select Stakeholders',
        stakeholdersData,
        headers,
        cols
      );
      stakeholderModal.result.then(function (list) {
        $scope.isEdit = true;
        if ($scope.vm.formdata.stakeholdersVM == null) {
          $scope.vm.formdata.stakeholdersVM = [];
        }
        $scope.vm.formdata.stakeholdersVM = $scope.vm.formdata.stakeholdersVM.concat(
          list
        );
      });
      $rootScope.app.Mask = false;
    };

    $scope.addControlTestPlans = function () {
      var headers = [
          'Test Plan',
          'Region',
          'Department',
          'Active',
          'Control Tested',
          'Control Method',
        ],
        cols = [
          'testPlanName',
          'regionName',
          'deptName',
          'active',
          'controlTested',
          'controlMethod',
        ];

      $rootScope.app.Mask = true;
      RiskService.GetControlTestPlan().then(function (data) {
        data.forEach(function (c, i) {
          c.Selected = false;
          c.modifiedOn = Utils.createDate(c.modifiedOn);
        });
        var controlModal = Utils.CreateSelectListView(
          'Select Control Test Plans',
          data,
          headers,
          cols
        );
        controlModal.result.then(function (list) {
          $scope.isEdit = true;
          $scope.vm.formdata.controlTestPlanModel = $scope.vm.formdata.controlTestPlanModel.concat(
            list
          );
          $rootScope.controlTestPlanModel =
            $scope.vm.formdata.controlTestPlanModel;
        });
        $rootScope.app.Mask = false;
      });
    };

    $scope.removeItem = function (type, idx) {
      $scope.vm.formdata[type].splice(idx, 1);
    };

    vm.addPolicyDocs = function () {
      //$rootScope.app.Mask = true;
      var headers = ['Policy Name', 'Description', 'Owner', 'Business Process'],
        cols = ['policyName', 'policyDesc', 'policyOwner', 'businessProcess'];

      AuditService.GetPolicyDocs(10, 1).then(function (data) {
        data.forEach(function (c, i) {
          c.Selected = false;
          c.effectiveDate = Utils.createDate(c.effectiveDate);
        });
        var polModal = Utils.CreateSelectListView(
          'Select Policies and Procedures',
          data,
          headers,
          cols
        );
        polModal.result.then(function (list) {
          vm.isEdit = true;
          vm.formdata.policies = vm.formdata.policies.concat(list);
        });
        //$rootScope.app.Mask = false;
      });
    };

    vm.removeItem = function (type, idx) {
      vm.formdata[type].splice(idx, 1);
    };

    vm.cancelAction = function () {
      if (vm.Form.addAudit.$dirty || vm.isEdit) {
        var confirm = Utils.CreateConfirmModal(
          'Confirmation',
          'Do you want to cancel and if yes you should go back to previous screen',
          'Yes',
          'No'
        );
        confirm.result.then(function () {
          $state.go('app.audit.main');
        });
        return false;
      }
      $state.go('app.audit.main');
    };

    vm.cloneAudit = function () {
      //$rootScope.app.Mask = true;
      var headers = [
          'Name',
          'Region',
          'Department',
          'Occur Date',
          'Responsible',
          'Priority',
          'Status',
        ],
        cols = [
          'auditName',
          'region',
          'department',
          'dateOccurance',
          'resUserName',
          'priority',
          'auditStatus',
        ];

      AuditService.GetAudits(10, 1).then(function (data) {
        data.forEach(function (c, i) {
          c.Selected = false;
        });
        var cloneModal = Utils.CreateSingleSelectListView(
          'Select Audit to Clone',
          data,
          headers,
          cols
        );
        cloneModal.result.then(function (list) {
          vm.isEdit = true;
          console.log('~~~~ selected clone', data, list);
          // vm.formdata = vm.formdata.policies.concat(list);
        });
        //$rootScope.app.Mask = false;
      });
    };

    vm.addRiskControlSelfAssessments = function () {
      $rootScope.app.Mask = true;
      var headers = [
          'Name',
          'Region',
          'Business',
          'Period',
          'Frequency',
          'Approval State',
          'Classification',
        ],
        cols = [
          'assessName',
          'region',
          'business',
          'period',
          'frequency',
          'approval',
          'classification',
        ];

      AuditService.GetRCSA().then(function (data) {
        data.forEach(function (c, i) {
          c.Selected = false;
          c.modifiedOn = Utils.createDate(c.modifiedOn);
        });
        var controlModal = Utils.CreateSelectListView(
          'Select RCSA',
          data,
          headers,
          cols
        );

        controlModal.result.then(function (list) {
          vm.isEdit = true;
          vm.formdata['rcsaid'] = vm.formdata.rcsaid.concat(list);
        });
        $rootScope.app.Mask = false;
      });
    };
  }
})();
