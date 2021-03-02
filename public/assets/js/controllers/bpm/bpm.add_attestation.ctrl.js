(function () {
	BpmAttestationController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$uibModal', '$filter', 'BpmService', 'Utils'];
    app.controller('BpmAdd_AttestationCtrl', BpmAttestationController);

    function BpmAttestationController($scope, $rootScope, $state, $stateParams, $uibModal, $filter, BpmService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add Attestation";

        $rootScope.app.Mask = false;

        var activity_id = $stateParams.activity_id;
        var process_id = '';
        var subprocess_id = '';
        vm.formdata = {
            processId: process_id,
            subprocessId: subprocess_id,
            activityId: activity_id,
            attestationName: "",
            attestationDesc: "",
            attestationStatus: "",
            deptId: "",
            username: '',
            dueDate: "",
            attestationFileModel: []
        };

        BpmService.GetEachActivity(activity_id)
            .then(function(data){
                vm.activityName = data.activityName;
                process_id = data.processId;
                subprocess_id = data.subprocessId;
                vm.formdata.processId = process_id;
                vm.formdata.subprocessId = subprocess_id;
                return BpmService.GetEachSubprocess(subprocess_id);
            })
            .then(function (data) {
                vm.subprocessName = data.subprocessName;
                return BpmService.GetEachProcess(process_id);
            })
            .then(function (data) {
                vm.processName = data.processName;
            });

        vm.submitAction = function(){
            if(vm.Form.addAttestation.$invalid) return false;
            var dtype = 'YYYY-MM-DD';
            var d2 = moment(vm.formdata.dueDate);
            vm.formdata.dueDate = (d2.isValid()) ? d2.format(dtype) : '';
            console.log(vm.formdata);
            $rootScope.app.Mask = true;
            var fileModel = vm.formdata.attestationFileModel;
            var d = new Date();
            var idd = 'Top' + d.getTime();
            BpmService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                var attestation_id = "";
                console.log('vm.formdata',vm.formdata);
                // return;
                BpmService.AddAttestation(vm.formdata).then(function (res) {
                    console.log('res',res);
                    attestation_id = res.data.id
                }).finally(function () {
                    $rootScope.app.Mask = false;
                    $state.go('app.bpm.update_activity', {activity_id: activity_id});
                });
            });
        };

        vm.cancelAction = function () {
            if (vm.Form.addAttestation.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.bpm.update_activity', {activity_id: activity_id});
                });
                return false;
            }
            $state.go('app.bpm.update_activity', {activity_id: activity_id});
        };
    }
})();