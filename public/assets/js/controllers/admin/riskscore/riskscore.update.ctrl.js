(function () {
    RiskScoreUpdateController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'RiskScoreService', 'Utils'];
    app.controller('RiskScoreUpdateCtrl', RiskScoreUpdateController);

    function RiskScoreUpdateController($scope, $rootScope, $state, $uibModal, $filter, RiskScoreService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Update Risk Score";
        var riskscoreId = $state.params.riskscoreId;

        $rootScope.app.Mask = false;
        RiskScoreService.GetOne(riskscoreId)
        .then(function (data) {
            vm.formdata = data;
        });

        vm.submitAction = function(){
            $rootScope.app.Mask = true;
            if(vm.RiskScoreForm.$invalid) return false;

           RiskScoreService.Put(riskscoreId, vm.formdata).then(function (res) {

            }).finally(function () {
                $state.go('app.admin.riskscore.main');
            });
        };

        vm.cancelAction = function () {
            if (vm.RiskScoreForm.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.admin.riskscore.main');
                });
                return false;
            }
            $state.go('app.admin.riskscore.main');
        };
    }
})();