(function(){
    PolicyDocsFormController.$inject = ['$scope','$rootScope','$state', '$stateParams', 'PolicyService', 'Utils'];
    app.controller('PolicyDocsUpdateCtrl', PolicyDocsFormController);

    function PolicyDocsFormController ($scope, $rootScope, $state, $stateParams, PolicyService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Update Policy and Procedure";

        $scope.Form = {};

        $scope.Grid2 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'name',
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
                if($scope.GrGrid2id1.Column === col){
                    return $scope.Grid2.IsAsc? 'fa-sort-up' : 'fa-sort-down';
                } else {
                    return 'fa-unsorted';
                }
            }
        };

        $scope.submitAction = function(){
            $scope.IsSubmitted = true;
            if($scope.Form.PolicyDocs.$invalid) return false;

            $scope.VM.modifiedOn = new Date();
            $scope.VM.modifiedBy = $rootScope.user.name;

            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.effectiveDate);
            var d2 = moment($scope.VM.createdOn);
            var d3 = moment($scope.VM.modifiedOn);
            $scope.VM.effectiveDate = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.createdOn = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.modifiedOn = (d3.isValid()) ? d3.format(dtype) : '';
            $scope.VM.effectiveDtStr = $scope.VM.effectiveDate;
            $scope.VM.createonDtStr = $scope.VM.createdOn;
            $scope.VM.modifiedonDtStr = $scope.VM.modifiedOn;
            
            var fileModel = $scope.VM.fileModel;
            var d = new Date();
            var idd = 'PolDocs' + d.getTime();
            $scope.VM.key = idd;

            PolicyService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                PolicyService.UpdatePolicyDoc($stateParams.id, $scope.VM).then(function(res) {
                    console.log('Policy Save Response: ',res);
                }).finally(function () {
                    $state.go('app.polproc.policydocs.main');
                });
            });
        };

        $scope.saveVersion = function() {
            $rootScope.app.Mask = true;

            $scope.VM.parentPolicyId = $scope.VM.id;

            $scope.VM.modifiedOn = new Date();
            $scope.VM.modifiedBy = $rootScope.user.name;

            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.effectiveDate);
            var d2 = moment($scope.VM.createdOn);
            var d3 = moment($scope.VM.modifiedOn);
            $scope.VM.effectiveDate = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.createdOn = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.modifiedOn = (d3.isValid()) ? d3.format(dtype) : '';
            $scope.VM.effectiveDtStr = $scope.VM.effectiveDate;
            $scope.VM.createonDtStr = $scope.VM.createdOn;
            $scope.VM.modifiedonDtStr = $scope.VM.modifiedOn;

            var fileModel = $scope.VM.fileModel;
            var d = new Date();
            var idd = 'PolDocs' + d.getTime();
            $scope.VM.key = idd;

            PolicyService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                console.log("Parent ID: " + $scope.VM.parentPolicyId)
                PolicyService.SaveVersion($scope.VM).then(function(res) {
                    console.log('Version Save Response: ',res);
                    $scope.VM.version++;
                    return PolicyService.UpdatePolicyDoc($scope.VM.id, $scope.VM);
                }).then(function(res) {
                    console.log('Policy Save Response: ',res);
                }).finally(function () {
                    $state.reload();
                });
            });
        }

        $scope.versionSelectionChanged = function() {
            console.log("Version change", $scope.VM.version);
            var newData = null;
            $scope.history.forEach(function(entry) {
                if (entry.version === $scope.VM.version) {
                    newData = JSON.parse(JSON.stringify(entry));
                }
            });
            if (newData != null && newData.id != null) {
                $rootScope.app.Mask = true;
                $scope.VM = newData;

                var dtype = 'MM-DD-YYYY';
                var d1 = moment($scope.VM.effectiveDate);
                var d2 = moment($scope.VM.createdOn);
                var d3 = moment($scope.VM.modifiedOn);
                $scope.VM.effectiveDate = (d1.isValid()) ? d1.format(dtype) : '';
                $scope.VM.createdOn = (d2.isValid()) ? d2.format(dtype) : '';
                $scope.VM.modifiedOn = (d3.isValid()) ? d3.format(dtype) : '';
                $scope.VM.effectiveDtStr = $scope.VM.effectiveDate;
                $scope.VM.createonDtStr = $scope.VM.createdOn;
                $scope.VM.modifiedonDtStr = $scope.VM.modifiedOn;

                $scope.Grid2.Total = $scope.VM.policyApprovers == null ? 0 : $scope.VM.policyApprovers.length;
                $scope.Grid2.Data = $scope.VM.policyApprovers;
                
                $rootScope.app.Mask = false;
            } else {
                $state.reload();
            }
            
        }

        $scope.cancelAction = function(){
            if($scope.Form.PolicyDocs.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.polproc.policydocs.main');
                });
                return false;
            }
            $state.go('app.polproc.policydocs.main');
        };

        loadPolicyDocDetails();
        
        $scope.removeItem = function (type, idx) {
            $scope.VM[type].splice(idx, 1);
        };

        function loadPolicyDocDetails(){
            PolicyService.GetPolicyDoc($stateParams.id).then(function(data){
                data.version = data.version != null ? data.version : 1;
                $scope.VM = data;
    
                var dtype = 'MM-DD-YYYY';
                var d1 = moment($scope.VM.effectiveDate);
                var d2 = moment($scope.VM.createdOn);
                var d3 = moment($scope.VM.modifiedOn);
                $scope.VM.effectiveDate = (d1.isValid()) ? d1.format(dtype) : '';
                $scope.VM.createdOn = (d2.isValid()) ? d2.format(dtype) : '';
                $scope.VM.modifiedOn = (d3.isValid()) ? d3.format(dtype) : '';
                $scope.VM.effectiveDtStr = $scope.VM.effectiveDate;
                $scope.VM.createonDtStr = $scope.VM.createdOn;
                $scope.VM.modifiedonDtStr = $scope.VM.modifiedOn;

                $scope.Grid2.Total = data.policyApprovers == null ? 0 : data.policyApprovers.length;
                $scope.Grid2.Data = data.policyApprovers;
                
                return PolicyService.GetAllVersions($stateParams.id);
            }).then(function(histData){
                $scope.history = [{'version':  $scope.VM.version}].concat(histData);
                console.log("History: ", histData)
                $rootScope.app.Mask = false;
            });
        }

        $scope.deleteApprover = function(approver) {
            PolicyService.DeletePolicyApprover($stateParams.id, approver.id).then(function(result){
                loadPolicyDocDetails();
            })
        };

       
    }
})();