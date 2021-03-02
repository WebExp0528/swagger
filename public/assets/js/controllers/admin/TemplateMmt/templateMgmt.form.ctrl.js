(function(){
    TempMgmtFormController.$inject = ['$scope', '$rootScope', '$state', 'Utils', 'TmpmgmtService'];
    app.controller('tmpUpldsFormCtrl', TempMgmtFormController);
    function TempMgmtFormController($scope, $rootScope, $state, Utils, TmpmgmtService){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Template Detail";

        $scope.Form = {};

        $scope.VM = {
            assessmentType: [{  asTypeCode: '', asTypeDesc: '' }],
            createdBy: '',
            createdOn: '',
            templateDesc: '',
            templateName: '',
            modifiedBy: '',
            modifiedOn: '',
            key: '',
            fileModel: []
        };

        $scope.submitAction = function(){
            $scope.IsSubmitted = true;
            if($scope.Form.TemplateUpload.$pristine || $scope.Form.TemplateUpload.$invalid) return false;

            var fileModel = $scope.VM.fileModel;
            var d = new Date();
            var idd = 'tmpup' + d.getTime();
            $scope.VM.key = idd;
            console.log(fileModel);
            console.log($scope.VM);
            TmpmgmtService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    alert('success');
                    console.log(res);
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                TmpmgmtService.AddTemplate($scope.VM).then(function (res) {
                	console.log('res',res);
                }).finally(function () {
                	$state.go('app.admin.tmpUplds.main');
                });
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.TemplateUpload.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.admin.tmpUplds.main');
                });
                return false;
            }
            $state.go('app.admin.tmpUplds.main');
        };

        $rootScope.app.Mask = false;
    }
})();