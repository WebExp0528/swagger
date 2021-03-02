/**
 Desc: Controller for Create and View the Volcker Assessment Data
 author: Roma
 */
(function () {
    'use strict';
    VolckerAssessmentController.$inject = ['$rootScope', '$state', 'ComplianceService', 'Utils', '$filter', 'UniqueID'];
    app.controller('VolckerAssessmentCtrl', VolckerAssessmentController);
    function VolckerAssessmentController($rootScope, $state, ComplianceService, Utils, $filter, UniqueID) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        var assessName = $state.params.assessName;
        var assessDate = $state.params.assessDate;
        var assessmentBy = $state.params.assessmentBy;
        var assessType = $state.params.assessType;
        var page = $state.params.page;
        vm.assessName = assessName;
        vm.assessDate = assessDate;
        vm.assessmentBy = assessmentBy;
        vm.assessType = assessType;
        vm.page = page;

        ComplianceService.GetQuestionsFromControl("Volcker").then(function(re) {
			vm.gridData = re;
			vm.data_flag = 'new';
            $rootScope.app.Mask = false;
        });

        vm.goBack = function () {
            $state.go('app.compliance.volckertp.main');
        };

        vm.generateId = function () {
            var uid = UniqueID.new();
            return uid;
        };

        vm.downloadExcel = function () {
            var data = {};
            data.heights = [];
            data.sheetName = "Volcker Assessment";
            data.body = [];

            data.body.push({
                col: 1, row: 1, text: 'Volcker Assessment', valign: 'center', align: 'center',
                merge: {to: {col: 1, row: 1}, from: {col: 6, row: 1}},
                fill: {type: 'solid', fgColor: '457BE6'},
                font: {name: 'Calibri', sz: '24', family: '3', scheme: '-', bold: 'true'}
            });
            data.heights.push({row: 1, height: 60});

            data.body.push({
                col: 2,
                row: 5,
                text: 'Assessment Date: ' + vm.assessDate + '  Assessment By: ' + vm.assessmentBy,
                align: 'center',
                font: {name: 'Calibri', sz: '13', family: '3', scheme: '-', bold: 'true'}
            });
            data.heights.push({row: 5, height: 25});

            data.body.push({
                col: 2,
                row: 6,
                text: 'Assessment: ' + vm.assessName + '  Assessment Type: ' + vm.assessType,
                align: 'center',
                font: {name: 'Calibri', sz: '13', family: '3', scheme: '-', bold: 'true'}
            });
            data.heights.push({row: 6, height: 25});

            var head_txt = ['Volcker Category', 'Volcker Assessment', 'Yes', 'No', 'Findings', 'Comments'];
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
            angular.forEach(vm.gridData, function (obj, ind) {
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
                var vendor_Category = obj.category || obj.control_Category;
                var name = obj.name || obj.control_Name;
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

            ComplianceService.DownloadExcel(data).then(function (response) {
                var nodeUrl = $rootScope.app.NodeApi;
                location.assign(nodeUrl+ '/downloadExcel/' + response.data);
            }).catch(function (error) {
                console.log('error!');
            });
        };
    }
})();