(function () {
	DataMappingUpdateController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$uibModal', '$filter', 'DataInventoryService', 'Utils'];
    app.controller('DataMappingUpdateCtrl', DataMappingUpdateController);

    function DataMappingUpdateController($scope, $rootScope, $state, $stateParams, $uibModal, $filter, DataInventoryService, Utils) {
    	$scope.mainTitle = $state.current.title;
    	$scope.mainDesc = "Update Data Mapping";

        $scope.Form = {};

        $scope.submitAction = function(){
            $scope.IsSubmitted = true;
            if($scope.Form.DataMapping.$pristine) return false;
            
            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.createdOn);
            var d2 = moment($scope.VM.modifiedOn);
            $scope.VM.createdOn = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.modifiedOn = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.createonDtStr = $scope.VM.createdOn;
            $scope.VM.modifiedonDtStr = $scope.VM.modifiedOn;

            var fileModel = $scope.VM.fileModel;
            var d = new Date();
            var idd = 'DataMapping' + d.getTime();
            console.log(idd);
            $scope.VM.key = idd;
            DataInventoryService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                DataInventoryService.PutDataMapping($stateParams.id, $scope.VM).then(function (res) {
                    console.log('res',res);
                }).finally(function () {
                    $state.go('app.datainventory.datamapping.main');
                });
            });
        };

        $scope.download = function(fileId, fileName){
            DataInventoryService.FileDownload(fileId, fileName).then(function (res) {
                var url = URL.createObjectURL(new Blob([res]));
                var a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.target = '_blank';
                a.click();
            })
        };

        $scope.cancelAction = function(){
            if($scope.Form.DataMapping.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.datainventory.datamapping.main');
                });
                return false;
            }
            $state.go('app.datainventory.datamapping.main');
        };

        DataInventoryService.GetOneDataMapping($stateParams.id).then(function(data){
            $scope.VM = data;

            var dtype = 'MM-DD-YYYY';
            var d1 = moment($scope.VM.createdOn);
            var d2 = moment($scope.VM.modifiedOn);
            $scope.VM.createdOn = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.modifiedOn = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.createonDtStr = $scope.VM.createdOn;
            $scope.VM.modifiedonDtStr = $scope.VM.modifiedOn;
            
            $rootScope.app.Mask = false;
        });
    }
})();