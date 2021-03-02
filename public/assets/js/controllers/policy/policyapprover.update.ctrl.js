(function(){
    PolicyApproverFormController.$inject = ['$scope','$rootScope','$state', '$stateParams', 'PolicyService', 'Utils'];
    app.controller('PolicyApproverUpdateCtrl', PolicyApproverFormController);

    function PolicyApproverFormController ($scope, $rootScope, $state, $stateParams, PolicyService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Update Policy Approver";

        $scope.Form = {};
        $scope.submitAction = function(){
            $scope.IsSubmitted = true;
            if($scope.Form.PolicyApprover.$invalid) return false;

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

            var d = new Date();
            var idd = 'PolDocs' + d.getTime();
            $scope.VM.key = idd;


            PolicyService.UpdatePolicyApprover($stateParams.approverId, $scope.VM).then(function(res) {
                console.log('res',res);
            }).finally(function () {
                $state.go('app.polproc.policy.update', {id: $stateParams.id});
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.PolicyApprover.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.polproc.policy.update', {id: $stateParams.id});
                });
                return false;
            }
            $state.go('app.polproc.policy.update', {id: $stateParams.id});
        };
        PolicyService.GetPolicyApprover($stateParams.approverId).then(function(data){
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

            $rootScope.app.Mask = false;
        });
    }
})();