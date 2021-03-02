(function () {
	ControlAddController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'GDPRPreService', 'Utils'];
    app.controller('ControlMgmAddCtrl', ControlAddController);

    function ControlAddController($scope, $rootScope, $state, $uibModal, $filter, GDPRPreService, Utils) {
    	var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add GDPR Pre-Assessment Control";

        vm.formdata = {
        	controlId: '',
            controlName: '',
            controlStatement: '',
            categoryName: ''
        };

        $rootScope.app.Mask = false;

        vm.submitAction = function(){
        	$rootScope.app.Mask = true;
            if(vm.ControlForm.$invalid) return false;

            GDPRPreService.PostControl(vm.formdata).then(function (res) {

            }).finally(function () {
                $state.go('app.admin.gdprpre.control.main');
            });
        };

        vm.cancelAction = function () {
            if (vm.ControlForm.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.admin.gdprpre.control.main');
                });
                return false;
            }
            $state.go('app.admin.gdprpre.control.main');
        };
    }
})();
