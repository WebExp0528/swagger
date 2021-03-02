(function () {

    "use strict";

    SOXPRAFormController.$inject = ['$scope', '$rootScope', '$state', 'ComplianceService', 'Utils'];
    app.controller('SOXPRAFormCtrl', SOXPRAFormController);


    function SOXPRAFormController($scope, $rootScope, $state, ComplianceService, Utils) {

        $scope.mainTitle = $state.current.title || 'loading';
        $scope.mainDesc = "Add SOX Process Risk Analysis";

        $scope.Form = {};

        $scope.VM = {
        	controlDataModel: [],
            actualName: "",
            approval: "",
            asmntType: "ACM013",
            asmntTypeName: "SOXPRA",
            asmntType_name: "",
            assessDesc: "",
            assessId: 0,
            assessName: "",
            business: "",
            createdBy: "",
            createdOn: "",
            due_date: moment().format("MM-DD-YYYY"),
            filemodel: [],
            filename: "",
            frequency: "",
            modifiedBy: "",
            modifiedOn: "",
            period: "",
            priority: "",
            region: "",
            resPerson: ""
        };

        $scope.submitAction = function () {
            if ($scope.Form.SoxPra.$invalid) return false;

            $scope.VM.assessId = moment().format('X');

            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.due_date);
            $scope.VM.due_date = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.dueDtStr = $scope.VM.due_date;

            var fileModel = $scope.VM.filemodel;
            var d = new Date();
            var idd = 'Pol' + d.getTime();
            $scope.VM.key = idd;
            ComplianceService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                ComplianceService.PostSOXPRAAssessment($scope.VM).then(function (res) {
                    console.log('res',res);
                }).finally(function () {
                    $state.go('app.compliance.soxpra.main');
                });
            });
        };
        
        $scope.cancelAction = function(){
            if($scope.Form.SoxPra.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.compliance.soxpra.main');
                });
                return false;
            }
            $state.go('app.compliance.soxpra.main');
        };
        
        $scope.removeItem = function (type, idx) {
            $scope.VM[type].splice(idx, 1);
        };
        
        $scope.addControls = function () {
            var headers = ["Control Category", "Control ID", "Control Name", "Control Source", "Business Process", "Owner"],
                cols = ["controlCategory", "controlRefID", "controlName", "controlSource", "businessProcess", "controlOwner"];

            $rootScope.app.Mask = true;
            ComplianceService.GetControlData().then(function (data) {
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

        $scope.setOpt = function (op) {
            op.Selected = !op.Selected;
            if (op.Selected) {
                $scope.RiskCategories.SelCount++;
            } else {
                $scope.RiskCategories.SelCount--;
            }

            console.log($scope.RiskCategories.SelCount);
        };

        $rootScope.app.Mask = false;
    }
})();