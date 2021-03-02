(function(){
    PolicyDocsController.$inject = ['$scope','$rootScope','$state', '$filter', 'PolicyService', 'ChartFactory', 'Utils'];
    app.controller('PolicyDocsCtrl', PolicyDocsController);

    function PolicyDocsController ($scope, $rootScope, $state, $filter, PolicyService, ChartFactory, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add Edit Search & Delete Policy and Procedure";

        $scope.OpList = [5, 10, 25, 50, 100];
        $scope.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'policyName',
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


       
        loadPolicyDocs();

        $scope.deleteAction = function(p, source){
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                $rootScope.app.Mask = true;
                if(source == 'approver'){
                    PolicyService.DeletePolicyApprover(p.id).then(function(data){
                        if(data.status===200) loadApprovers();
                    }, function(err){
                        $rootScope.app.Mask = false
                    });
                } else {
                    PolicyService.DeletePolicyDoc(p.id).then(function(data){
                        if(data.status===200) loadPolicyDocs();
                    }, function(err){
                        $rootScope.app.Mask = false
                    });
                }
            });
        };

        function loadPolicyDocs(){
            PolicyService.GetPolicyDocs($scope.PerPage, $scope.CurrPage)
                .then(function(data) {
                    data.forEach(function (r) {
                        var dtype = 'MM-DD-YYYY';
                        var d1 = moment(r.effectiveDate);
                        var d2 = moment(r.createdOn);
                        var d3 = moment(r.modifiedOn);
                        r.effectiveDate = (d1.isValid()) ? d1.format(dtype) : '';
                        r.createdOn = (d2.isValid()) ? d2.format(dtype) : '';
                        r.modifiedOn = (d3.isValid()) ? d3.format(dtype) : '';
                        r.effectiveDtStr = r.effectiveDate;
                        r.createonDtStr = r.createdOn;
                        r.modifiedonDtStr = r.modifiedOn;
                    });

                    $scope.Grid1.Total = data.length;
                    $scope.Grid1.Data = data;
                    $rootScope.app.Mask = false;
                });
        }




        PolicyService.GetPolicyByProcess().then(function(data){        
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
        PolicyService.GetPolicyByDept().then(function(data){
            ChartFactory.CreatePieChart('Policy Docs by Department', 'Policy Docs by Department', data, 'deptChart');
        });
        PolicyService.GetPolicyBySource().then(function(data){
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