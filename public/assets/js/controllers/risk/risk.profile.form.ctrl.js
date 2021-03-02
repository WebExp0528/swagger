(function () {
    RiskProfileFormController.$inject = ['$scope', '$rootScope', '$state', 'RiskService', 'OPRiskService', 'Utils'];
    app.controller('RiskProfileFormCtrl', RiskProfileFormController);

    function RiskProfileFormController($scope, $rootScope, $state, RiskService, OPRiskService, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add Risk Profile";

        $scope.isEdit = false;

        $scope.RiskCategories = {List: [], SelCount: 0};

        $scope.setOpt = function (op) {
            op.Selected = !op.Selected;
            if (op.Selected) {
                $scope.RiskCategories.SelCount++;
            } else {
                $scope.RiskCategories.SelCount--;
            }
        };

        $scope.VM = {
        		asTypeCode: "",
                riskprofileFileModel: [],
                everestLevel1: "",
                baselLevel1: "",
                baselLevel2: "",
                causalLevel1: "",
                causalLevel2: "",
                controlDataModel: [],
                controlTestDataModel: [],
                controlDescription: "",
                controlName: "",
                controlStatus: "",
                createdBy: "",
                createdOn: "",
                geographicImpact: "",
                identifiedDate: "",
                impactedProcName: "",
                inherentImpact: "",
                inherentRiskRating: "",
                inherentLikeliHood: "",
                issueOutstanding: "",
                legalEntTier1Impact: "",
                legalEntTier2Impact: "",
                modifiedBy: "",
                modifiedOn: "",
                operationalLoss: "",
                policiesData: [],
                potentialImpact: "",
                processDescription: "",
                processNameLevel1: "",
                processNameLevel2: "",
                riskName: "",
                riskStatus: "",
                remeDate: "",
                remeOwner: "",
                remePlan: "",
                remeStatus: "",
                reportFrequency: "",
                reportRecipients: "",
                residualRisk: "",
                riskAccepted: "",
                riskCategory: "",
                riskDescription: "",
                riskDirection: "",
                riskSeverity: "",
                monitoringType: "",
                monitorDescription: "",
                monitorDateAndValue: "",
                secondaryRiskImpact: "",
                department: ""
        };

        $scope.setAll = function (val) {
            $scope.RiskCategories.List.forEach(function (op) {
                op.Selected = val;
            });
            $scope.RiskCategories.SelCount = val ? $scope.RiskCategories.List.length : 0;
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
        
        $scope.addControlTestData = function () {
        	var headers = ["Description", "Control Type Level 1", "Control Type Level 2", "Design", "Performance", "Justification", "Accountability"],
            cols = ["description", "controlTypeLevel1", "controlTypeLevel2", "design", "performance", "justification", "accountability"];

            $rootScope.app.Mask = true;
            RiskService.GetControlTestData().then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                    c.modifiedOn = Utils.createDate(c.modifiedOn);
                });
                var controlModal = Utils.CreateSelectListView("Select Control Test Data", data, headers, cols);
                controlModal.result.then(function (list) {
                    $scope.isEdit = true;
                    $scope.VM.controlTestDataModel = $scope.VM.controlTestDataModel.concat(list);
                });
                $rootScope.app.Mask = false;
            });
        };

        $scope.addPolicyDocs = function () {
            var headers = ["Policy Name", "Description", "Owner", "Business Process"],
                cols = ["policyName", "policyDesc", "policyOwner", "businessProcess"];

            $rootScope.app.Mask = true;
            OPRiskService.GetPolicyDocs(10, 1).then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                });
                var polModal = Utils.CreateSelectListView("Select Policies and Procedures", data, headers, cols);
                polModal.result.then(function (list) {
                    $scope.isEdit = true;
                    $scope.VM.policiesData = $scope.VM.policiesData.concat(list);
                });
                $rootScope.app.Mask = false;
            });
        };

        $scope.removeItem = function (type, idx) {
            $scope.VM[type].splice(idx, 1);
        };


        $scope.submitAction = function () {
            if ($scope.Form.RiskProfile.$pristine || $scope.Form.RiskProfile.$invalid) return false;
            if($scope.RiskCategories.SelCount < 1){
                alert("Please select Risk Category.");
                return false;
            }

            $rootScope.app.Mask = true;

            angular.forEach($scope.RiskCategories.List, function(val, key){
                if(val.Selected == true){
                    $scope.VM.riskCategory = $scope.VM.riskCategory + val.Label + ",";
                }
            });

            $scope.VM.riskCategory = $scope.VM.riskCategory.substr(0, $scope.VM.riskCategory.length-1);

            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.identifiedDtStr);
            $scope.VM.identifiedDtStr = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.identifiedDate = $scope.VM.identifiedDtStr; 
            var d2 = moment($scope.VM.remeDate);
            $scope.VM.remediationDtStr = (d2.isValid()) ? d2.format(dtype) : ''; 
            $scope.VM.remeDate = $scope.VM.remediationDtStr;
            var fileModel = $scope.VM.riskprofileFileModel;
            var d = new Date();
            var idd = 'Risk' + d.getTime();
            $scope.VM.key = idd;
            RiskService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                RiskService.AddRiskProfile($scope.VM).then(function (res) {
                    // console.log('res',res);
                }).finally(function () {
                    $state.go('app.risk.profile.main');
                });
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.RiskProfile.$dirty || $scope.isEdit){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.risk.profile.main');
                });
                return false;
            }
            $state.go('app.risk.profile.main');
        };
        
        RiskService.GetRiskCategory()
        .then(function (data) {
            Object.keys(data.categories).forEach(function (c) {
                $scope.RiskCategories.List.push({Key: c, Label: data.categories[c], Selected: false});
            });
            $rootScope.app.Mask = false;
        });

    }
})();