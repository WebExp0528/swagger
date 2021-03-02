(function () {
    BpmActivityController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$uibModal', '$filter', 'BpmService', 'Utils'];
    app.controller('BpmAdd_ActivityCtrl', BpmActivityController);

    function BpmActivityController($scope, $rootScope, $state, $stateParams, $uibModal, $filter, BpmService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add Activity";

        $rootScope.app.Mask = true;

        var process_id = '';
        var subprocess_id = $stateParams.subprocess_id;
        vm.formdata = {
            processId: process_id,
            subprocessId: subprocess_id,
            activityDesc: "",
            activityStatus: "",
            activityName: "",
            activityFileModel: []
        };

        BpmService.GetEachSubprocess(subprocess_id)
            .then(function(data){
                vm.subprocessName = data.subprocessName;
                process_id = data.processId;
                vm.formdata.processId = data.processId;
                return BpmService.GetEachProcess(process_id);
            })
            .then(function (data) {
                vm.processName = data.processName;
                $rootScope.app.Mask = false;
            });

        vm.submitAction = function(){
            if(vm.Form.addActivity.$invalid) return false;
            console.log(vm.formdata);
            $rootScope.app.Mask = true;
            var fileModel = vm.formdata.activityFileModel;
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
                var activity_id = "";
                console.log('vm.formdata',vm.formdata);
                // return;
                BpmService.AddActivity(vm.formdata).then(function (res) {
                    console.log('res',res);
                    activity_id = res.data.id
                }).finally(function () {
                    $rootScope.app.Mask = false;
                    $state.go('app.bpm.update_subprocess', {subprocess_id: subprocess_id});
                });
            });
        };

        vm.cancelAction = function () {
            if (vm.Form.addActivity.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                	$state.go('app.bpm.update_subprocess', {subprocess_id: subprocess_id});
                });
                return false;
            }
            $state.go('app.bpm.update_subprocess', {subprocess_id: subprocess_id});
        };
    }
})();