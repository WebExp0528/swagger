(function () {
    "use strict";

    PreAssessmentMgmCtrl.$inject = ['$scope', '$rootScope', '$state', '$filter', '$uibModal', 'GDPRPreService', 'Utils'];
    app.controller('PreAssessmentMgmCtrl', PreAssessmentMgmCtrl);

    function PreAssessmentMgmCtrl($scope, $rootScope, $state, $filter, $uibModal, GDPRPreService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add Edit Search & Delete GDPR Pre-Assessments";

        vm.OpList = [5, 10, 25, 50, 100];
        vm.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'date',
            IsAsc: true,
            Filter: "",
            Total: 1,
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

        GDPRPreService.Get().then(function (data) {
        	$rootScope.app.Mask = true;
        	data.forEach(function (r) {
        		var dtype = 'MM-DD-YYYY';
                var d1 = moment(r.date);
                r.date = (d1.isValid()) ? d1.format(dtype) : '';
                r.dateStr = r.date;
            });
        	vm.Grid1.Total = data.length;
            vm.Grid1.Data = data;          
            
            $rootScope.app.Mask = false;
        });

        vm.deleteAction = function (r) {
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                GDPRPreService.Delete(r.id).then(function (data) {
                    if (data.status === 200){
                        vm.Grid1.Total--;
                        for(var i in vm.Grid1.Data){
                            if(vm.Grid1.Data[i].id === rowId){
                                delete vm.Grid1.Data[i];
                            }
                        }
                    }
                });
            });
        };
    }
})();
