(function () {
	ControlUpdateController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'GDPRPreService', 'Utils'];
    app.controller('ControlMgmUpdateCtrl', ControlUpdateController);

    function ControlUpdateController($scope, $rootScope, $state, $uibModal, $filter, GDPRPreService, Utils) {
    	var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Update GDPR Pre-Assessment Control";
        var id = $state.params.id;
        console.log("id: ", id);
        
        $rootScope.app.Mask = false;
        GDPRPreService.GetOneControl(id).then(function(data) {
        	vm.formdata = data;
        	$rootScope.response = vm.formdata.response;
        })

        vm.submitAction = function(){
            $rootScope.app.Mask = true;
            if(vm.ControlForm.$invalid) return false;

            GDPRPreService.PutControl(id, vm.formdata).then(function (res) {

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
