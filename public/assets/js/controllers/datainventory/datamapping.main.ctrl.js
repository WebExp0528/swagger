(function () {
	DataMappingController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'DataInventoryService', 'Utils'];
    app.controller('DataMappingMainCtrl', DataMappingController);

    function DataMappingController($scope, $rootScope, $state, $uibModal, $filter, DataInventoryService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add Edit Search & Delete & Download Data Mappings";
        
        $scope.OpList = [5, 10, 25, 50, 100];
        $scope.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'name',
            IsAsc: true,
            Filter: "",
            Total: 0,
            Data: [],
            SortMe: function(col){
                if($scope.Grid1.Column === col)
                    $scope.Grid1.IsAsc = !$scope.Grid1.IsAsc;
                else
                    $scope.Grid1.Column = col;
            },
            GetIco: function(col){
                if($scope.Grid1.Column === col){
                    return $scope.Grid1.IsAsc? 'fa-sort-up' : 'fa-sort-down';
                } else {
                    return 'fa-unsorted';
                }
            }
        };
        $scope.$watch('Grid1.Filter', function(n, o){
            var searchedData = $filter('filter')($scope.Grid1.Data, $scope.Grid1.Filter);
            $scope.Grid1.Total = searchedData.length;
        });
        
        loadDataMappings();

        $scope.deleteAction = function(p){
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                $rootScope.app.Mask = true;
                DataInventoryService.DeleteDataMapping(p.id).then(function(data){
                    if(data.status===200) loadDataMappings();
                }, function(err){
                    $rootScope.app.Mask = false
                });
            });
        };

        function loadDataMappings(){
        	DataInventoryService.GetDataMappings($scope.PerPage, $scope.CurrPage)
                .then(function(data) {
                    $scope.Grid1.Total = data.length;
                    $scope.Grid1.Data = data;
                    $rootScope.app.Mask = false;
                });
        }
    }
})();