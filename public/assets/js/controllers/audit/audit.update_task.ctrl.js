(function () {
  AuditUpdateTaskController.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    '$uibModal',
    '$filter',
    'AuditService',
    'Utils',
  ];
  app.controller('AuditUpdate_TaskCtrl', AuditUpdateTaskController);

  function AuditUpdateTaskController(
    $scope,
    $rootScope,
    $state,
    $stateParams,
    $uibModal,
    $filter,
    AuditService,
    Utils
  ) {
    var vm = this;
    vm.mainTitle = $state.current.title;
    vm.mainDesc = 'Update Task';

    $rootScope.app.Mask = true;

    var audit_id = '';
    var topic_id = '';
    var task_id = $stateParams.task_id;
    vm.task_id = task_id;

    vm.OpList = [5, 10, 25, 50, 100];
    vm.Grid1 = {
      PerPage: 10,
      CurrPage: 1,
      Column: 'findingName',
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

    AuditService.GetEachTask(task_id)
      .then(function (data) {
        data.remediation_date = Utils.createDate(data.remediation_date);
        data.remediationDate = Utils.GetDPDate(data.remediation_date);
        data.identified_date = Utils.createDate(data.identified_date);
        data.identifiedDate = Utils.GetDPDate(data.identified_date);
        vm.formdata = data;
        topic_id = data.topicId;
        vm.topic_id = topic_id;
        return AuditService.GetEachTopic(topic_id);
      })
      .then(function (data) {
        vm.topicName = data.topicName;
        audit_id = data.auditId;
        return AuditService.GetEachAudit(audit_id);
      })
      .then(function (data) {
        vm.auditName = data.auditName;
        return AuditService.GetFindingByTopic(topic_id);
      })
      .then(function (data) {
        // console.log('~~~~ unfiltered findings', data);
        // data = data.filter((el) => el.task_id === task_id);
        console.log('~~~~ findings', data);
        vm.Grid1.Total = data.length;
        vm.Grid1.Data = data;

        $rootScope.app.Mask = false;
      });

    vm.submitAction = function () {
      if (vm.Form.addTask.$invalid) return false;
      console.log(vm.formdata);
      $rootScope.app.Mask = true;
      var fileModel = vm.formdata.taskfileModel;
      var d = new Date();
      var idd = 'Top' + d.getTime();
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
          var dtype = 'YYYY-MM-DD';
          var startDate = moment(vm.formdata.taskStartDate);
          var endDate = moment(vm.formdata.taskStartDate);

          vm.formdata.taskStartDate = startDate.isValid()
            ? startDate.format(dtype)
            : '';
          vm.formdata.taskEndDate = endDate.isValid()
            ? endDate.format(dtype)
            : '';

          AuditService.UpdateTask(task_id, vm.formdata)
            .then(function (res) {})
            .finally(function () {
              $rootScope.app.Mask = false;
              $state.go('app.audit.update_topic', { topic_id: topic_id });
            });
        });
    };

    vm.cancelAction = function () {
      if (vm.Form.addTask.$dirty) {
        var confirm = Utils.CreateConfirmModal(
          'Confirmation',
          'Do you want to cancel and if yes you should go back to previous screen',
          'Yes',
          'No'
        );
        confirm.result.then(function () {
          $state.go('app.audit.update_topic', { topic_id: topic_id });
        });
        return false;
      }
      $state.go('app.audit.update_topic', { topic_id: topic_id });
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
        AuditService.DeleteAction(r).then(function (data) {
          if (data.status === 200) {
            AuditService.GetEachTask(task_id)
              .then(function (data) {
                vm.formdata = data;
                topic_id = data.topicId;
                return AuditService.GetEachTopic(topic_id);
              })
              .then(function (data) {
                vm.topicName = data.topicName;
                audit_id = data.auditId;
                return AuditService.GetEachAudit(audit_id);
              })
              .then(function (data) {
                vm.auditName = data.auditName;
                return AuditService.GetActionByTask(task_id);
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
  }
})();
