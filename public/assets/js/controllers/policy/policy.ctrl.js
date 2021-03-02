(function(){
    PolicyController.$inject = ['$scope','$rootScope','$state', '$filter', 'PolicyService', 'ChartFactory', 'Utils'];
    app.controller('PolicyCtrl', PolicyController);

    function PolicyController ($scope, $rootScope, $state, $filter, PolicyService, ChartFactory, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add Edit Search & Delete Policy Document";

        $scope.OpList = [5, 10, 25, 50, 100];
        $scope.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'docName',
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
        
        loadPolicies();

        $scope.deleteAction = function(p){
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                $rootScope.app.Mask = true;
                PolicyService.DeletePolicy(p.id).then(function(data){
                    if(data.status===200) loadPolicies();
                }, function(err){
                    $rootScope.app.Mask = false
                });
            });
        };

        function loadPolicies(){
            PolicyService.GetPolicies($scope.PerPage, $scope.CurrPage)
                .then(function(data) {
                    data.forEach(function(p) {
                        p.assessmentType = p.assessmentType[0].asTypeDesc;
                    });
                    $scope.Grid1.Total = data.length;
                    $scope.Grid1.Data = data;
                    $rootScope.app.Mask = false;
                });
        }

        PolicyService.GetPolicyDocsByProcess().then(function(data){
            let config = {
                chart: {
                    type: 'column'
                },

                title: {
                    text: 'Policy by Process'
                },
                xAxis: {
                    categories: ['Process']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Policy by Process'
                    }
                },
                series: []           
            }
            Object.keys(data).forEach((k)=>{
                config.series.push({name: k, data: [data[k]]});
            })

            Highcharts.chart('processChart', config);      
        });
        PolicyService.GetPolicyDocsByDept().then(function(data){
            ChartFactory.CreatePieChart('Policy by Department', 'Policy by Department', data, 'deptChart');
        });
        PolicyService.GetPolicyDocsBySource().then(function(data){
            let config = {
                chart: {
                    type: 'bar'
                },

                title: {
                    text: 'Policy by Source'
                },
                xAxis: {
                    categories: ['Source']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Policy by Source'
                    }
                },
                series: []           
            }
            Object.keys(data).forEach((k)=>{
                config.series.push({name: k, data: [data[k]]});
            })

            Highcharts.chart('sourceChart', config);
        });
    }
})();