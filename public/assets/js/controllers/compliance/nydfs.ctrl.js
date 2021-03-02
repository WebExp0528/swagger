(function () {
    "use strict";

    NYDFSAssessmentController.$inject = ['$scope', '$rootScope', '$state', '$filter', 'RiskService', 'ChartFactory', 'Utils'];
    app.controller('NYDFSAssessmentCtrl', NYDFSAssessmentController);

    function NYDFSAssessmentController($scope, $rootScope, $state, $filter, RiskService, ChartFactory, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add Edit Search & Delete NYDFS Assessments";

        $scope.VM = {
        	controlDataModel: []
        }

        $scope.OpList = [5, 10, 25, 50, 100];
        $scope.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'assessName',
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

        $scope.downloadTemp = function () {
            var dlTmpModal = $uibModal.open({
                templateUrl: 'tmpdownload.tpl.html',
                controller: 'TmpDlCtrl',
                size: 'lg',
                resolve: {
                    items: function () {
                        return {
                            TempLoader: OPRiskService.GetRSATemplates(),
                            prefix: 'rcsa/templates'
                        };
                    }
                }
            });
            // // console.log('dlTmpModal',TempLoader);
            // return;
            //
            dlTmpModal.result.then(function (updEquip) {

            });
        };

        RiskService.GetNYDFSStatus()
            .then(function (data) {
                $rootScope.app.Mask = true;
                ChartFactory.CreatePieChart('By Status', 'Status', data, 'Status');
                /*return RiskService.GetPeriod();
            })
            .then(function (data) {
                ChartFactory.CreateMultiColChart('By Period', data, 'periodChart');*/
                return RiskService.GetNYDFSDept();
            })
            .then(function (data) {
                ChartFactory.CreatePieChart('By Department', 'Risk Type Severity', data, 'deptstacked');
                loadAssessments();
            });
        
        RiskService.GetControlData().then(function (data) {
        	$scope.VM.controlDataModel = data;
        });

        $scope.deleteAction = function (r) {
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                console.log("U chose Yes");
                $rootScope.app.Mask = true;
                RiskService.DeleteAssessment(r.id).then(function (data) {
                    if (data.status === 200) loadAssessments();
                });
            });
        };

        $scope.editAction = function (r) {

        };

        function loadAssessments() {
            RiskService.GetNYDFSAssessment().then(function (data) {
                $scope.Grid1.Total = data.length;
                $scope.Grid1.Data = data;

                $rootScope.app.Mask = false;
            });
        }

        function drawRegionChart() {
            if ($rootScope.app.Mask) return;
            var categories = [];
            $rootScope.app.Lookup.LIST001.forEach(function (item) {
                categories.push(item.val);
            });
            var tempAry = new Array();
            $scope.Grid1.Data.forEach(function (row) {
                var approval = row.approval;
                var region = row.region;
                if (region.indexOf('Asia') !== -1)
                    region = 'Asia';
                if (region.indexOf('EMEA') !== -1)
                    region = 'South America';

                if (typeof(tempAry[approval]) == 'undefined') {
                    var ary = Array.apply(null, Array(categories.length)).map(Number.prototype.valueOf, 0);
                    tempAry[approval] = ary;
                }

                var ind = categories.indexOf(region);
                if (ind < 0) return;
                tempAry[approval][ind]++;
            });

            var series = [];
            for (var k in tempAry) {
                series.push({
                    name: k,
                    data: tempAry[k]
                })
            }
            var config = {
                Text: 'By Region',
                Title: '',
                Categories: categories,
                Series: series
            };
            config = ChartFactory.SetupStackedChart(config);
            Highcharts.chart('regionstacked', config);
        }

        $scope.$watch('Grid1.Data', function (n, o) {
            drawRegionChart();
        });
    }
})();
