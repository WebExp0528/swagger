(function () {
	BpmProcessController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'BpmService', 'Utils'];
    app.controller('BpmAdd_ProcessCtrl', BpmProcessController);

    function BpmProcessController($scope, $rootScope, $state, $uibModal, $filter, BpmService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add Process";

        vm.isEdit = false;
        vm.enableSubprocessConfirmation = true;
        vm.isProcessSaved = false;

        vm.formdata = {
            processName: "",
            processDesc: "",
            region: "",
            department: "",
            processStatus: "",
            processControlValidated: "",
            dateOccurance: "",
            dueDate: "",
            resUsername: "",
            priority: "",
            policies: [],
            controlDataModel: [],
            processFileModel: []
        };

        $rootScope.app.Mask = false;
        vm.submitAction = function(){
            $rootScope.app.Mask = true;

            if (vm.isProcessSaved === true) {
                $rootScope.app.Mask = false;
                $state.go('app.bpm.main');
                return false;
            }

            if(vm.Form.addProcess.$invalid) return false;
            var dtype = 'YYYY-MM-DD';
            var d1 = moment(vm.formdata.dateOccurance);
            var d2 = moment(vm.formdata.dueDate);
            vm.formdata.dateOccurance = (d1.isValid()) ? d1.format(dtype) : '';
            vm.formdata.dueDate = (d2.isValid()) ? d2.format(dtype) : '';
            var fileModel = vm.formdata.processFileModel;
            var d = new Date();
            var idd = 'Bpm' + d.getTime();
            BpmService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                var process_id = "";
                BpmService.AddProcess(vm.formdata).then(function (res) {
                    console.log('res',res);
                    process_id = res.data.id
                    if (process_id) {
                        vm.isProcessSaved = true;
                    }
                }).finally(function () {
                    if (vm.enableSubprocessConfirmation) {
                        vm.enableSubprocessConfirmation = false;
                        $rootScope.app.Mask = false;
                        var confirmation = Utils.CreateConfirmModal("Confirm New Subprocess", "Are you sure you want to create new subprocess", "Yes", "No");
                        confirmation.result.then(function () {
                            if (process_id == '') return;
                            $rootScope.app.Mask = true;
                            $state.go('app.bpm.add_subprocess', {process_id: process_id});
                        });
                    }  else {
                        $state.go('app.audit.main');
                    }
                });
            });
        };

        vm.addControls = function () {
            //$rootScope.app.Mask = true;
            var headers = ["Control Category", "Control ID", "Control Name", "Control Source", "Business Procee", "Owner"],
                cols = ["controlCategory", "controlRefID", "controlName", "controlSource", "businessProcess", "controlOwner"];

            BpmService.GetControlData().then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                    c.modifiedOn = Utils.createDate(c.modifiedOn);
                });
                var controlModal = Utils.CreateSelectListView("Select Controls", data, headers, cols);
                controlModal.result.then(function (list) {
                    vm.isEdit = true;
                    vm.formdata.controlDataModel = vm.formdata.controlDataModel.concat(list);
                });
                //$rootScope.app.Mask = false;
            });
        };

        vm.addPolicyDocs = function () {
            //$rootScope.app.Mask = true;
            var headers = ["Policy Name", "Description", "Owner", "Business Process"],
                cols = ["policyName", "policyDesc", "policyOwner", "businessProcess"];

            BpmService.GetPolicyDocs(10, 1).then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                });
                var polModal = Utils.CreateSelectListView("Select Policies and Procedures", data, headers, cols);
                polModal.result.then(function (list) {
                    vm.isEdit = true;
                    vm.formdata.policies = vm.formdata.policies.concat(list);
                });
                //$rootScope.app.Mask = false;
            });
        };

        vm.removeItem = function (type, idx) {
            vm.formdata[type].splice(idx, 1);
        };

        vm.cancelAction = function () {
            if (vm.Form.addProcess.$dirty || vm.isEdit) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.bpm.main');
                });
                return false;
            }
            $state.go('app.bpm.main');
        };

    }
})();