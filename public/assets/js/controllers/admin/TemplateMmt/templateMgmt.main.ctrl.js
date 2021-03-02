(function(){
    TemplateManagementController.$inject = ['$scope', '$rootScope', '$state', '$filter', 'TmpmgmtService', 'ChartFactory', 'Utils'];
    app.controller('tmpUpldsCtrl', TemplateManagementController);

    function TemplateManagementController($scope, $rootScope, $state, $filter, TmpmgmtService, ChartFactory, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Template Management";

        $scope.OpList = [5, 10, 25, 50, 100];
        $scope.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'riskName',
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

        loadRim();

        $scope.deleteAction = function (r) {
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                console.log("U chose Yes");
                $rootScope.app.Mask = true;
                TmpmgmtService.DeleteTemplate(r.id).then(function (data) {
                    if (data.status === 200) loadRim();
                });
            });
        };

        function loadRim() {
            TmpmgmtService.GetTemplate().then(function (data) {
                data.forEach(function (r) {
                    if (r.assessmentType[0] != null) {
                        r.riskType = r.assessmentType[0].asTypeDesc;
                    }
                    if (r.fileModel[0] != null) {
                        r.fileName = r.fileModel[0].fileName;
                    }
                });

                console.log('datadatadatadatadatadata',data);

                $scope.Grid1.Total = data.length;
                $scope.Grid1.Data = data;
                console.log('$scope.Grid1.Data = data;',$scope.Grid1.Data)

                $rootScope.app.Mask = false;
            });
        }
    }
})();