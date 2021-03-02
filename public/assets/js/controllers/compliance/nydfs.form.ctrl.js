(function () {
    NYDFSAssessmentFormController.inject = ['$scope', '$rootScope', '$state', 'RiskService', 'Utils', '$filter', 'UniqueID'];
    app.controller('NYDFSAssessmentFormCtrl', NYDFSAssessmentFormController);
    function NYDFSAssessmentFormController($scope, $rootScope, $state, RiskService, Utils, $filter, UniqueID) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add NYDFS Assessment";
        $scope.currPage = 'insert';
        $scope.isEdit = false;

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
            asmntType: "AIR015",
            asmntTypeName: "NYDFS",
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
        	console.log("Going to app.compliance.nydfs.create");
            $state.go('app.compliance.nydfs.create', $scope.VM);
        };*/
        
        $rootScope.app.Mask = false;
        
        $scope.submitAction = function () {
            if ($scope.Form.Assessment.$invalid) return false;

            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.due_date);
            $scope.VM.due_date = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.dueDtStr = $scope.VM.due_date;
            var d2 = moment($scope.VM.approvedDate);
            $scope.VM.approvedDate = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.approvedDtStr = $scope.VM.approvedDate;

            var fileModel = $scope.VM.filemodel;
            var d = new Date();
            var idd = 'NYDFS' + d.getTime();
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
                    RiskService.AddNYDFSAssessment($scope.VM).then(function (res) {
                        console.log('res', res);
                    }).finally(function () {
                        $state.go('app.compliance.nydfs.main');
                    });
                });
        };
        
        $scope.removeItem = function (type, idx) {
            $scope.VM[type].splice(idx, 1);
        };
        
        $scope.cancelAction = function(){
            if($scope.Form.Assessment.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.compliance.nydfs.main');
                });
                return false;
            }
            $state.go('app.compliance.nydfs.main');
        };
        
        $scope.addControls = function () {
        	var headers = ["Control Category", "Control ID", "Control Name", "Control Source", "Business Process", "Owner"],
            cols = ["controlCategory", "controlRefID", "controlName", "controlSource", "businessProcess", "controlOwner"];

            $rootScope.app.Mask = true;
            RiskService.GetControlData().then(function (data) {
            	var iso27k = data.filter(function (el) {
            		return el.controlSource === 'NYDFS';
            	});
            	
                iso27k.forEach(function (c, i) {
                    c.Selected = false;
                    c.modifiedOn = Utils.createDate(c.modifiedOn);
                });
                var controlModal = Utils.CreateSelectListView("Select Controls", iso27k, headers, cols);
                controlModal.result.then(function (list) {
                    $scope.isEdit = true;
                    $scope.VM.controlDataModel = $scope.VM.controlDataModel.concat(list);
                    $rootScope.controlDataModel = $scope.VM.controlDataModel;
                });
                $rootScope.app.Mask = false;
            });
        };
        
        $scope.addRiskProfiles = function() {
        	var headers = ["Risk Description", "Category", "Inherent Risk", "Residual Risk", "Risk Direction", "Risk Accepted"],
            cols = ["riskDescription", "riskCategory", "inherentRiskRating", "residualRisk", "riskDirection", "riskAccepted"];

            $rootScope.app.Mask = true;
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
                $rootScope.app.Mask = false;
            });
        };
        
        $scope.addControlTestPlans = function () {
        	var headers = ["Test Plan", "Region", "Department", "Active", "Control Tested", "Control Method"],
            cols = ["testPlanName", "regionName", "deptName", "active", "controlTested", "controlMethod"];

            $rootScope.app.Mask = true;
            RiskService.GetControlTestPlan().then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                    c.modifiedOn = Utils.createDate(c.modifiedOn);
                });
                var controlModal = Utils.CreateSelectListView("Select Control Test Plans", data, headers, cols);
                controlModal.result.then(function (list) {
                    $scope.isEdit = true;
                    $scope.VM.controlTestPlanModel = $scope.VM.controlTestPlanModel.concat(list);
                    $rootScope.controlTestPlanModel = $scope.VM.controlTestPlanModel;
                });
                $rootScope.app.Mask = false;
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
