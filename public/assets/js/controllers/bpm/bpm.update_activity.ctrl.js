(function () {
	BpmUpdateActivityController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$uibModal', '$filter', 'BpmService', 'Utils'];
    app.controller('BpmUpdate_ActivityCtrl', BpmUpdateActivityController);

    function BpmUpdateActivityController($scope, $rootScope, $state, $stateParams, $uibModal, $filter, BpmService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Update Activity";

        $rootScope.app.Mask = true;

        var process_id = '';
        var subprocess_id = '';
        var activity_id = $stateParams.activity_id;
        vm.activity_id = activity_id;

        vm.OpList = [5, 10, 25, 50, 100];
        vm.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'attestationName',
            IsAsc: true,
            Filter: "",
            Total: 0,
            Data: [],
            SortMe: function (col) {
                if (vm.Grid1.Column === col)
                    vm.Grid1.IsAsc = !vm.Grid1.IsAsc;
                else
                    vm.Grid1.Column = col;
            },
            GetIco: function (col) {
                if (vm.Grid1.Column === col) {
                    return vm.Grid1.IsAsc ? 'fa-sort-up' : 'fa-sort-down';
                } else {
                    return 'fa-unsorted';
                }
            }
        };
        $scope.$watch('vm.Grid1.Filter', function (n, o) {
            var searchedData = $filter('filter')(vm.Grid1.Data, vm.Grid1.Filter);
            vm.Grid1.Total = searchedData.length;
        });

        BpmService.GetEachActivity(activity_id)
            .then(function (data) {
                vm.formdata = data;
                subprocess_id = data.subprocessId;
                return BpmService.GetEachSubprocess(subprocess_id);
            })
            .then(function(data){
                vm.subprocessName = data.subprocessName;
                process_id = data.processId;
                return BpmService.GetEachProcess(process_id);
            })
            .then(function (data) {
                vm.processName = data.processName;
                return BpmService.GetAttestationByActivity(activity_id);
            })
            .then(function (data) {
                vm.Grid1.Total = data.length;
                vm.Grid1.Data = data;

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
                BpmService.UpdateActivity(activity_id, vm.formdata).then(function (res) {
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
        
        vm.deleteAction = function (r) {
        	var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                $rootScope.app.Mask = true;
                BpmService.DeleteAttestation(r.id).then(function (data) {
                    if (data.status === 200) {
                    	BpmService.GetEachActivity(activity_id)
                        .then(function (data) {
                            vm.formdata = data;
                            subprocess_id = data.subprocessId;
                            return BpmService.GetEachSubprocess(subprocess_id);
                        })
                        .then(function(data){
                            vm.subprocessName = data.subprocessName;
                            process_id = data.processId;
                            return BpmService.GetEachProcess(process_id);
                        })
                        .then(function (data) {
                            vm.processName = data.processName;
                            return BpmService.GetAttestationByActivity(activity_id);
                        })
                        .then(function (data) {
                            vm.Grid1.Total = data.length;
                            vm.Grid1.Data = data;

                            $rootScope.app.Mask = false;
                        });
                    }
                });
            });
        };
    }
})();