(function () {
    OwaspUpdateController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'OwaspService', 'Utils'];
    app.controller('OwaspUpdateCtrl', OwaspUpdateController);

    function OwaspUpdateController($scope, $rootScope, $state, $uibModal, $filter, OwaspService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Update Owasp";
        var id = $state.params.id;

        $rootScope.app.Mask = false;
        OwaspService.GetOne(id).then(function (data) {
            vm.formdata = data;
        });

        vm.submitAction = function(){
            $rootScope.app.Mask = true;
            if(vm.OwaspForm.$invalid) return false;

            OwaspService.Update(id, vm.formdata).then(function (res) {

            }).finally(function () {
                $state.go('app.admin.owasp.main');
            });
        };

        vm.cancelAction = function () {
            if (vm.OwaspForm.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.admin.owasp.main');
                });
                return false;
            }
            $state.go('app.admin.owasp.main');
        };
    }
})();