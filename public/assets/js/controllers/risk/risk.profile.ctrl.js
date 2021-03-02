(function () {
    "use strict";

    RiskProfileController.$inject = ['$scope', '$rootScope', '$state', '$filter', 'RiskService', 'ChartFactory', 'Utils'];
    app.controller('RiskProfileCtrl', RiskProfileController);

    function RiskProfileController($scope, $rootScope, $state, $filter, RiskService, ChartFactory, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add Edit Search & Delete Risk Profiles";

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
        
        loadRiskProfile();

        $scope.deleteAction = function (r) {
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                console.log("You chose Yes");
                $rootScope.app.Mask = true;
                RiskService.DeleteRiskProfile(r.id).then(function (data) {
                    loadRiskProfile();
                });
            });
        };

        $scope.editAction = function (r) {
        };

        function loadRiskProfile() {
            RiskService.GetRiskProfile().then(function (data) {
                data.forEach(function (r) {
                    r.IDate = Utils.createDate(r.identifiedDate);
                });

                $scope.Grid1.Total = data.length;
                $scope.Grid1.Data = data;

                $rootScope.app.Mask = false;
            });
        }
        
        $scope.selectAll = function () {
            var chk = $scope.all_check;
            angular.forEach($scope.Grid1.Data, function (value, key) {
                value.checked = chk;
            });
        }

        $scope.downloadExcel = function () {
            var data = {};
            data.heights = [];
            data.sheetName = "CONTROL REPOSITORY";
            data.body = [];

            var head_txt = [
                { text: 'Risk Description', color: '99ccff' },
                { text: 'Secondary Risk Impact', color: 'ccffff' },
                { text: 'Geographic Impact', color: 'ccffff' },
                { text: 'Legal Entity Tier 1 Impact', color: 'ccffff' },
                { text: 'Legal Entity Tier 2 Impact', color: 'ccffff', merge: 3 },
                { text: 'Potential Impact', color: 'ccffff' },
                { text: 'Inherent Impact', color: 'ffccff' },
                { text: 'Inherent Likeli-hood', color: 'ffccff' },
                { text: 'Inherent Risk Rating', color: 'ffccff' },
                { text: 'Everest Level 1', color: 'ccffcc' },
                { text: 'Basel Level 1', color: 'ccffcc' },
                { text: 'Basel Level 2', color: 'ccffcc' },
                { text: 'Risk Category Level 3', color: 'ccffcc' },
                { text: 'Process Name(Level 1)', color: 'ccffcc' },
                { text: 'Process Level 2 Name', color: 'ccffcc' },
                { text: 'Causal Category ', color: 'ccffcc', merge: 2 },
                { text: 'Control', color: 'ffff00', merge: 7 },
                { text: 'Residual Risk', color: '33ffff' },
                { text: 'Risk Direction', color: '33ffff' },
                { text: 'Risk Accepted', color: '33ffff' },
                { text: 'Issue Outstanding?', color: '33ffff' },
                { text: 'Remediation Plan', color: 'ffcc99' },
                { text: 'Remediation Owner', color: 'ffcc99' },
                { text: 'Remediation Date', color: 'ffcc99' },
                { text: 'Remediation Status', color: 'ffcc99' },
                { text: 'Monitor', color: '00ffcc', merge: 3 },
                { text: 'Report Recipients', color: 'c0c0c0' },
                { text: 'Report Frequency', color: 'c0c0c0' },
            ];
            var skip = 0;
            for (var i = 0; i < head_txt.length; i++) {
                var headCell = {
                    col: i + 1 + skip,
                    row: 1,
                    text: head_txt[i].text,
                    font: { name: 'Calibri', sz: '11', family: '3', scheme: '-', bold: 'true' },
                    fill: { type: 'solid', fgColor: head_txt[i].color },
                    border: { left: 'thin', top: 'thin', right: 'thin', bottom: 'thin' },
                    wrap: 'true',
                    align: 'center'
                }
                if (head_txt[i].merge) {
                    headCell.merge = {
                        to: {
                            col: i + 1 + skip,
                            row: 1
                        },
                        from : {
                            col: i + 1 + head_txt[i].merge - 1 + skip,
                            row: 1
                        }
                    }
                }
                data.body.push(headCell);
                if (head_txt[i].merge) {
                    skip += (head_txt[i].merge - 1) || 0;
                }
            }
            data.heights.push({ row: 1, height: 30 });
            
            // sheet.merge(cell.merge.to, cell.merge.from); //cell.merge = { to : { col: x, row: y }, from : { col: x1, row: y1 } }
            
            var newData = $filter('filter')($scope.Grid1.Data, { checked: true });
            var riskDescs = [];
            angular.forEach(newData, function(data, index) {
                var item = riskDescs.find(function(element) {
                    return element == data.riskDescription;
                });
                if (!item) {
                    riskDescs.push(data.riskDescription);
                }
            });
                        
            if (newData.length < 1) {
                alert('Please select at least one record');
                return false;
            }

            var overall = [];
            
            var total = 1;
            var row = 2;
            var color;
            angular.forEach(riskDescs, function (description, index) {
                var dataList = $filter('filter')($scope.Grid1.Data, { riskDescription: description });
                var grouptotal = 0;
                for (var k = 0; k < dataList.length; k ++) {
                    var totalRows = dataList[k].controlTestDataModel.length + 1;
                    if (totalRows == 1) totalRows = 2;
                    grouptotal += totalRows;
                }
                data.body.push(getCellData(description, 'b8cce4', 1, row, 1, grouptotal));

                angular.forEach(dataList, function (obj, ind) {
                    var totalRows = obj.controlTestDataModel.length + 1;
                    if (totalRows == 1) totalRows = 2;
                    total += totalRows;
                    data.body.push(getCellData(obj.secondaryRiskImpact, 'ffffff', 2, row, 1, totalRows));
                    data.body.push(getCellData(obj.geographicImpact, 'ffffff', 3, row, 1, totalRows));
                    data.body.push(getCellData(obj.legalEntTier1Impact, 'ffffff', 4, row, 1, totalRows));
                    data.body.push(getCellData(obj.legalEntTier2Impact, 'ffffff', 5, row, 3, totalRows));
                    data.body.push(getCellData(obj.potentialImpact, 'ffffff', 8, row, 1, totalRows));
                    data.body.push(getCellData(obj.inherentImpact, 'ffffff', 9, row, 1, totalRows));
                    data.body.push(getCellData(obj.inherentLikeliHood, 'ffffff', 10, row, 1, totalRows));
                    color = 'ffffff';
                    if (obj.inherentRiskRating === 'High') color = 'ff0000';
                    if (obj.inherentRiskRating === 'Moderate') color = 'ffff00';
                    data.body.push(getCellData(obj.inherentRiskRating, color, 11, row, 1, totalRows));
                    data.body.push(getCellData(obj.everestLevel1, 'ffffff', 12, row, 1, totalRows));
                    data.body.push(getCellData(obj.baselLevel1, 'ffffff', 13, row, 1, totalRows));
                    data.body.push(getCellData(obj.baselLevel2, 'ffffff', 14, row, 1, totalRows));
                    data.body.push(getCellData(obj.riskCategory, 'ffffff', 15, row, 1, totalRows));
                    data.body.push(getCellData(obj.processNameLevel1, 'ffffff', 16, row, 1, totalRows));
                    data.body.push(getCellData(obj.processNameLevel2, 'ffffff', 17, row, 1, totalRows));
                    data.body.push(getCellData('Causal Level 1', 'ccffcc', 18, row, 1, 1));
                    data.body.push(getCellData('Causal Level 2', 'ccffcc', 19, row, 1, 1));
                    data.body.push(getCellData(obj.causalLevel1, 'ffffff', 18, row + 1, 1, totalRows - 1));
                    data.body.push(getCellData(obj.causalLevel2, 'ffffff', 19, row + 1, 1, totalRows - 1));
                    data.body.push(getCellData('Description', 'ffff00', 20, row, 1, 1));
                    data.body.push(getCellData('Control Type Level 1', 'ffff00', 21, row, 1, 1));
                    data.body.push(getCellData('Control Type Level 2', 'ffff00', 22, row, 1, 1));
                    data.body.push(getCellData('Design', 'ffff00', 23, row, 1, 1));
                    data.body.push(getCellData('Performance', 'ffff00', 24, row, 1, 1));
                    data.body.push(getCellData('Justification', 'ffff00', 25, row, 1, 1));
                    data.body.push(getCellData('Accountability', 'ffff00', 26, row, 1, 1));
                    for (var k = 0; k < obj.controlTestDataModel.length; k ++) {
                        data.body.push(getCellData(obj.controlTestDataModel[k].description, 'ffffff', 20, row + 1 + k, 1, 1));
                        data.body.push(getCellData(obj.controlTestDataModel[k].controlTypeLevel1, 'ffffff', 21, row + 1 + k, 1, 1));
                        data.body.push(getCellData(obj.controlTestDataModel[k].controlTypeLevel2, 'ffffff', 22, row + 1 + k, 1, 1));
                        data.body.push(getCellData(obj.controlTestDataModel[k].design, 'ffffff', 23, row + 1 + k, 1, 1));
                        data.body.push(getCellData(obj.controlTestDataModel[k].performance, 'ffffff', 24, row + 1 + k, 1, 1));
                        data.body.push(getCellData(obj.controlTestDataModel[k].justification, 'ffffff', 25, row + 1 + k, 1, 1));
                        data.body.push(getCellData(obj.controlTestDataModel[k].accountability, 'ffffff', 26, row + 1 + k, 1, 1));
                    }
                    color = 'ffffff';
                    if (obj.residualRisk === 'Moderate') color = 'ffff00';
                    data.body.push(getCellData(obj.residualRisk, color, 27, row, 1, totalRows));
                    color = 'ffffff';
                    if (obj.riskDirection === 'Stable') color = 'ffff00';
                    data.body.push(getCellData(obj.riskDirection, color, 28, row, 1, totalRows));
                    data.body.push(getCellData(obj.riskAccepted, 'ffffff', 29, row, 1, totalRows));
                    data.body.push(getCellData(obj.issueOutstanding, 'ffffff', 30, row, 1, totalRows));
                    data.body.push(getCellData(obj.remePlan, 'ffffff', 31, row, 1, totalRows));
                    data.body.push(getCellData(obj.remeOwner, 'ffffff', 32, row, 1, totalRows));
                    data.body.push(getCellData(obj.remediationDtStr, 'ffffff', 33, row, 1, totalRows));
                    data.body.push(getCellData(obj.remeStatus, 'ffffff', 34, row, 1, totalRows));
                    data.body.push(getCellData(obj.reportRecipients, 'ffffff', 38, row, 1, totalRows));
                    data.body.push(getCellData(obj.reportFrequency, 'ffffff', 39, row, 1, totalRows));
                    data.body.push(getCellData('Monitoring Type', '00ffcc', 35, row, 1, 1));
                    data.body.push(getCellData('Description', '00ffcc', 36, row, 1, 1));
                    data.body.push(getCellData('Date & Value', '00ffcc', 37, row, 1, 1));
                    data.body.push(getCellData(obj.monitoringType, 'ffffff', 35, row + 1, 1, totalRows - 1));
                    data.body.push(getCellData(obj.monitorDescription, 'ffffff', 36, row + 1, 1, totalRows - 1));
                    data.body.push(getCellData(obj.monitorDateAndValue, '00ffcc', 37, row + 1, 1, totalRows - 1));

                    overall.push({
                        riskCategory: obj.riskCategory,
                        inherentRiskRating: obj.inherentRiskRating,
                        controlEfficiency: '',
                        residualRisk: obj.residualRisk,
                        riskDirection: obj.riskDirection
                    });
                    row += totalRows;
                });
            });

            total ++;
            data.body.push(getCellData('Risk Category', '00ffcc', 1, total + 1, 6, 1, 'left'));
            data.body.push(getCellData('Overall Inherent Risk', '00ffcc', 7, total + 1, 9, 1, 'left'));
            data.body.push(getCellData('Overall Control Effectiveness', '00ffcc', 16, total + 1, 9, 1, 'left'));
            data.body.push(getCellData('Overall Residual Risk', '00ffcc', 25, total + 1, 8, 1, 'left'));
            data.body.push(getCellData('Overall Direction of Risk', '00ffcc', 33, total + 1, 7, 1, 'left'));
            total ++;

            for (var i = 0; i < overall.length; i ++) {
                data.body.push(getCellData(overall[i].riskCategory, 'ffffff', 1, total + 1, 6, 1, 'left'));
                color = 'ffffff';
                if (overall[i].inherentRiskRating == 'Moderate') color = 'ffff00';
                else if (overall[i].inherentRiskRating == 'High') color = 'ff0000';
                data.body.push(getCellData(overall[i].inherentRiskRating, color, 7, total + 1, 9, 1, 'left'));
                data.body.push(getCellData(overall[i].controlEfficiency, 'ffffff', 16, total + 1, 9, 1, 'left'));
                color = 'ffffff';
                if (overall[i].residualRisk == 'Moderate') color = 'ffff00';
                else if (overall[i].residualRisk == 'High') color = 'ff0000';
                data.body.push(getCellData(overall[i].residualRisk, color, 25, total + 1, 8, 1, 'left'));
                color = 'ffffff';
                if (overall[i].riskDirection == 'Stable') color = 'ffff00';
                else if (overall[i].riskDirection == 'Increasing') color = 'ff0000';
                data.body.push(getCellData(overall[i].riskDirection, color, 33, total + 1, 7, 1, 'left'));
                total ++;
            }
            data.body.push(getCellData('Everest: Confidential', 'ffffff', 1, total + 1, 11, 1, 'left'));
            data.body.push(getCellData('2', 'ffffff', 12, total + 1, 14, 1));
            data.body.push(getCellData('Report Run Date:', 'ffffff', 26, total + 1, 6, 1, 'right'));
            data.body.push(getCellData(new Date(), 'ffffff', 32, total + 1, 8, 1, 'left'));
            total ++;

            data.cols = 40;
            data.rows = total;

            var wval = [25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
            data.widths = [];
            for (var i = 0; i < wval.length; i++) {
                data.widths.push({ col: +i + 1, width: wval[i] });
            }

            RiskService.DownloadExcel(data).then(function (response) {
                var nodeUrl = $rootScope.app.NodeApi;
                location.assign(nodeUrl + '/downloadExcel/' + response.data);
            }).catch(function (error) {
                console.log('error!');
            });
        };

        function getCellData(data, color, col, row, mergeCol = 1, mergeRow = 1, align = 'center') {
            var cell = {
                col: col,
                row: row,
                text: data,
                font: { name: 'Calibri', sz: '11', family: '3', scheme: '-', bold: 'true' },
                fill: { type: 'solid', fgColor: color },
                border: { left: 'thin', top: 'thin', right: 'thin', bottom: 'thin' },
                wrap: 'true',
                align: align,
                valign: 'top'
            }
            if (mergeRow != 1 || mergeCol != 1) {
                cell.merge = {
                    to: {
                        row: row,
                        col: col
                    },
                    from: {
                        row: row + mergeRow - 1,
                        col: col + mergeCol - 1
                    }
                }
            }
            return cell;
        }
    }
})();