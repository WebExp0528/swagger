(function () {
  ControlTestDataUpdateController.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    '$uibModal',
    '$filter',
    'ControlTestDataService',
    'Utils',
  ];
  app.controller('ControlTestDataUpdateCtrl', ControlTestDataUpdateController);

  function ControlTestDataUpdateController(
    $scope,
    $rootScope,
    $state,
    $stateParams,
    $uibModal,
    $filter,
    ControlTestDataService,
    Utils
  ) {
    var vm = this;
    vm.mainTitle = $state.current.title;
    vm.mainDesc = 'Update Test Data';
    var controlTestDataId = $state.params.controlTestDataId;
    console.log(
      '$state.params.controlTestDataId:',
      $state.params.controlTestDataId
    );
    console.log('$state.params.id:', $state.params.id);

    vm.tmp_deptId = '';
    vm.tmp_roleId = '';

    $rootScope.app.Mask = false;
    ControlTestDataService.GetOne(controlTestDataId).then(function (data) {
      vm.formdata = data;
    });

    vm.submitAction = function () {
      $rootScope.app.Mask = true;
      if (vm.ControlTestDataForm.$invalid) return false;

      ControlTestDataService.Put(controlTestDataId, vm.formdata)
        .then(function (res) {})
        .finally(function () {
          $state.go('app.controltestdata.main');
        });
    };

    vm.cancelAction = function () {
      if (vm.ControlTestDataForm.$dirty) {
        var confirm = Utils.CreateConfirmModal(
          'Confirmation',
          'Do you want to cancel and if yes you should go back to previous screen',
          'Yes',
          'No'
        );
        confirm.result.then(function () {
          $state.go('app.controltestdata.main');
        });
        return false;
      }
      $state.go('app.controltestdata.main');
    };
  }
})();
