(function () {
  ControlTestDataAddController.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    '$uibModal',
    '$filter',
    'ControlTestDataService',
    'Utils',
  ];
  app.controller('ControlTestDataAddCtrl', ControlTestDataAddController);

  function ControlTestDataAddController(
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
    vm.mainDesc = 'Add Test Data';

    vm.formdata = {
      name: '',
      description: '',
      controlTypeLevel1: '',
      controlTypeLevel2: '',
      design: '',
      performance: '',
      justification: '',
      accountability: '',
      riskId: $stateParams.pid,
    };

    $rootScope.app.Mask = false;

    vm.submitAction = function () {
      $rootScope.app.Mask = true;
      if (vm.ControlTestDataForm.$invalid) return false;

      ControlTestDataService.Post(vm.formdata)
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
