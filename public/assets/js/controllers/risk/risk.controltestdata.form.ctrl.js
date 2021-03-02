(function () {
	RiskControlTestDataFormController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$uibModal', '$filter', 'ControlTestDataService', 'Utils'];
    app.controller('RiskControlTestDataFormCtrl', RiskControlTestDataFormController);

    function RiskControlTestDataFormController($scope, $rootScope, $state, $stateParams, $uibModal, $filter, ControlTestDataService, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add Risk Control Test Data";

        $scope.formdata = {
            description: '',
            controlTypeLevel1: '',
            controlTypeLevel2: '',
            design: '',
            performance: '',
            justification: '',
            accountability: '',
            riskId: $stateParams.pid
        };
        
        var riskId = $stateParams.pid;
        console.log("riskId: ", riskId);

        $rootScope.app.Mask = false;

        $scope.submitAction = function(){
            $rootScope.app.Mask = true;
            if($scope.ControlTestDataForm.$invalid) return false;

            ControlTestDataService.Post($scope.formdata).then(function (res) {

            }).finally(function () {
                $state.go('app.risk.profile.update', {id: riskId});
            });
        };

        $scope.cancelAction = function () {
        	console.log("Inside cancelAction(ControlTestData)")
            if ($scope.ControlTestDataForm.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                	console.log("id: ", $stateParams.pid)
                	$state.go('app.risk.profile.update', {id: riskId});
                });
                return false;
            }
            $state.go('app.risk.profile.update', {id: riskId});
        };
    }
})();
