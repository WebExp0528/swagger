/**
 * Created by Jafeez on 11/01/2017.
 */
(function(){
    AttestationFormController.$inject = ['$scope','$rootScope','$state', '$stateParams', 'BpmService', 'Utils'];
    app.controller('DashAttestationUpdateCtrl', AttestationFormController);

    function AttestationFormController ($scope, $rootScope, $state, $stateParams, BpmService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Update Attestation";

        $scope.Form = {};

        $scope.submitAction = function() {
            if($scope.Form.Attestation.$invalid) return false;

            var fileModel = $scope.Attestation.attestationFileModel;
            var d = new Date();
            var idd = 'Top' + d.getTime();
            BpmService.AttestationFileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                BpmService.ReviewAttestation($stateParams.id, $scope.Attestation).then(function (res) {
                    if(res.status===200) $state.go('app.dashboard.main');
                });
            });
        };

        $scope.cancelAction = function() {
            if($scope.Form.Attestation.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){ $state.go('app.dashboard.main'); });
                return false;
            }
            $state.go('app.dashboard.main');
        };

        $scope.Process = {};
        BpmService.GetAttestation($stateParams.id).then(function (data) {
            $scope.dueDate = Utils.GetDPDate(data.dueDate);
            $scope.Attestation = data;
            if($scope.Attestation.attestationStatus === "In Review"){
                $scope.Attestation.attestationStatus = "In Progress";
            }
            return BpmService.GetEachProcess($scope.Attestation.processId);
        }).then(function(process){
            $scope.Process = process;
            return BpmService.GetEachSubprocess($scope.Attestation.subprocessId);
        }).then(function(subprocess){
            $scope.Process.Subprocess = subprocess;
            return BpmService.GetEachActivity($scope.Attestation.activityId);
        }).then(function(activity){
            $scope.Process.Activity = activity;
            $rootScope.app.Mask = false;
        }, function(err){
            $rootScope.app.Mask = false;
        });
    }
})();