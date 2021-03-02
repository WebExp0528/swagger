(function () {
    'use strict';
    GDPRAssessmentCreateController.$inject = ['$scope', '$rootScope', '$state', 'RiskService', 'Utils', '$filter', 'UniqueID'];
    app.controller('GDPRAssessmentCreateCtrl', GDPRAssessmentCreateController);
    function GDPRAssessmentCreateController($scope, $rootScope, $state, RiskService, Utils, $filter, UniqueID) {
        $scope.mainTitle = $state.current.title;
        
        $rootScope.app.Mask = true;
        
        var asId = $rootScope.asId;
        var page = $state.params.page;
        $scope.page = page;
        
        var data = {};

    	data.title = $state.params.assessName;
    	data.assessmentBy = $state.params.assessmentBy;
    	data.approver = $state.params.approver;
    	data.approvedDate = $state.params.approvedDate,
    	data.assessmentsDate = $state.params.due_date;
    	data.riskType = $state.params.riskType;
    	data.docType = $state.params.docType;
    	data.period = $state.params.period;
    	
    	$scope.assessmentsDate = data.assessmentsDate;
        data.approvedDate = Utils.GetDPDate(data.approvedDate);
        data.assessmentsDate = Utils.GetDPDate(data.assessmentsDate);
        $scope.formData = data;
        
        //$scope.data_flag = 'new';
        $scope.gridData = $rootScope.controlDataModel;
        
        $scope.goBack = function () {
            $state.go('app.compliance.gdpr.update', {id: $rootScope.asId});
        };

        $scope.downloadExcel = function () {
            var data = {};
            data.heights = [];
            data.sheetName = "GDPR Assessment";
            data.body = [];

            data.body.push({
                col: 1, row: 1, text: 'Assessment', valign: 'center', align: 'center',
                merge: {to: {col: 1, row: 1}, from: {col: 6, row: 1}},
                fill: {type: 'solid', fgColor: '457BE6'},
                font: {name: 'Calibri', sz: '24', family: '3', scheme: '-', bold: 'true'}
            });
            data.heights.push({row: 1, height: 60});

            data.body.push({
                col: 2,
                row: 5,
                text: 'Assessment Date: ' + $scope.formData.assessmentsDate + '  Assessment By: ' + $scope.formData.assessmentBy,
                align: 'center',
                font: {name: 'Calibri', sz: '13', family: '3', scheme: '-', bold: 'true'}
            });
            data.heights.push({row: 5, height: 25});

            data.body.push({
                col: 2,
                row: 6,
                text: 'Doc Title: ' + $scope.formData.title + '  Doc Type: ' + $scope.formData.docType,
                align: 'center',
                font: {name: 'Calibri', sz: '13', family: '3', scheme: '-', bold: 'true'}
            });
            data.heights.push({row: 6, height: 25});

            /*data.body.push({
                col: 2, row: 7, text: 'Risk Score: ' + $scope.formData.riskScore, align: 'center',
                font: {name: 'Calibri', sz: '13', family: '3', scheme: '-', bold: 'true'}
            });*/
            data.heights.push({row: 7, height: 25});

            var head_txt = ['Risk Category', 'Risk Assessment', 'Yes', 'No', 'Findings', 'Comments'];
            for (var i = 0; i < head_txt.length; i++) {
                data.body.push({
                    col: (+i + 1),
                    row: 9,
                    text: head_txt[i],
                    font: {name: 'Calibri', sz: '11', family: '3', scheme: '-', bold: 'true'},
                    fill: {type: 'solid', fgColor: '457BE6'},
                    border: {left: 'thin', top: 'thin', right: 'thin', bottom: 'thin'},
                    wrap: 'true'
                });
            }
            data.heights.push({row: 9, height: 30});

            var num = 10;
            var newObj = []
            angular.forEach($scope.gridData, function (obj, ind) {
                var yesStr = '';
                var noStr = '';
                if (obj.response == 'Y') {
                    yesStr = "Y";
                }
                if (obj.response == 'N') {
                    noStr = "N";
                }
                var vendor_comment = obj.comments || '';
                var vendor_Findings = obj.finding || '';
                var vendor_Category = obj.category || obj.controlCategory;
                var name = obj.name || obj.controlName;
                newObj.push([vendor_Category, name, yesStr, noStr, vendor_Findings, vendor_comment]);
                num++;
            });

            data.commonData = {
                data: newObj,
                font: {name: 'Calibri', sz: '11', family: '2', scheme: '-'},
                border: {left: 'thin', top: 'thin', right: 'thin', bottom: 'thin'},
                fill: {type: 'solid', fgColor: 'd1daed'},
                wrap: 'true',
                height: 30,
                srow: 10,
                scol: 1
            };

            data.cols = 7;
            data.rows = num * 1 + 5;

            var wval = [25, 100, 10, 10, 15, 25];
            data.widths = [];
            for (var i = 0; i < wval.length; i++) {
                data.widths.push({col: +i + 1, width: wval[i]});
            }

            RiskService.DownloadExcel(data).then(function (response) {
                var nodeUrl = $rootScope.app.NodeApi;
                location.assign(nodeUrl+ '/downloadExcel/' + response.data);
            }).catch(function (error) {
                console.log('error!');
            });            
        };
        
        $rootScope.app.Mask = false;
    }
})();
