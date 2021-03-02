(function () {
	PreAssessmentAddController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'GDPRPreService', 'Utils'];
    app.controller('PreAssessmentMgmAddCtrl', PreAssessmentAddController);

    function PreAssessmentAddController($scope, $rootScope, $state, $uibModal, $filter, GDPRPreService, Utils) {
    	var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add GDPR Pre-Assessment";

        vm.formdata = {
        	user: '',
            date: '',
            categoryName: '',
            categoryDescription: '',
            finding: '',
            controls: []
        };

        $rootScope.app.Mask = false;

        vm.submitAction = function(){
        	$rootScope.app.Mask = true;
            if(vm.PreAssessmentForm.$invalid) return false;
            
            var dtype = 'YYYY-MM-DD';
            var d1 = moment(vm.formdata.date);
            vm.formdata.date = (d1.isValid()) ? d1.format(dtype) : '';
            vm.formdata.dateStr = vm.formdata.date;

            GDPRPreService.Post(vm.formdata).then(function (res) {

            }).finally(function () {
                $state.go('app.admin.gdprpre.preassessment.main');
            });
        };

        vm.cancelAction = function () {
            if (vm.PreAssessmentForm.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.admin.gdprpre.preassessment.main');
                });
                return false;
            }
            $state.go('app.admin.gdprpre.preassessment.main');
        };
        
        vm.removeItem = function (type, idx) {
        	$scope.VM[type].splice(idx, 1);
        };
        
        vm.addControls = function() {
        	var headers = ["Control ID", "Control Name", "Control Statement", "Response"],
            cols = ["controlId", "controlName", "controlStatement", "response.name"];
        
        	GDPRPreService.GetControl().then(function (data) {
        		data.forEach(function (c, i) {
                    c.Selected = false;
                });
                var controlsModal = Utils.CreateSelectListView("Select Pre-Assessment Controls", data, headers, cols);
                controlsModal.result.then(function (list) {
                    vm.isEdit = true;
                    vm.formdata.controls = vm.formdata.controls.concat(list);
                    $rootScope.controls = vm.formdata.controls;
                });
            });
        };
    }
})();
