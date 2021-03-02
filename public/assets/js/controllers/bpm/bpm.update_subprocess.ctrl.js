(function () {
	BpmUpdateSubprocessController.$inject = ['$scope', '$stateParams', '$rootScope', '$state', '$uibModal', '$filter', 'BpmService', 'Utils'];
    app.controller('BpmUpdate_SubprocessCtrl', BpmUpdateSubprocessController);

    function BpmUpdateSubprocessController($scope, $stateParams, $rootScope, $state, $uibModal, $filter, BpmService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Update Subprocess";
        var subprocess_id = $stateParams.subprocess_id;
        vm.subprocess_id = subprocess_id;
        var process_id = '';

        $rootScope.app.Mask = true;

        vm.OpList = [5, 10, 25, 50, 100];
        vm.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'activityName',
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

        BpmService.GetEachSubprocess(subprocess_id).then(function (res) {
            process_id = res.processId;
            vm.formdata = res;
            return BpmService.GetEachProcess(process_id)
        }).then(function(data){
            vm.processName = data.processName;
            return BpmService.GetActivityBySubprocess(subprocess_id);
        }).then(function (data) {
            vm.Grid1.Total = data.length;
            vm.Grid1.Data = data;

            $rootScope.app.Mask = false;
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
                BpmService.UpdateSubprocess(subprocess_id, vm.formdata).then(function (res) {
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
        
        vm.deleteAction = function (r) {
        	var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                $rootScope.app.Mask = true;
                BpmService.DeleteActivity(r.id).then(function (data) {
                    if (data.status === 200) {
                    	BpmService.GetEachSubprocess(subprocess_id).then(function (res) {
                            process_id = res.processId;
                            vm.formdata = res;
                            return BpmService.GetEachProcess(process_id)
                        }).then(function(data){
                            vm.processName = data.processName;
                            return BpmService.GetActivityBySubprocess(subprocess_id);
                        }).then(function (data) {
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