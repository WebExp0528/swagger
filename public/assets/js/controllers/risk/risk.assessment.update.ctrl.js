(function () {

    "use strict";

    RiskAssessmentUpdateController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'RiskService', 'Utils'];
    app.controller('RiskAssessmentUpdateCtrl', RiskAssessmentUpdateController);


    function RiskAssessmentUpdateController($scope, $rootScope, $state, $stateParams, RiskService, Utils) {

        $scope.mainTitle = $state.current.title || 'loading';
        $scope.mainDesc = "Update Risk Control Self Assessment";
        $scope.currPage = 'update';

        $scope.Form = {};

        $scope.submitAction = function () {
            if ($scope.Form.Rcsa.$invalid || $scope.Form.Rcsa.$pristine) return false;

            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.due_date);
            $scope.VM.due_date = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.dueDtStr = $scope.VM.due_date;
            var d2 = moment($scope.VM.approvedDate);
            $scope.VM.approvedDate = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.approvedDtStr = $scope.VM.approvedDate;

            var fileModel = $scope.VM.filemodel;
            var d = new Date();
            var idd = 'Risk' + d.getTime();
            $scope.VM.key = idd;
            RiskService.FileUpload(idd, fileModel)
                .then(function (res) {
                    if (res.status === 200) {
                        for (var i in fileModel) {
                            fileModel[i].id = res.data.fileId;
                            fileModel[i].filePath = res.data.path;
                        }
                    }
                })
                .finally(function () {
                    RiskService.UpdateAssessment($stateParams.id, $scope.VM).then(function (res) {
                        console.log('res', res);
                    }).finally(function () {
                        $state.go('app.risk.assessment.main');
                    });
                });
        };

        $scope.cancelAction = function () {
            if ($scope.Form.Rcsa.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.risk.assessment.main');
                });
                return false;
            }
            $state.go('app.risk.assessment.main');
        };

        $scope.setOpt = function (op) {
            op.Selected = !op.Selected;
            if (op.Selected) {
                $scope.RiskCategories.SelCount++;
            } else {
                $scope.RiskCategories.SelCount--;
            }

            console.log($scope.RiskCategories.SelCount);
        };
        
        $scope.createAssessment = function(vendor){
        	$rootScope.asId = $state.params.id;
            $state.go('app.risk.assessment.create', $scope.VM);
        };

        RiskService.GetAssessmentById($stateParams.id).then(function (data) {
            $scope.VM = data;

            var dtype = 'MM-DD-YYYY';
            var d1 = moment($scope.VM.due_date);
            $scope.VM.due_date = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.dueDtStr = $scope.VM.due_date;
            var d2 = moment($scope.VM.approvedDate);
            $scope.VM.approvedDate = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.approvedDtStr = $scope.VM.approvedDate;
            
            $rootScope.controlDataModel = $scope.VM.controlDataModel;

            $rootScope.app.Mask = false;
        });

        $scope.download = function (fileId, filePath) {
            var url = 'assessment/download/stream/' + fileId;
            var baseUrl = $rootScope.app.APIPrefix;
            url = baseUrl + url;
            window.open(url, '_blank');
        };
        
        $scope.removeItem = function (type, idx) {
            $scope.VM[type].splice(idx, 1);
        };

        $scope.addControls = function () {
            var headers = ["Control Category", "Control ID", "Control Name", "Control Source", "Business Procee", "Owner"],
                cols = ["controlCategory", "controlRefID", "controlName", "controlSource", "businessProcess", "controlOwner"];

            $rootScope.app.Mask = true;
            RiskService.GetControlData().then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                    c.modifiedOn = Utils.createDate(c.modifiedOn);
                });
                var controlModal = Utils.CreateSelectListView("Select Controls", data, headers, cols);
                controlModal.result.then(function (list) {
                    $scope.isEdit = true;
                    $scope.VM.controlDataModel = $scope.VM.controlDataModel.concat(list);
                });
                $rootScope.app.Mask = false;
            });
        };
        
        $scope.addRiskProfiles = function() {
        	var headers = ["Risk Description", "Category", "Inherent Risk", "Residual Risk", "Risk Direction", "Risk Accepted"],
            cols = ["riskDescription", "riskCategory", "inherentRiskRating", "residualRisk", "riskDirection", "riskAccepted"];
        
            RiskService.GetRiskProfile().then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                    c.modifiedOn = Utils.createDate(c.modifiedOn);
                });
                var profileModal = Utils.CreateSelectListView("Select Risk Profiles", data, headers, cols);
                profileModal.result.then(function (list) {
                    $scope.isEdit = true;
                    $scope.VM.riskProfileModel = $scope.VM.riskProfileModel.concat(list);
                    $rootScope.riskProfileModel = $scope.VM.riskProfileModel;
                });
            });
        };
        
        $scope.addControlTestPlans = function () {
        	var headers = ["Test Plan", "Region", "Department", "Active", "Control Tested", "Control Method"],
            cols = ["testPlanName", "regionName", "deptName", "active", "controlTested", "controlMethod"];
        
            RiskService.GetControlTestPlan().then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                    c.modifiedOn = Utils.createDate(c.modifiedOn);
                });
                var controlModal = Utils.CreateSelectListView("Select Controls", data, headers, cols);
                controlModal.result.then(function (list) {
                    $scope.isEdit = true;
                    $scope.VM.controlTestPlanModel = $scope.VM.controlTestPlanModel.concat(list);
                    $rootScope.controlTestPlanModel = $scope.VM.controlTestPlanModel;
                });
            });
        };
        
        $scope.addControlTestData = function () {
        	var headers = ["Description", "Control Type Level 1", "Control Type Level 2", "Design", "Performance", "Justification", "Accountability"],
            cols = ["description", "controlTypeLevel1", "controlTypeLevel2", "design", "performance", "justification", "accountability"];
        
            RiskService.GetControlTestData().then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                    c.modifiedOn = Utils.createDate(c.modifiedOn);
                });
                var controlModal = Utils.CreateSelectListView("Select Controls", data, headers, cols);
                controlModal.result.then(function (list) {
                    $scope.isEdit = true;
                    $scope.VM.controlTestDataModel = $scope.VM.controlTestDataModel.concat(list);
                    $rootScope.controlTestDataModel = $scope.VM.controlTestDataModel;
                });
            });
        };

    }
})();