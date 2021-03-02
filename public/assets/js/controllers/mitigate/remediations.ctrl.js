(function(){
    'use strict';

    RemediationsController.$inject = ['$scope','$rootScope','$state', '$filter', 'MitigateService', 'ChartFactory', 'Utils'];
    app.controller('RemediationsCtrl', RemediationsController);

    function RemediationsController ($scope, $rootScope, $state, $filter, MitigateService, ChartFactory, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "View Remediations";

        /*$scope.CurrCol = 'riskName';
        $scope.IsAsc = true;

        $scope.OpList = [10, 25, 50, 100];
        $scope.PerPage = 10;
        $scope.CurrPage = 1;

        $scope.sortMe = function(col){
            if($scope.CurrCol === col)
                $scope.IsAsc = !$scope.IsAsc;
            else
                $scope.CurrCol = col;
        };

        $scope.resSort = function(col){
            if($scope.CurrCol === col){
                return $scope.IsAsc? 'fa-sort-up' : 'fa-sort-down';
            } else {
                return 'fa-unsorted';
            }
        };*/
        
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

        MitigateService.GetStatus().then(function(data){
            ChartFactory.CreatePieChart('Remediations By Status', 'Remediations By Status', data, 'statusChart');
            // setupStatusChart(status);
            return MitigateService.GetPeriod();
        }).then(function(data){
            ChartFactory.CreateMultiColChart('By Period', data, 'periodChart');
            // setupPeriodChart(per);
            return MitigateService.GetRiskCategory();
        }).then(function(data){
            setupCatChart(data);
            return MitigateService.GetSeverity();
        }).then(function(data){
            var high = 0,
                medium = 0,
                low = 0,
                riskCate = data['risk category status'];
            angular.forEach(riskCate, function(val, key){
                if(key.indexOf('High') >- 1) {
                    high = high + val;
                }
                if(key.indexOf('Medium') > -1) {
                    medium = medium + val;
                }
                if(key.indexOf('low') > -1) {
                    low = low + val;
                }
            });
            var datalist = {
                High: high,
                Medium: medium,
                Low: low
            };
            ChartFactory.CreatePieChart('Remediations By Severity', 'Remediations By Severity', datalist, 'severityChart');
            // setupSeverityChart(data);
            $scope.$watch('PerPage', function(n, o){
                $rootScope.app.Mask = true;
                loadRemediations();
            });
        });

        function loadRemediations() {
            MitigateService.GetRemediations().then(function(data) {
                data.forEach(function(r, i){
                    r.remediationDate = Utils.createDate(r.RemediationDate) || new Date();
                    r.identifiedDate = Utils.createDate(r.IdentifiedDate);
                });
                $scope.Grid1.Total = data.length;
                $scope.Grid1.Data = data;
                $rootScope.app.Mask=false;
            });
        }

        function setupSeverityChart(data) {
            var opts = {
                Title: "Remediations By Severity",
                YText: "Values",
                Categories : [],
                Series: [
                    { name: "High", data: [], color:'#ffa500'},
                    { name: "Medium", data: [], color:'#a52a2a' },
                    { name: "Low", data: [], color:'#ffff00' }
                ]
            };

            Object.keys(data.categories).forEach(function(k){ opts.Categories.push(data.categories[k])});
            console.log(opts.Categories);
            opts.Categories.forEach(function(ck){
                $filter('filter')(Object.keys(data['risk category status']), ck).forEach(function(s, i){
                    if(s.indexOf(' High')>-1) opts.Series[0].data.push(data['risk category status'][s]);
                    if(s.indexOf(' Med')>-1)  opts.Series[1].data.push(data['risk category status'][s]);
                    if(s.indexOf(' Low')>-1)  opts.Series[2].data.push(data['risk category status'][s]);
                });
            });

            ChartFactory.SetupMultiColChart('categoryChart', opts);
        }

        function setupCatChart(data){
            var opts = {
                Title: "Remediations By Category",
                YText: "Values",
                Categories : [],
                Series: [
                    { name: "High", data: [], color:'#ffa500'},
                    { name: "Medium", data: [], color:'#a52a2a' },
                    { name: "Low", data: [], color:'#ffff00' }
                ]
            };

            Object.keys(data.categories).forEach(function(k){ opts.Categories.push(data.categories[k])});
            console.log(opts.Categories);
            opts.Categories.forEach(function(ck){
                $filter('filter')(Object.keys(data['risk category status']), ck).forEach(function(s, i){
                    if(s.indexOf(' High')>-1) opts.Series[0].data.push(data['risk category status'][s]);
                    if(s.indexOf(' Med')>-1)  opts.Series[1].data.push(data['risk category status'][s]);
                    if(s.indexOf(' Low')>-1)  opts.Series[2].data.push(data['risk category status'][s]);
                });
            });

                ChartFactory.SetupMultiColChart('categoryChart', opts);
        }
    }
})();
