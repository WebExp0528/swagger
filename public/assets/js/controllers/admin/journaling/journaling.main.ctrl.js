(function () {
    "use strict";

    JournalingMainController.$inject = ['$scope', '$rootScope', '$state', '$filter', 'JournalingService', '$uibModal' , 'Utils'];
    app.controller('JournalingMainCtrl', JournalingMainController);

    function JournalingMainController($scope, $rootScope, $state, $filter, JournalingService, $uibModal, Utils) {
        var vm = this;
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Journaling Search";
        $scope.OpList = [5, 10, 25, 50, 100];
        $scope.Grid2 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'modifyDate',
            IsAsc: true,
            Filter: "",
            Total: 1,
            Data: [],
            SortMe: function (col) {
                if ($scope.Grid2.Column === col)
                    $scope.Grid2.IsAsc = !$scope.Grid2.IsAsc;
                else
                    $scope.Grid2.Column = col;
            },
            GetIco: function (col) {
                if ($scope.Grid2.Column === col) {
                    return $scope.Grid2.IsAsc ? 'fa-sort-up' : 'fa-sort-down';
                } else {
                    return 'fa-unsorted';
                }
            }
        };
        $scope.$watch('Grid2.Filter', function (n, o) {
            JournalingService.Search($scope.Grid2.Filter).then(function (data) {
                var result = data._embedded.eSAuditEntities;
                $scope.Grid2.Total = result.length;
                $scope.Grid2.Data = [];
                angular.forEach(result, function (obj, key) {
                    $scope.Grid2.Data.push({
                        id: obj.entityId,
                        name: obj.entityName,
                        field: obj.field,
                        collection: obj.collection,
                        from: obj.from,
                        to: obj.to,
                        user: obj.user,
                        changeType: changeType(obj.changeType),
                        modifyDate: moment(obj.modifyDate).format("YYYY-MM-DD")
                    });
                });
                $rootScope.app.Mask = false;
            }); 

        });

        function changeType (type) {
            switch(type){
                case "CREATE": return "Create";
                case "EDIT": return "Edit";
                case "DELETE": return "Delete";
                case "CHILD_ADDED": return "Added";
                default: return ""; 
            }
        }
   
    }

})();
