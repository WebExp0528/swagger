(function () {
    "use strict";
    NYDFSAssessmentUpdateController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$filter', 'RiskService', 'ControlTestDataService', 'Utils'];
    app.controller('NYDFSAssessmentUpdateCtrl', NYDFSAssessmentUpdateController);
    function NYDFSAssessmentUpdateController($scope, $rootScope, $state, $stateParams, $filter, RiskService, ControlTestDataService, Utils) {

        $scope.mainTitle = $state.current.title || 'loading';
        $scope.mainDesc = "Update NYDFS Assessment";
        $scope.currPage = 'update';
        $scope.isEdit = false;

        $scope.isControlTestData = true;
        
        $scope.Form = {};
        
        $scope.OpList = [5, 10, 25, 50, 100];
        $scope.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'description',
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
                    RiskService.UpdateNYDFSAssessment($stateParams.id, $scope.VM).then(function (res) {
                    }).finally(function () {
                        $state.go('app.compliance.nydfs.main');
                    });
                });
        };

        $scope.cancelAction = function () {
            if ($scope.Form.Assessment.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.compliance.nydfs.main');
                });
                return false;
            }
            $state.go('app.compliance.nydfs.main');
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
        
        $scope.createAssessment = function(){
        	$rootScope.asId = $state.params.id;
            $state.go('app.compliance.nydfs.create', $scope.VM);
        };

        RiskService.GetNYDFSAssessmentById($stateParams.id).then(function (data) {
            $scope.VM = data;

            var dtype = 'MM-DD-YYYY';
            var d1 = moment($scope.VM.due_date);
            $scope.VM.due_date = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.dueDtStr = $scope.VM.due_date;
            var d2 = moment($scope.VM.approvedDate);
            $scope.VM.approvedDate = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.approvedDtStr = $scope.VM.approvedDate;
            
            $rootScope.controlDataModel = $scope.VM.controlDataModel;
            
            loadControlTestData($stateParams.id);

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
                var controlModal = Utils.CreateSelectListView("Select Control Test Data", data, headers, cols);
                controlModal.result.then(function (list) {
                    $scope.isEdit = true;
                    $scope.VM.controlTestPlanModel = $scope.VM.controlTestPlanModel.concat(list);
                    $rootScope.controlTestPlanModel = $scope.VM.controlTestPlanModel;
                });
                $rootScope.app.Mask = false;
            });
        };
        
        $scope.addControlTestData = function() {	
        	$state.go('app.compliance.nydfs.addcontroltestdata', {pid: $stateParams.id});
        }
        
        $scope.deleteControlTestData = function(r) {
        	var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
            	$rootScope.app.Mask = true;
                ControlTestDataService.Delete(r.id).then(function(data){
                    if(data.status===200) loadControlTestData($stateParams.id);
                });
            });
        }
        
        function loadControlTestData(id) {
        	ControlTestDataService.GetByRiskId(id).then(function (data) {
                $scope.Grid1.Total = data.length;
                $scope.Grid1.Data = data;
                $rootScope.app.Mask = false;
            });
        }

    }
})();
