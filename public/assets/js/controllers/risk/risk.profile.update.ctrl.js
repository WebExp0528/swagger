(function () {

    "use strict";

    RiskProfileUpdateController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$filter', 'RiskService', 'OPRiskService', 'ControlTestDataService', 'Utils'];
    app.controller('RiskProfileUpdateCtrl', RiskProfileUpdateController);


    function RiskProfileUpdateController($scope, $rootScope, $state, $stateParams, $filter, RiskService, OPRiskService, ControlTestDataService, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Update Risk Profile";
        $scope.isAction = true;
        $scope.isEdit = false;

        $scope.RiskCategories = { List: [], SelCount: 0 };
        $scope.Lookups = {};

        $scope.setOpt = function(op){
            op.Selected = !op.Selected;
            if(op.Selected){
                $scope.RiskCategories.SelCount++;
            } else {
                $scope.RiskCategories.SelCount--;
            }
        };

        $scope.setAll = function(val) {
            $scope.RiskCategories.List.forEach(function(op){
                op.Selected = val;
            });
            $scope.RiskCategories.SelCount = val? $scope.RiskCategories.List.length : 0;
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

        $scope.cancelAction = function () {
            if ($scope.Form.RiskProfile.$dirty || $scope.isEdit) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.risk.profile.main');
                });
                return false;
            }
            $state.go('app.risk.profile.main');
        };

        $scope.submitAction = function () {
            if ($scope.Form.RiskProfile.$invalid || $scope.Form.RiskProfile.pristine) return false;
            if ($scope.RiskCategories.SelCount < 1) {
                alert("Please select Risk Category.");
                return false;
            }
            //console.log($scope.RiskCategories);
            var selectedCategories = $filter('filter')($scope.RiskCategories.List, {Selected: true});
            var categoriesStr = '';
            for(var i in selectedCategories){
                categoriesStr = categoriesStr + selectedCategories[i].Label + ",";
            }
            categoriesStr = categoriesStr.substr(0, categoriesStr.length -1);
            $scope.VM.riskCategory = categoriesStr;

            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.identifiedDate);
            var d2 = moment($scope.VM.remeDate);
            $scope.VM.identifiedDate = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.identifiedDtStr = $scope.VM.identifiedDate;
            $scope.VM.remeDate = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.remediationDtStr = $scope.VM.remeDate;

            var fileModel = $scope.VM.riskprofileFileModel;
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
                    RiskService.UpdateRiskProfile($stateParams.id, $scope.VM).then(function (res) {
                        console.log('res', res);
                    }).finally(function () {
                        $state.go('app.risk.profile.main');
                    });
                });
        };

        /*$scope.addControlTestData = function() { 	
        	$state.go('app.risk.profile.addcontroltestdata', {pid: $stateParams.id});
        }*/

        $scope.addAction = function () {
            $state.go('app.risk.profile.addaction', {pid: $stateParams.id});
        };

        $scope.OpList = [5, 10, 25, 50, 100];
        $scope.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'actionsName',
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
        
        $scope.Grid2 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'description',
            IsAsc: true,
            Filter: "",
            Total: 0,
            Data: [],
            SortMe: function(col){
                if($scope.Grid2.Column === col)
                    $scope.Grid2.IsAsc = !$scope.Grid2.IsAsc;
                else
                    $scope.Grid2.Column = col;
            },
            GetIco: function(col){
                if($scope.Grid2.Column === col){
                    return $scope.Grid2.IsAsc? 'fa-sort-up' : 'fa-sort-down';
                } else {
                    return 'fa-unsorted';
                }
            }
        };
        
        $scope.$watch('Grid1.Filter', function(n, o){
            var searchedData = $filter('filter')($scope.Grid1.Data, $scope.Grid1.Filter);
            $scope.Grid1.Total = searchedData.length;
        });
        $scope.$watch('Grid2.Filter', function(n, o){
            var searchedData = $filter('filter')($scope.Grid2.Data, $scope.Grid2.Filter);
            $scope.Grid2.Total = searchedData.length;
        });
        $scope.deleteAction = function(r){
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                $rootScope.app.Mask = true;
                RiskService.DeleteAction(r.id).then(function(data){
                    if(data.status===200) loadActions($stateParams.id);
                });
            });
        };
        
        $scope.deleteControlTestData = function(r) {
        	var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
            	$rootScope.app.Mask = true;
                ControlTestDataService.Delete(r.id).then(function(data){
                    if(data.status===200) loadControlTestData($stateParams.id);
                });
            });
        }

        RiskService.GetRiskProfileById($stateParams.id).then(function (data) {
            //console.log(data);
            $scope.VM = data;
            var dtype = 'MM-DD-YYYY';
            var d1 = moment($scope.VM.identifiedDate);
            var d2 = moment($scope.VM.remeDate);
            $scope.VM.identifiedDate = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.identifiedDtStr = $scope.VM.identifiedDate;
            $scope.VM.remeDate = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.remediationDtStr = $scope.VM.remeDate;

            return RiskService.GetRiskCategory()
        }).then(function (data) {
            var categories = $scope.VM.riskCategory.split(',');
            $scope.RiskCategories.SelCount = categories.length;
            angular.forEach(data.categories, function(val, key){
                var sel = false;
                for(var i in categories){
                    if(categories[i] == val){
                        sel = true;
                    }
                }
                $scope.RiskCategories.List.push({Key: key, Label: data.categories[key], Selected: sel});
            });

            loadActions($stateParams.id);
            loadControlTestData($stateParams.id);
        })

        function loadActions(id) {
            RiskService.GetActionsByRiskId(id).then(function (data) {
                $scope.Grid1.Total = data.length;
                $scope.Grid1.Data = data;
                $rootScope.app.Mask = false;
            });
        }
        
        function loadControlTestData(id) {
        	ControlTestDataService.GetByRiskId(id).then(function (data) {
                $scope.Grid2.Total = data.length;
                $scope.Grid2.Data = data;
                $rootScope.app.Mask = false;
            });
        }
    }
})();
