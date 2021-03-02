(function () {
    ITRiskAssController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'ITRiskService', 'ChartFactory', 'Utils'];
    app.controller('ITRiskAssCtrl', ITRiskAssController);

    function ITRiskAssController($scope, $rootScope, $state, $uibModal, $filter, ITRiskService, ChartFactory, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add Edit Search & Delete IT Risk Assessments";
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

        function loadRam() {
            ITRiskService.GetRam().then(function (data) {
                data.forEach(function (r) {
                    r.IDate = Utils.createDate(r.modifiedOn);
                });

                $scope.Grid1.Total = data.length;
                $scope.Grid1.Data = data;

            }).finally(function () {
                $rootScope.app.Mask = false;
            });
        }

        $scope.downloadTemp = function () {
            var dlTmpModal = $uibModal.open({
                templateUrl: 'tmpdownload.tpl.html',
                controller: 'TmpDlCtrl',
                size: 'lg',
                resolve: {
                    items: function () {
                        return {
                            TempLoader: ITRiskService.GetTemplate(),
                            prefix: 'itram/templates/'
                        };
                    }
                }
            });

            dlTmpModal.result.then(function (updEquip) {

            });
        };

        $scope.deleteAction = function (r) {
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                console.log("U chose Yes");
                $rootScope.app.Mask = true;
                ITRiskService.DeleteRam(r.id).then(function (data) {
                    if (data.status === 200) loadRam();
                });
            });
        };

        function drawRegionChart(data) {
            var categories = [];
            $rootScope.app.Lookup.LIST001.forEach(function (item) {
                categories.push(item.val);
            });            
            var tmpobj = {};
            for (var i in categories) {
                var item = categories[i];
                var tmpit = item;
                angular.forEach(data, function (val, key) {
                    if (key.indexOf(tmpit) === 0) {
                        var re = key.substr(+tmpit.length + 1);
                        if(re.indexOf('Pacific') !== -1) re = re.substr(8);
                        if (angular.isArray(tmpobj[re])) {
                            tmpobj[re][i] += val * 1;
                        } else {
                            tmpobj[re] = [0, 0, 0, 0, 0];
                            tmpobj[re][i] = val;
                        }
                    }
                });
            }
            var series = [];
            angular.forEach(tmpobj, function (ary, key) {
                series.push({
                    name: key,
                    data: ary
                })
            });
            var config = {
                Text: 'By Region',
                yTitle: 'Regions',
                Categories: categories,
                Series: series
            };
            config = ChartFactory.SetupStackedChart(config);
            Highcharts.chart('regionChart', config);
        }

        ITRiskService.GetRamStatus().then(function (data) {
            ChartFactory.CreatePieChart('Risk Type Severity', 'Risk Type Severity', data, 'statusChart');
            // setupPieChart(data);
            /*return ITRiskService.GetRamPeriod();
        }).then(function (data) {
            ChartFactory.CreateLineChart('By Period', data, 'periodChart');
            // setupPeriodChart(data);*/
            return ITRiskService.GetRamDept();
        }).then(function (data) {
            //ChartFactory.CreateLabelChart('By Department', 'Risk Type Severity', '', '', '', data, 'deptChart');
            ChartFactory.CreatePieChart('By Department', 'By Department', data, 'deptChart');
            return ITRiskService.GetRamRegion();
        }).then(function (data) {
        	drawRegionChart(data);
            // setupDeptChart(data);
            loadRam();
        });
    }
})();