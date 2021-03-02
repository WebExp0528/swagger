(function () {
    PolicyDocsFormController.$inject = ['$scope', '$rootScope', '$state', 'PolicyService', 'Utils'];
    app.controller('PolicyDocsFormCtrl', PolicyDocsFormController);

    function PolicyDocsFormController($scope, $rootScope, $state, PolicyService, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add Policy and Procedure";

        $scope.Form = {};

        $scope.VM = {
            source: '',
            createdBy:  $rootScope.user.name,
            createdOn:  new Date(),
            createonDtStr: '',
            policyDesc:    '',
            policyName:    '',
            fileModel:  [],
            modifiedBy: $rootScope.user.name,
            modifiedOn: new Date(),
            modifiedonDtStr: '',
            policyOwner: '',
            businessProcess: '',
            effectiveDate: moment(new Date()).format("MM-DD-YYYY"),
            effectiveDtStr: '',
            key: '',
            version : 1
        };

        $scope.history = [ {"version": 1}]

        $scope.submitAction = function(){
            $scope.IsSubmitted = true;
            if($scope.Form.PolicyDocs.$invalid) return false;

            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.effectiveDate);
            var d2 = moment($scope.VM.createdOn);
            var d3 = moment($scope.VM.modifiedOn);
            $scope.VM.effectiveDate = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.createdOn = (d2.isValid()) ? d2.format(dtype) : '';
            $scope.VM.modifiedOn = (d3.isValid()) ? d3.format(dtype) : '';
            $scope.VM.effectiveDtStr = $scope.VM.effectiveDate;
            $scope.VM.createonDtStr = $scope.VM.createdOn;
            $scope.VM.modifiedonDtStr = $scope.VM.modifiedOn;
            $scope.VM.policyApprovers = [];
            $scope.VM.version = 1;

            var fileModel = $scope.VM.fileModel;
            var d = new Date();
            var idd = 'PolDocs' + d.getTime();
            $scope.VM.key = idd;

            PolicyService.FileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                PolicyService.AddPolicyDoc($scope.VM).then(function (res) {
                    console.log('res',res);
                }).finally(function () {
                    $state.go('app.polproc.policydocs.main');
                });
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.PolicyDocs.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.polproc.policydocs.main');
                });
                return false;
            }
            $state.go('app.polproc.policydocs.main');
        };

        $scope.addPolicyApprover = function () {
            var headers = ["First Name", "Last Name", "Email", "Description"],
                cols = ["firstName", "lastName", "email", "description"];
            $rootScope.app.Mask = true;
            PolicyService.GetAllPolicyApprovers(10, 1).then(function (data) {
                data.forEach(function (c, i) {
                    c.Selected = false;
                });
                var polModal = Utils.CreateSelectListView("Select Policy Approvers", data, headers, cols);
                polModal.result.then(function (list) {
                    $scope.isEdit = true;
                    if(!$scope.VM.policyApprovers){
                        $scope.VM.policyApprovers = [];
                    }
                    $scope.VM.policyApprovers = $scope.VM.policyApprovers.concat(list);
                });
                $rootScope.app.Mask = false;
            });
        };
        $scope.removeItem = function (type, idx) {
            $scope.VM[type].splice(idx, 1);
        };
        $rootScope.app.Mask = false;
    }
})();