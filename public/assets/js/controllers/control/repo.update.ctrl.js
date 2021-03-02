(function(){
    RepoUpdateController.$inject = ['$scope','$rootScope','$state', '$stateParams', 'ControlService', 'Utils'];
    app.controller('RepoUpdateCtrl', RepoUpdateController);

    function RepoUpdateController ($scope, $rootScope, $state, $stateParams, ControlService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Update Control Data";
        $scope.Form = {};

        $scope.submitAction = function(){
            if($scope.Form.CtrlRepo.$invalid) return false;

            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.controlEffectiveStartdate);
            var d2 = moment($scope.VM.controlEffectiveEnddate);
            $scope.VM.controlEffectiveStartdate = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.controlEffectiveEnddate = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.controlEffectiveStartdateStr = $scope.VM.controlEffectiveStartdate;
            $scope.VM.controlEffectiveEnddateStr = $scope.VM.controlEffectiveEnddate;

            var fileModel = $scope.VM.controldataFileModel;
            var d = new Date();
            var idd = 'Pol' + d.getTime();
            $scope.VM.key = idd;
            ControlService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                ControlService.UpdateRepo($stateParams.id, $scope.VM).then(function(res){
                    console.log('res',res);
                }).finally(function () {
                    $state.go('app.control.repo.main');
                });
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.CtrlRepo.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(re){
                    $state.go('app.control.repo.main');
                });
                return false;
            }
            $state.go('app.control.repo.main');
        };

        ControlService.GetRepo($stateParams.id).then(function (data) {
            $scope.VM = data;

            var dtype = 'MM-DD-YYYY';
            var d1 = moment($scope.VM.controlEffectiveStartdate);
            var d2 = moment($scope.VM.controlEffectiveEnddate);
            $scope.VM.controlEffectiveStartdate = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.controlEffectiveEnddate = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.controlEffectiveStartdateStr = $scope.VM.controlEffectiveStartdate;
            $scope.VM.controlEffectiveEnddateStr = $scope.VM.controlEffectiveEnddate;
            
            if ($scope.VM.isEditable === 'true') {
            	$scope.VM.controlDefinition = 'User Defined';
            } else if ($scope.VM.isEditable === 'false') {
            	$scope.VM.controlDefinition = 'System Defined';
            } else {
            	$scope.VM.controlDefinition = 'Not set';
            }

            $rootScope.app.Mask = false;
        });
    }

})();