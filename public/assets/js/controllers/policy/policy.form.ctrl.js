(function () {
    PolicyFormController.$inject = ['$scope', '$rootScope', '$state', 'PolicyService', 'Utils'];
    app.controller('PolicyFormCtrl', PolicyFormController);

    function PolicyFormController($scope, $rootScope, $state, PolicyService, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add Policy Document";
        $scope.Form = {};
        $scope.VM = {
            assessmentType: [{  asTypeCode: '', asTypeDesc: '' }],
            createdBy:  '',
            createdOn:  '',
            createonDtStr: '',
            docDesc:    '',
            docName:    '',
            fileModel:  [],
            key: '',
            modifiedBy: '',
            modifiedOn: '',
            modifiedonDtStr: '',
            policyDocs: []
        };

        $scope.submitAction = function(){
            $scope.IsSubmitted = true;
            if($scope.Form.Policy.$invalid) return false;

            $scope.VM.createdBy = $rootScope.user.name;
            $scope.VM.modifiedOn = $scope.VM.createdOn;
            $scope.VM.modifiedBy = $scope.VM.createdBy;

            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.createdOn);
            var d2 = moment($scope.VM.modifiedOn);
            $scope.VM.createdOn = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.modifiedOn = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.createonDtStr = $scope.VM.createdOn;
            $scope.VM.modifiedonDtStr = $scope.VM.modifiedOn;

            var fileModel = $scope.VM.fileModel;
            var d = new Date();
            var idd = 'Pol' + d.getTime();
            $scope.VM.key = idd;

            PolicyService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                PolicyService.AddPolicy($scope.VM).then(function (res) {
                    console.log('res',res);
                }).finally(function () {
                    $state.go('app.polproc.policy.main');
                });
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.Policy.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.polproc.policy.main');
                });
                return false;
            }
            $state.go('app.polproc.policy.main');
        };

        $scope.addPolicyDocs = function () {
            var headers = ["Policy Name", "Description", "Owner", "Business Process"],
                cols = ["policyName", "policyDesc", "policyOwner", "businessProcess"];

            $rootScope.app.Mask = true;
            PolicyService.GetPolicyDocs(10, 1).then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                });
                var polModal = Utils.CreateSelectListView("Select Policies and Procedures", data, headers, cols);
                polModal.result.then(function (list) {
                    $scope.isEdit = true;
                    if ($scope.VM.policyDocs == null) {
                        $scope.VM.policyDocs = [];
                    }
                    $scope.VM.policyDocs = $scope.VM.policyDocs.concat(list);
                });
                $rootScope.app.Mask = false;
            });
        };

        $scope.removeItem = function (type, idx) {
            console.log("Removing Item");
            $scope.VM[type].splice(idx, 1);
        };

        $rootScope.app.Mask = false;
    }
})();