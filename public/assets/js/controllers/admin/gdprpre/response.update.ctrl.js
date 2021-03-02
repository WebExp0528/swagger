(function () {
	ResponseUpdateController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'GDPRPreService', 'Utils'];
    app.controller('ResponseMgmUpdateCtrl', ResponseUpdateController);

    function ResponseUpdateController($scope, $rootScope, $state, $uibModal, $filter, GDPRPreService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Update GDPR Pre-Assessment Response";
        var id = $state.params.id;

        $rootScope.app.Mask = false;
        GDPRPreService.GetOneResponse(id).then(function(data) {
        	vm.formdata = data;
        })

        vm.submitAction = function(){
            $rootScope.app.Mask = true;
            if(vm.ResponseForm.$invalid) return false;

            GDPRPreService.PutResponse(id, vm.formdata).then(function (res) {

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
