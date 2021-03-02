(function () {
    AssessmentGenController.inject = ['$scope', '$rootScope', '$state', 'AssessmentService', 'Utils', '$filter', 'UniqueID'];
    app.controller('AssessmentGenCtrl', AssessmentGenController);
    function AssessmentGenController($scope, $rootScope, $state, AssessmentService, Utils, $filter, $location, UniqueID) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Assessment Generator";

        $scope.VM = {
            title: "",
            assessmentBy: "",
            approver: "",
            approvedDate: "",
            assessmentsDate: "",
            riskType: "",
            docType: "",
            period: "",
            controlDataModel: []
        };

        $scope.createAssessment = function() {
            $state.go('app.admin.assessment.create', $scope.VM);
        };
        
        $scope.removeItem = function (type, idx) {
            $scope.VM[type].splice(idx, 1);
        };
        
        $scope.addControls = function (riskType) {
            var headers = ["Control Category", "Control ID", "Control Name", "Control Source", "Business Procee", "Owner"],
                cols = ["controlCategory", "controlRefID", "controlName", "controlSource", "businessProcess", "controlOwner"];

            $rootScope.app.Mask = true;
            AssessmentService.GetCollectionFromControlDataByRiskType(riskType).then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                    c.modifiedOn = Utils.createDate(c.modifiedOn);
                });
                var controlModal = Utils.CreateSelectListView("Select Controls", data, headers, cols);
                controlModal.result.then(function (list) {
                    $scope.isEdit = true;
                    $scope.VM.controlDataModel = $scope.VM.controlDataModel.concat(list);
                    $rootScope.controlDataModel = $scope.VM.controlDataModel;
                });
                $rootScope.app.Mask = false;
            });
        };

        AssessmentService.GetRiskType().then(function (risktype) {
            $scope.riskTypeList = risktype;
            $rootScope.app.Mask = false;
        });
    }

})();

