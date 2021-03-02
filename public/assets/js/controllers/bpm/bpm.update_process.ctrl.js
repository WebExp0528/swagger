(function () {
	BpmProcessUpdateController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'BpmService', 'Utils'];
    app.controller('BpmUpdate_ProcessCtrl', BpmProcessUpdateController);

    function BpmProcessUpdateController($scope, $rootScope, $state, $uibModal, $filter, BpmService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Update Process";

        vm.isEdit = false;

        var process_id = $state.params.process_id;
        vm.process_id = process_id;

        vm.OpList = [5, 10, 25, 50, 100];
        vm.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'subprocessName',
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


        BpmService.GetEachProcess(process_id).then(function (res) {
            var dtype = 'MM-DD-YYYY';
            var d1 = moment(res.dateOccurance);
            var d2 = moment(res.dueDate);
            res.dateOccurance = (d1.isValid()) ? d1.format(dtype) : '';
            res.dateOccuranceDtStr = res.dateOccurance;
            res.dueDate = (d2.isValid()) ? d2.format(dtype) : '';
            res.dueDtStr = res.dueDate;

            vm.formdata = res;

            return BpmService.GetSubprocessByProcess(process_id);
        }).then(function (data) {
            vm.Grid1.Total = data.length;
            vm.Grid1.Data = data;

            $rootScope.app.Mask = false;
        });

        vm.submitAction = function(){
            $rootScope.app.Mask = true;
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
                BpmService.UpdateProcess(process_id, vm.formdata).then(function (res) {
                    $rootScope.app.Mask = false;
                    $state.go('app.bpm.main');
                });
            });
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
        
        vm.deleteAction = function (r) {
        	var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                $rootScope.app.Mask = true;
                BpmService.DeleteSubprocess(r.id).then(function (data) {
                    if (data.status === 200) {
                    	BpmService.GetEachProcess(process_id).then(function (res) {
                            var dtype = 'MM-DD-YYYY';
                            var d1 = moment(res.dateOccurance);
                            var d2 = moment(res.dueDate);
                            res.dateOccurance = (d1.isValid()) ? d1.format(dtype) : '';
                            res.dateOccuranceDtStr = res.dateOccurance;
                            res.dueDate = (d2.isValid()) ? d2.format(dtype) : '';
                            res.dueDtStr = res.dueDate;

                            vm.formdata = res;

                            return BpmService.GetSubprocessByProcess(process_id);
                        }).then(function (data) {
                            vm.Grid1.Total = data.length;
                            vm.Grid1.Data = data;

                            $rootScope.app.Mask = false;
                        });
                    }
                });
            });
        };

        vm.addControls = function () {
            $rootScope.app.Mask = true;
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
                $rootScope.app.Mask = false;
            });
        };

        vm.addPolicyDocs = function () {
            $rootScope.app.Mask = true;
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
                $rootScope.app.Mask = false;
            });
        };

        vm.removeItem = function (type, idx) {
            vm.formdata[type].splice(idx, 1);
        };

    }
})();