(function () {

    "use strict";

    RiskAssessmentFormController.$inject = ['$scope', '$rootScope', '$state', 'RiskService', 'Utils'];
    app.controller('RiskAssessmentFormCtrl', RiskAssessmentFormController);


    function RiskAssessmentFormController($scope, $rootScope, $state, RiskService, Utils) {

        $scope.mainTitle = $state.current.title || 'loading';
        $scope.mainDesc = "Add Risk Control Self Assessment";
        $scope.currPage = 'insert';

        $scope.Form = {};

        $scope.VM = {
    		assessName: "",
            assessDesc: "",
            assessmentBy: "",
            approver: "",
            approvedDate: "",
            riskType: "",
            docType: "",
            period: "",
            region: "",
            business: "",
            frequency: "",
            due_date: "",
            asmntType: "AOP03",
            asmntTypeName: "RCSA",
            actualName: "",
            priority: "",
            resPerson: "",
            approval: "",
            classification: "",
            fileModel: [],
            controlDataModel: [],
            riskProfileModel: [],
            controlTestPlanModel: [],
            controlTestDataModel: []
        };
        
        $rootScope.app.Mask = true;
        
        /*$scope.createAssessment = function() {
        	console.log("Going to app.risk.assessment.gdpr.create");
            $state.go('app.risk.assessment.gdpr.create', $scope.VM);
        };*/
        
        $rootScope.app.Mask = false;

        $scope.submitAction = function () {
            if ($scope.Form.Rcsa.$invalid) return false;

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
                    RiskService.AddAssessment($scope.VM).then(function (res) {
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
                var controlModal = Utils.CreateSelectListView("Select Control Test Plan", data, headers, cols);
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
                var controlModal = Utils.CreateSelectListView("Select Control Test Data", data, headers, cols);
                controlModal.result.then(function (list) {
                    $scope.isEdit = true;
                    $scope.VM.controlTestDataModel = $scope.VM.controlTestDataModel.concat(list);
                    $rootScope.controlTestDataModel = $scope.VM.controlTestDataModel;
                });
            });
        };
    }
})();