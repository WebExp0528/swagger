(function () {

    "use strict";

    RiskProfileActionFormCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$window', 'RiskService', 'Utils'];
    app.controller('RiskProfileActionFormCtrl', RiskProfileActionFormCtrl);

    function RiskProfileActionFormCtrl($scope, $rootScope, $state, $stateParams, $window, RiskService, Utils) {

        $scope.mainTitle = $state.current.title || 'loading';
        $scope.mainDesc = "Add Action";
        $rootScope.app.Mask = true;

        $scope.VM = {
            actionStatus: "",
            actionfileModel: [],
            actionsDesc: "",
            actionsName: "",
            createdBy: "",
            createdOn: "",
            dueDate: "",
            modifiedBy: "",
            modifiedOn: "",
            riskId: $stateParams.pid,
            riskType: "",
            userName: ""
        };

        $scope.Form = {};

        $scope.dpOptions = {
            format: 'MM-DD-YYYY',
            autoclose: true
        };

        $scope.removeItem = function (type, idx) {
            $scope.VM[type].splice(idx, 1);
        };

        $scope.submitAction = function () {
            if ($scope.Form.RiskAction.$invalid || $scope.Form.RiskAction.pristine) return false;
            $rootScope.app.Mask = true;
            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.dueDate);
            $scope.VM.dueDate = (d1.isValid()) ? d1.format(dtype) : '';

            var fileModel = $scope.VM.actionfileModel;
            var d = new Date();
            var idd = 'Pol' + d.getTime();
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
                    RiskService.PostAction($scope.VM).then(function (res) {
                        if (res.status === 200)
                            $state.go('app.risk.profile.update', {id: $stateParams.pid});
                    }).finally(function () {
                        $state.go('app.risk.profile.update', {id: $stateParams.pid});
                    });
                });
        };

        $scope.cancelAction = function () {
            if ($scope.Form.RiskAction.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.risk.profile.update', {id: $stateParams.pid});
                });
                return false;
            }
            $state.go('app.risk.profile.update', {id: $stateParams.pid});
        };

        $rootScope.app.Mask = false;
    }
})();