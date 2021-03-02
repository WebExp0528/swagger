(function () {
    "use strict";

    GDPRPreAssessmentCtrl.$inject = ['$scope', '$rootScope', '$state', '$filter', '$uibModal', 'GDPRPreService', 'ChartFactory', 'Utils'];
    app.controller('GDPRPreAssessmentCtrl', GDPRPreAssessmentCtrl);

    function GDPRPreAssessmentCtrl($scope, $rootScope, $state, $filter, $uibModal, GDPRPreService, ChartFactory, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add Edit Search & Delete GDPR Pre-Assessments";

        $scope.OpList = [5, 10, 25, 50, 100];
        $scope.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'assessmentName',
            IsAsc: true,
            Filter: "",
            Total: 1,
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
        
        $scope.$watch('$scope.Grid1.Filter', function (n, o) {
            var searchedData = $filter('filter')($scope.Grid1.Data, $scope.Grid1.Filter);
            $scope.Grid1.Total = searchedData.length;
        });
        
        loadData();

        function loadData() {
        	GDPRPreService.Get().then(function (data) {
            	$rootScope.app.Mask = true;
            	data.forEach(function (r) {
            		var dtype = 'MM-DD-YYYY';
                    var d1 = moment(r.completionDate);
                    r.completionDate = (d1.isValid()) ? d1.format(dtype) : '';
                    r.dateStr = r.completionDate;
                });
            	$scope.Grid1.Total = data.length;
                $scope.Grid1.Data = data;          
                
                $rootScope.app.Mask = false;
            });
        };

        $scope.deleteAction = function (r) {
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                GDPRPreService.Delete(r.id).then(function (data) {
                    if (data.status === 200){
                        $scope.Grid1.Total--;
                        for(var i in $scope.Grid1.Data){
                            if($scope.Grid1.Data[i].id === rowId){
                                delete $scope.Grid1.Data[i];
                            }
                        }
                        loadData();
                    }
                });
            });
        };
    }
})();
