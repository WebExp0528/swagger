(function(){
    PolicyFormController.$inject = ['$scope','$rootScope','$state', '$stateParams', 'PolicyService', 'Utils'];
    app.controller('PolicyUpdateCtrl', PolicyFormController);

    function PolicyFormController ($scope, $rootScope, $state, $stateParams, PolicyService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Update Policy Document";
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
        
        /*$scope.$watch('Grid2.Filter', function(n, o){
            var searchedData = $filter('filter')($scope.Grid2.Data, $scope.Grid2.Filter);
            $scope.Grid2.Total = searchedData.length;
        });*/

        $scope.submitAction = function(){
            $scope.IsSubmitted = true;
            if($scope.Form.Policy.$invalid) return false;

            $scope.VM.modifiedOn = new Date();
            $scope.VM.modifiedBy = $rootScope.user.name;

            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.createdOn);
            var d2 = moment($scope.VM.modifiedOn);
            $scope.VM.createdOn = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.modifiedOn = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.createonDtStr = $scope.VM.createdOn;
            $scope.VM.modifiedonDtStr = $scope.VM.modifiedOn;

            var fileModel = $scope.VM.fileModel;
            var d = new Date();
            var idd = 'Pol' + d.getTime();
            $scope.VM.key = idd;

            PolicyService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                PolicyService.UpdatePolicy($stateParams.id, $scope.VM).then(function(res) {
                    console.log('res',res);
                }).finally(function () {
                    $state.go('app.polproc.policy.main');
                });
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.Policy.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.polproc.policy.main');
                });
                return false;
            }
            $state.go('app.polproc.policy.main');
        };

      loadPolicyDetails();

        $scope.addPolicyDocs = function () {
            var headers = ["Policy Name", "Description", "Owner", "Business Process"],
                cols = ["policyName", "policyDesc", "policyOwner", "businessProcess"];

            $rootScope.app.Mask = true;
            PolicyService.GetPolicyDocs(10, 1).then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                });
                var polModal = Utils.CreateSelectListView("Select Policies and Procedures", data, headers, cols);
                polModal.result.then(function (list) {
                    $scope.isEdit = true;
                    $scope.VM.policyDocs = $scope.VM.policyDocs.concat(list);
                });
                $rootScope.app.Mask = false;
            });
        };

        function loadPolicyDetails(){
            PolicyService.GetPolicy($stateParams.id).then(function(data){
                $scope.VM = data;
    
                var dtype = 'MM-DD-YYYY';
                var d1 = moment($scope.VM.createdOn);
                var d2 = moment($scope.VM.modifiedOn);
                $scope.VM.createdOn = (d1.isValid()) ? d1.format(dtype) : '';
                $scope.VM.modifiedOn = (d2.isValid()) ? d2.format(dtype) : '';
                $scope.VM.createonDtStr = $scope.VM.createdOn;
                $scope.VM.modifiedonDtStr = $scope.VM.modifiedOn;
                $scope.Grid2.Total = data.policyApprovers == null ? 0 : data.policyApprovers.length;
                $scope.Grid2.Data = data.policyApprovers;
    
                $rootScope.app.Mask = false;
            });
        }

        $scope.deleteApprover = function(approver) {
            PolicyService.DeletePolicyApprover($stateParams.id, approver.id).then(function(result){
                loadPolicyDetails();
            })
        };
    }
})();