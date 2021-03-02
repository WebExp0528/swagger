(function () {
    ResponseAddController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'GDPRPreService', 'Utils'];
    app.controller('ResponseMgmAddCtrl', ResponseAddController);

    function ResponseAddController($scope, $rootScope, $state, $uibModal, $filter, GDPRPreService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add GDPR Pre-Assessment Response";

        vm.formdata = {
            name: '',
            description: '',
            controlName: ''
        };

        $rootScope.app.Mask = false;

        vm.submitAction = function(){
            $rootScope.app.Mask = true;
            if(vm.ResponseForm.$invalid) return false;

            GDPRPreService.PostResponse(vm.formdata).then(function (res) {

            }).finally(function () {
                $state.go('app.admin.gdprpre.response.main');
            });
        };

        vm.cancelAction = function () {
            if (vm.ResponseForm.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.admin.gdprpre.response.main');
                });
                return false;
            }
            $state.go('app.admin.gdprpre.response.main');
        };
    }
})();
