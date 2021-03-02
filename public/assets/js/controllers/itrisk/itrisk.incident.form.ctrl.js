(function () {
    ITRiskIncFormController.$inject = ['$scope', '$rootScope', '$state', 'ITRiskService', 'OPRiskService', 'Utils'];
    app.controller('ITRiskIncFormCtrl', ITRiskIncFormController);

    function ITRiskIncFormController($scope, $rootScope, $state, ITRiskService, OPRiskService, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add IT Risk Incident";

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
            auditFileModel: [],
            controlDataModel: [],
            controlDescription: "",
            controlName: "",
            controlStatus: "",
            createdBy: "",
            createdOn: "",
            department: "",
            geoImpact: "",
            graphicalImpact: "",
            identifiedDate: "",
            impactedProcName: "",
            inherentRiskRating: "",
            issueOutstanding: "",
            modifiedBy: "",
            modifiedOn: "",
            operationalLoss: "",
            physicalHostnames: "",
            policiesData: [],
            processDescription: "",
            remeDate: "",
            remeOwner: "",
            remePlan: "",
            remeStatus: "",
            residualRisk: "",
            riskCategory: "",
            riskDesc: "",
            riskDirection: "",
            riskName: "",
            riskSeverity: "",
            riskStatus: "",
            serversDowntime: "",
            serversImpacted: "",
            virtualHostNames: ""
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
            OPRiskService.GetControlData().then(function (data) {
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
            /* if ($scope.Form.ITRisk.$invalid || $scope.Form.ITRisk.$pristine) return false; */
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
            var d1 = moment($scope.VM.identifiedDate);
            var d2 = moment($scope.VM.remeDate);
            $scope.VM.identifiedDate = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.remeDate = (d2.isValid()) ? d2.format(dtype) : '';
            var fileModel = $scope.VM.auditFileModel;
            var d = new Date();
            var idd = 'Pol' + d.getTime();
            $scope.VM.key = idd;
            ITRiskService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                ITRiskService.AddRim($scope.VM).then(function (res) {
                    // console.log('res',res);
                }).finally(function () {
                    $state.go('app.itrisk.incident.main');
                });
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.ITRisk.$dirty || $scope.isEdit){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.itrisk.incident.main');
                });
                return false;
            }
            $state.go('app.itrisk.incident.main');
        };

        ITRiskService.GetRimRiskCategory()
            .then(function (data) {
                Object.keys(data.categories).forEach(function (c) {
                    $scope.RiskCategories.List.push({Key: c, Label: data.categories[c], Selected: false});
                });
                $rootScope.app.Mask = false;
            });

        $rootScope.app.Mask = false;
    }
})();