(function () {
    'use strict';
    VendorriskStinfoController.$inject = ['$scope', '$rootScope', '$state', 'ExcelFactory', 'VendorService', '$timeout', 'Utils', 'ChartFactory', '$filter'];
    app.controller('VendorriskAdminStinfoCtrl', VendorriskStinfoController);
    function VendorriskStinfoController($scope, $rootScope, $state, ExcelFactory, VendorService, $timeout, Utils, ChartFactory, $filter) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = 'Vendor Risk Assessment';

        $scope.OpList = [5, 10, 25, 50, 100];
        $scope.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'title',
            IsAsc: true,
            Filter: "",
            Total: 0,
            Data: [],
            SortMe: function (col) {
                if ($scope.Grid1.Column === col)
                    $scope.Grid1.IsAsc = !$scope.Grid1.IsAsc;
                else
                    $scope.Grid1.Column = col;
            },
            GetIco: function (col) {
                if ($scope.Grid1.Column === col) {
                    return $scope.Grid1.IsAsc ? 'fa-sort-up' : 'fa-sort-down';
                } else {
                    return 'fa-unsorted';
                }
            }
        };
        $scope.$watch('Grid1.Filter', function (n, o) {
            var searchedData = $filter('filter')($scope.Grid1.Data, $scope.Grid1.Filter);
            $scope.Grid1.Total = searchedData.length;
        });

       
        $scope.$watch('PerPage', function (n, o) {
            loadData();
        });

        function loadData() {
            VendorService.GetRim().then(function (data) {
                data.forEach(function (r) {
                    r.assessdate = Utils.createDate(r.assessmentsDate);
                    r.approvdate = Utils.createDate(r.approvedDate);
                });

                $scope.Grid1.Total = data.length;
                $scope.Grid1.Data = data;

                $rootScope.app.Mask = false;
            });
        }


        $scope.deleteAction = function (name) {
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                $rootScope.app.Mask = true;
                VendorService.DeleteRim(name.id).then(function (data) {
                    if (data.status === 200) loadData();
                });
            });
        };
    }
})();