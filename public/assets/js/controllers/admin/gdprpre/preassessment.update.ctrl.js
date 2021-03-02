(function () {
	PreAssessmentUpdateController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'GDPRPreService', 'Utils'];
    app.controller('PreAssessmentMgmUpdateCtrl', PreAssessmentUpdateController);

    function PreAssessmentUpdateController($scope, $rootScope, $state, $uibModal, $filter, GDPRPreService, Utils) {
    	var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Update GDPR Pre-Assessment";
        var id = $state.params.id;
        console.log("id: ", id);
        
        $rootScope.app.Mask = false;
        GDPRPreService.GetOne(id).then(function(data) {
    		var dtype = 'MM-DD-YYYY';
            var d1 = moment(data.date);
            data.date = (d1.isValid()) ? d1.format(dtype) : '';
            data.dateStr = data.date;
        	vm.formdata = data;
        	$rootScope.controls = vm.formdata.controls;
        })

        vm.submitAction = function(){
            $rootScope.app.Mask = true;
            if(vm.PreAssessmentForm.$invalid) return false;
            
            var dtype = 'YYYY-MM-DD';
            var d1 = moment(vm.formdata.date);
            vm.formdata.date = (d1.isValid()) ? d1.format(dtype) : '';
            vm.formdata.dateStr = vm.formdata.date;

            GDPRPreService.Put(id, vm.formdata).then(function (res) {

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
                    console.log("controls: ", vm.formdata.controls);
                    $rootScope.controls = vm.formdata.controls;
                });
            });
        };
    }
})();
