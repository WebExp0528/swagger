(function () {
  AuditUpdateController.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$uibModal',
    '$filter',
    'AuditService',
    'Utils',
    'RiskService',
  ];
  app.controller('AuditUpdate_AuditCtrl', AuditUpdateController);

  function AuditUpdateController(
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
    vm.mainDesc = 'Update Audit';

    vm.isEdit = false;

    var audit_id = $state.params.audit_id;
    vm.audit_id = audit_id;

    vm.OpList = [5, 10, 25, 50, 100];
    vm.Grid1 = {
      PerPage: 10,
      CurrPage: 1,
      Column: 'topicName',
      IsAsc: true,
      Filter: '',
      Total: 0,
      Data: [],
      SortMe: function (col) {
        if (vm.Grid1.Column === col) vm.Grid1.IsAsc = !vm.Grid1.IsAsc;
        else vm.Grid1.Column = col;
      },
      GetIco: function (col) {
        if (vm.Grid1.Column === col) {
          return vm.Grid1.IsAsc ? 'fa-sort-up' : 'fa-sort-down';
        } else {
          return 'fa-unsorted';
        }
      },
    };
    $scope.$watch('vm.Grid1.Filter', function (n, o) {
      var searchedData = $filter('filter')(vm.Grid1.Data, vm.Grid1.Filter);
      vm.Grid1.Total = searchedData.length;
    });

    AuditService.GetEachAudit(audit_id)
      .then(function (res) {
        var dtype = 'MM-DD-YYYY';
        var d1 = moment(res.dateOccurance);
        var d2 = moment(res.dueDate);
        res.dateOccurance = d1.isValid() ? d1.format(dtype) : '';
        res.dateOccuranceDtStr = res.dateOccurance;
        res.dueDate = d2.isValid() ? d2.format(dtype) : '';
        res.dueDtStr = res.dueDate;

        var stakeholdersVM = [];
        if (res.stakeholders != null) {
          res.stakeholders.forEach(function (data, i) {
            stakeholdersVM.push({ name: data });
          });
        }
        console.log('~~~~~ response audit', res);
        vm.formdata = res;
        vm.formdata.riskProfileModel =
          vm.formdata.riskProfileModel == null
            ? []
            : vm.formdata.riskProfileModel;
        vm.formdata.controlTestPlanModel =
          vm.formdata.controlTestPlanModel == null
            ? []
            : vm.formdata.controlTestPlanModel;
        vm.formdata.stakeholdersVM = stakeholdersVM;

        return AuditService.GetTopicByAudit(audit_id);
      })
      .then(function (data) {
        vm.Grid1.Total = data.length;
        vm.Grid1.Data = data;

        $rootScope.app.Mask = false;
      });

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

    vm.submitAction = function () {
      $rootScope.app.Mask = true;
      if (vm.Form.addAudit.$invalid) return false;
      var dtype = 'YYYY-MM-DD';
      var d1 = moment(vm.formdata.dateOccurance);
      var d2 = moment(vm.formdata.dueDate);
      vm.formdata.dateOccurance = d1.isValid() ? d1.format(dtype) : '';
      vm.formdata.dueDate = d2.isValid() ? d2.format(dtype) : '';
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
          AuditService.UpdateAudit(audit_id, vm.formdata).then(function (res) {
            $rootScope.app.Mask = false;
            $state.go('app.audit.main');
          });
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

    vm.deleteAction = function (r) {
      var confirmation = Utils.CreateConfirmModal(
        'Confirm Deletion',
        'Are you sure you want to delete the selected item',
        'Yes',
        'No'
      );
      confirmation.result.then(function () {
        $rootScope.app.Mask = true;
        AuditService.DeleteTopic(r.id).then(function (data) {
          if (data.status === 200) {
            AuditService.GetEachAudit(audit_id)
              .then(function (res) {
                var dtype = 'MM-DD-YYYY';
                var d1 = moment(res.dateOccurance);
                var d2 = moment(res.dueDate);
                res.dateOccurance = d1.isValid() ? d1.format(dtype) : '';
                res.dateOccuranceDtStr = res.dateOccurance;
                res.dueDate = d2.isValid() ? d2.format(dtype) : '';
                res.dueDtStr = res.dueDate;

                vm.formdata = res;

                return AuditService.GetTopicByAudit(audit_id);
              })
              .then(function (data) {
                vm.Grid1.Total = data.length;
                vm.Grid1.Data = data;

                $rootScope.app.Mask = false;
              });
          }
        });
      });
    };

    vm.showDesc = function (desc) {
      var detail = Utils.CreateViewDetailModal('Detail', desc, 'Ok');
      detail.result.then(function () {
        //Yes
      });
      return false;
    };

    vm.addControls = function () {
      $rootScope.app.Mask = true;
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
        $rootScope.app.Mask = false;
      });
    };

    vm.addPolicyDocs = function () {
      $rootScope.app.Mask = true;
      var headers = ['Policy Name', 'Description', 'Owner', 'Business Process'],
        cols = ['policyName', 'policyDesc', 'policyOwner', 'businessProcess'];

      AuditService.GetPolicyDocs(10, 1).then(function (data) {
        data.forEach(function (c, i) {
          c.Selected = false;
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
        $rootScope.app.Mask = false;
      });
    };

    vm.removeItem = function (type, idx) {
      vm.formdata[type].splice(idx, 1);
    };
  }
})();
