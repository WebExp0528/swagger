(function () {
    OwaspAddController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'OwaspService', 'Utils'];
    app.controller('OwaspAddCtrl', OwaspAddController);

    function OwaspAddController($scope, $rootScope, $state, $uibModal, $filter, OwaspService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add Owasp";

        vm.formdata = {
            sn : '',
            vulnerability : '',
            description : '',
            vulnStatus : '',
            year : ''
        };

        $rootScope.app.Mask = false;

        vm.submitAction = function(){
            $rootScope.app.Mask = true;
            if(vm.OwaspForm.$invalid) return false;

            console.log("vm.formdata: ", vm.formdata);
            OwaspService.Add(vm.formdata).then(function (res) {

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