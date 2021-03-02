(function () {
    PolicyApproverController.$inject = ['$scope', '$rootScope', '$state', '$stateParams','PolicyService', 'Utils'];
    app.controller('PolicyApproverCtrl', PolicyApproverController);

    function PolicyApproverController($scope, $rootScope, $state, $stateParams, PolicyService, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add Policy Approver";
        $scope.Form = {};
        $scope.VM = {
            createdBy:  $rootScope.user.name,
            createdOn:  new Date(),
            createonDtStr: '',
            approver:    '',
            name:    '',
            comment:  '',
            description: '',
            date: '',
            status: '',
            delegateTo: '',
            modifiedBy: $rootScope.user.name,
            modifiedOn: new Date(),
            modifiedonDtStr: '',
            key: '',
            version : 0
        };

        PolicyService.GetPolicy($stateParams.id).then(function(data) {
            $scope.VM.name = data.name;
        });

        $scope.submitAction = function(){
            $scope.IsSubmitted = true;
            if($scope.Form.PolicyApprover.$invalid) return false;

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
            PolicyService.AddPolicyApprover($scope.VM, $stateParams.id).then(function (res) {
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

        $rootScope.app.Mask = false;
    }
})();