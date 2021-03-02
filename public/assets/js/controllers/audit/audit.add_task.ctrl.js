(function () {
  AuditTaskController.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    '$uibModal',
    '$filter',
    'AuditService',
    'Utils',
  ];
  app.controller('AuditAdd_TaskCtrl', AuditTaskController);

  function AuditTaskController(
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
    vm.mainDesc = 'Add Task';

    $rootScope.app.Mask = true;

    var audit_id = '';
    var topic_id = $stateParams.topic_id;
    vm.topic_id = topic_id;
    vm.formdata = {
      auditId: audit_id,
      topicId: topic_id,
      findDesc: '',
      findStatus: '',
      findingName: '',
      taskfileModel: [],
      priority: '',
      owner: '',
      taskStartDate: '',
      taskEndDate: '',
    };

    AuditService.GetEachTopic(topic_id)
      .then(function (data) {
        vm.topicName = data.topicName;
        audit_id = data.auditId;
        vm.formdata.auditId = data.auditId;
        return AuditService.GetEachAudit(audit_id);
      })
      .then(function (data) {
        vm.auditName = data.auditName;
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
          var task_id = '';
          var dtype = 'YYYY-MM-DD';
          var startDate = moment(vm.formdata.taskStartDate);
          var endDate = moment(vm.formdata.taskStartDate);

          vm.formdata.taskStartDate = startDate.isValid()
            ? startDate.format(dtype)
            : '';
          vm.formdata.taskEndDate = endDate.isValid()
            ? endDate.format(dtype)
            : '';
          // return;
          AuditService.AddTask(vm.formdata)
            .then(function (res) {
              console.log('res', res);
              task_id = res.data.id;
            })
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
  }
})();
