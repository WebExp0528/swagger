(function () {
    "use strict";

    RiskControlMatrixController.$inject = ['$scope', '$rootScope', '$state', '$filter', 'RiskService', 'ChartFactory', 'Utils', 'DeptService', 'RiskDataService', 'VendorService'];
    app.controller('RiskRCMCtrl', RiskControlMatrixController);

    function RiskControlMatrixController($scope, $rootScope, $state, $filter, RiskService, ChartFactory, Utils, DeptService, RiskDataService, VendorService) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Risk Control Self Assessment";

        $rootScope.app.Mask = true;
   
        function random(seed, bound) {
            var x = Math.sin(seed) * 10000;
            return parseInt((x - Math.floor(x)) * bound);
        }

        setupDeptMap();
        setupDept2Map();
        setupRegionMap();
        setupRegionMap2();
        setupAssessMap();
        setupAssessMap2();

        function setupDeptMap() {
            var ChartOpts = {
                Title: 'Risk Score and Risk Acceptance By Department',
                XCategories: ['Overall Risk Score', 'Risk Acceptance'],
                YCategories: ['Treaty', 'Surety', 'Insurer', 'Auto', 'Claims'],
                SeriesName: 'Series',
                SeriesData: []
            };

            var seed = 1;
            // for (var i = 0; i < ChartOpts.XCategories.length; i ++) {
            for (var j = 0; j < ChartOpts.YCategories.length; j ++) {
                ChartOpts.SeriesData.push([0, j, random(seed++, 100)]);
            }
            var detail = ['High', 'Moderate', 'Low', 'High', 'Low'];
            for (var j = 0; j < ChartOpts.YCategories.length; j++) {
                ChartOpts.SeriesData.push([1, j, detail[j]]);
            }
            // }

            ChartFactory.BuildHeatMap('deptHeatmap', ChartOpts);
        }

        function setupDept2Map() {
            var ChartOpts = {
                Title: 'Controls By Department',
                XCategories: ['Controls Tested', 'Controls Tested', 'Controls Partially Successful'],
                YCategories: ['Treaty', 'Surety', 'Insurer', 'Auto', 'Claims'],
                SeriesName: 'Series',
                SeriesData: []
            };

            var seed = 1;
            for (var i = 0; i < ChartOpts.XCategories.length; i++) {
                for (var j = 0; j < ChartOpts.YCategories.length; j++) {
                    ChartOpts.SeriesData.push([i, j, random(seed++, 100)]);
                }
            }

            ChartFactory.BuildHeatMap('deptHeatmap2', ChartOpts);
        }

        function setupRegionMap() {
            var ChartOpts = {
                Title: 'Risk Score By Region',
                XCategories: ['Risk Score'],
                YCategories: ['Asia', 'Latin America', 'North America', 'EMEA'],
                SeriesName: 'Series',
                SeriesData: []
            };

            var seed = 1;
            for (var i = 0; i < ChartOpts.XCategories.length; i++) {
                for (var j = 0; j < ChartOpts.YCategories.length; j++) {
                    ChartOpts.SeriesData.push([i, j, random(seed++, 100)]);
                }
            }

            ChartFactory.BuildHeatMap('regionMap', ChartOpts);
        }

        function setupRegionMap2() {
            var ChartOpts = {
                Title: 'Controls By Region',
                XCategories: ['Controls Tested', 'Controls Tested', 'Controls Partially Successful'],
                YCategories: ['Asia', 'Latin America', 'North America', 'EMEA'],
                SeriesName: 'Series',
                SeriesData: []
            };

            var seed = 1;
            for (var i = 0; i < ChartOpts.XCategories.length; i++) {
                for (var j = 0; j < ChartOpts.YCategories.length; j++) {
                    ChartOpts.SeriesData.push([i, j, random(seed++, 100)]);
                }
            }

            ChartFactory.BuildHeatMap('regionMap2', ChartOpts);
        }

        function setupAssessMap() {
            var ChartOpts = {
                Title: 'Assessments By Region',
                XCategories: ['Asia', 'Latin America', 'North America', 'EMEA'],
                YCategories: ['Policies and Procedures', 'Patch Management', 'Physical Security', 'Information Security Admin', 'Network Infrastructure', 'Firewall', 'Malware Controls', 'Disaster Recovery', 'Account Management', 'E-Commerce'],
                SeriesName: 'Series',
                SeriesData: []
            };

            var seed = 1;
            for (var i = 0; i < ChartOpts.XCategories.length; i++) {
                for (var j = 0; j < ChartOpts.YCategories.length; j++) {
                    ChartOpts.SeriesData.push([i, j, random(seed++, 100)]);
                }
            }

            ChartFactory.BuildHeatMap('assessMap', ChartOpts);
        }

        function setupAssessMap2() {
            var ChartOpts = {
                Title: 'Assessments By Department',
                XCategories: ['Treaty', 'Surety', 'Insurer', 'Auto', 'Claims'],
                YCategories: ['Policies and Procedures', 'Patch Management', 'Physical Security', 'Information Security Admin', 'Network Infrastructure', 'Firewall', 'Malware Controls', 'Disaster Recovery', 'Account Management', 'E-Commerce'],
                SeriesName: 'Series',
                SeriesData: []
            };

            var seed = 1;
            for (var i = 0; i < ChartOpts.XCategories.length; i++) {
                for (var j = 0; j < ChartOpts.YCategories.length; j++) {
                    ChartOpts.SeriesData.push([i, j, random(seed++, 100)]);
                }
            }

            ChartFactory.BuildHeatMap('assessMap2', ChartOpts);
        }  
        
        $rootScope.app.Mask = false;
    }
})();