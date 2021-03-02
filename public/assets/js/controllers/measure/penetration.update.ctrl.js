(function(){
    PenetrationFormController.$inject = ['$scope','$rootScope','$state', '$stateParams', 'MeasureService', 'Utils'];
    app.controller('PenetrationUpdateCtrl', PenetrationFormController);

    function PenetrationFormController ($scope, $rootScope, $state, $stateParams, MeasureService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Update Penetration Test";

        $scope.Form = {};

        $scope.submitAction = function(){
            $scope.IsSubmitted = true;
            if($scope.Form.PenTest.$invalid) return false;

            $scope.VM.modifiedOn = new Date();
            $scope.VM.modifiedBy = $rootScope.user.name;

            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.createdOn);
            var d2 = moment($scope.VM.modifiedOn);
            var d3 = moment($scope.VM.testDate);
            var d4 = moment($scope.VM.startDate);
            var d5 = moment($scope.VM.endDate);
            $scope.VM.createdOn = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.modifiedOn = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.testDate = (d3.isValid()) ? d3.format(dtype) : '';
            $scope.VM.startDate = (d4.isValid()) ? d4.format(dtype) : '';
            $scope.VM.endDate = (d5.isValid()) ? d5.format(dtype) : '';
            $scope.VM.createonDtStr = $scope.VM.createdOn;
            $scope.VM.modifiedonDtStr = $scope.VM.modifiedOn;
            $scope.VM.testDtStr = $scope.VM.testDate;
            $scope.VM.startDtStr = $scope.VM.startDate;
            $scope.VM.endDtStr = $scope.VM.endDate;

            var fileModel = $scope.VM.fileModel;
            var d = new Date();
            var idd = 'PenTest' + d.getTime();
            $scope.VM.key = idd;

            MeasureService.FileUploadPenTest(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                console.log("Inside submitAction() -- will call UpdatePenTest");
                MeasureService.UpdatePenTest($stateParams.id, $scope.VM).then(function (res) {
                    console.log('res',res);
                }).finally(function () {
                    $state.go('app.measure.pentest.main');
                });
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.PenTest.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.measure.pentest.main');
                });
                return false;
            }
            $state.go('app.measure.pentest.main');
        };

        $scope.removeItem = function (type, idx) {
            $scope.VM[type].splice(idx, 1);
        };

        $scope.addAssets = function () {
            var headers = ["Name", "Department", "Region", "Technology Owner", "Asset Classification", "Information Asset Type"],
                cols = ["assetName", "department", "region", "technologyOwner", "assetClassification", "informationAssetType"];

            $rootScope.app.Mask = true;
            DataInventoryService.GetAsset().then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                });
                var assetModal = Utils.CreateSelectListView("Select Assets", data, headers, cols);
                assetModal.result.then(function (list) {
                    $scope.isEdit = true;
                    $scope.VM.assets = $scope.VM.assets.concat(list);
                });
                $rootScope.app.Mask = false;
            });
        };

        MeasureService.GetOnePenTest($stateParams.id).then(function(data){
            $scope.VM = data;

            var dtype = 'MM-DD-YYYY';
            var d1 = moment($scope.VM.createdOn);
            var d2 = moment($scope.VM.modifiedOn);
            var d3 = moment($scope.VM.testDate);
            var d4 = moment($scope.VM.startDate);
            var d5 = moment($scope.VM.endDate);
            $scope.VM.createdOn = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.modifiedOn = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.testDate = (d3.isValid()) ? d3.format(dtype) : '';
            $scope.VM.startDate = (d4.isValid()) ? d4.format(dtype) : '';
            $scope.VM.endDate = (d5.isValid()) ? d5.format(dtype) : '';
            $scope.VM.createonDtStr = $scope.VM.createdOn;
            $scope.VM.modifiedonDtStr = $scope.VM.modifiedOn;
            $scope.VM.testDtStr = $scope.VM.testDate;
            $scope.VM.startDtStr = $scope.VM.startDate;
            $scope.VM.endDtStr = $scope.VM.endDate;

            $rootScope.app.Mask = false;
        });
    }
})();