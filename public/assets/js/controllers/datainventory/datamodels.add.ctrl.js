(function () {
	DataModelsAddController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$uibModal', '$filter', 'DataInventoryService', 'Utils'];
    app.controller('DataModelsAddCtrl', DataModelsAddController);

    function DataModelsAddController($scope, $rootScope, $state, $stateParams, $uibModal, $filter, DataInventoryService, Utils) {
    	$scope.mainTitle = $state.current.title;
    	$scope.mainDesc = "Add Data Model";

        $scope.Form = {};

        $scope.VM = {
            createdBy:  '',
            createdOn:  '',
            createonDtStr: '',
            description:    '',
            name:    '',
            fileModel:  [],
            modifiedBy: '',
            modifiedOn: '',
            modifiedonDtStr: ''
        };

        $scope.submitAction = function(){
            $scope.IsSubmitted = true;
            if($scope.Form.DataModel.$pristine || $scope.Form.DataModel.$invalid) return false;
            
            var dtype = 'YYYY-MM-DD';
            $scope.VM.modifiedOn = $scope.VM.createdOn;
            var d1 = moment($scope.VM.createdOn);
            var d2 = moment($scope.VM.modifiedOn);
            $scope.VM.createdOn = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.modifiedOn = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.createonDtStr = $scope.VM.createdOn;
            $scope.VM.modifiedonDtStr = $scope.VM.modifiedOn;

            var fileModel = $scope.VM.fileModel;
            var d = new Date();
            var idd = 'DataModel' + d.getTime();
            $scope.VM.key = idd;
            $scope.VM.modifiedBy = $scope.VM.createdBy;
            DataInventoryService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
            	DataInventoryService.PostDataModel($scope.VM).then(function (res) {
                    console.log('res',res);
                }).finally(function () {
                    $state.go('app.datainventory.datamodels.main');
                });
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.DataModel.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.datainventory.datamodels.main');
                });
                return false;
            }
            $state.go('app.datainventory.datamodels.main');
        };

        $rootScope.app.Mask = false;
    }
})();
