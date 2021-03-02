(function () {
	NYDFSControlTestDataUpdateController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$uibModal', '$filter', 'ControlTestDataService', 'Utils'];
    app.controller('NYDFSControlTestDataUpdateCtrl', NYDFSControlTestDataUpdateController);

    function NYDFSControlTestDataUpdateController($scope, $rootScope, $state, $stateParams, $uibModal, $filter, ControlTestDataService, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Update NYDFS Control Test Data";
        var controlTestDataId = $state.params.controlTestDataId;
        console.log("$state.params.controlTestDataId:", $state.params.controlTestDataId);
        console.log("$state.params.id:", $state.params.id);

        $scope.tmp_deptId = '';
        $scope.tmp_roleId = '';

        $rootScope.app.Mask = false;
        ControlTestDataService.GetOne(controlTestDataId).then(function (data) {
            $scope.formdata = data;
        });

        $scope.submitAction = function(){
            $rootScope.app.Mask = true;
            if($scope.ControlTestDataForm.$invalid) return false;
            	ControlTestDataService.Put(controlTestDataId, $scope.formdata).then(function (res) {
            }).finally(function () {
            	$state.go('app.compliance.nydfs.update', {id: $scope.formdata.riskId});
            });
        };

        $scope.cancelAction = function () {
            if ($scope.ControlTestDataForm.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                	$state.go('app.compliance.nydfs.update', {id: $scope.formdata.riskId});
                });
                return false;
            }
            $state.go('app.compliance.nydfs.update', {id: $scope.formdata.riskId});
        };
    }
})();
