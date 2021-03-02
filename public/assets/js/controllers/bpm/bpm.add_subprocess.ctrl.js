(function () {
	BpmSubprocessController.$inject = ['$scope', '$stateParams', '$rootScope', '$state', '$uibModal', '$filter', 'BpmService', 'Utils'];
    app.controller('BpmAdd_SubprocessCtrl', BpmSubprocessController);

    function BpmSubprocessController($scope, $stateParams, $rootScope, $state, $uibModal, $filter, BpmService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add Subprocess";
        var process_id = $stateParams.process_id;

        $rootScope.app.Mask = false;

        vm.formdata = {
            processId: process_id,
            subprocessDesc: "",
            subprocessName: "",
            subprocessResponse: "",
            subprocessStatus: "",
            resUserName: "",
            subprocessFileModel: []
        };

        BpmService.GetEachProcess(process_id)
            .then(function(data){
                vm.processName = data.processName;
            });

        vm.submitAction = function(){
            if(vm.Form.addSubprocess.$invalid) return false;
            console.log(vm.formdata);
            // return;
            $rootScope.app.Mask = true;
            // var dtype = 'YYYY-MM-DD';
            // var d1 = moment(vm.formdata.dateOccurance);
            // var d2 = moment(vm.formdata.dueDate);
            // vm.formdata.dateOccurance = (d1.isValid()) ? d1.format(dtype) : '';
            // vm.formdata.dueDate = (d2.isValid()) ? d2.format(dtype) : '';
            // console.log(vm.formdata);
            var fileModel = vm.formdata.subprocessFileModel;
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
                var subprocess_id = "";
                console.log('vm.formdata',vm.formdata);
                // return;
                BpmService.AddSubprocess(vm.formdata).then(function (res) {
                    console.log('res',res);
                    subprocess_id = res.data.id
                }).finally(function () {
                    $rootScope.app.Mask = false;
                    $state.go('app.bpm.update_process', {process_id: process_id});
                });
            });
        };

        vm.cancelAction = function () {
            if (vm.Form.addSubprocess.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.bpm.update_process', {process_id: process_id});
                });
                return false;
            }
            $state.go('app.bpm.update_process', {process_id: process_id});
        };
    }
})();