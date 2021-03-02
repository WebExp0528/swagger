/**
 * Created by Jafeez on 11/01/2017.
 */
(function(){
    ActionFormController.$inject = ['$scope','$rootScope','$state', '$stateParams', 'AuditService', 'Utils'];
    app.controller('DashActionUpdateCtrl', ActionFormController);

    function ActionFormController ($scope, $rootScope, $state, $stateParams, AuditService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Update Action";

        $scope.Form = {};

        $scope.submitAction = function() {
            if($scope.Form.Audit.$invalid) return false;

            var fileModel = $scope.Action.actionfileModel;
            var d = new Date();
            var idd = 'Top' + d.getTime();
            AuditService.ActionFileUpload(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }
                }
            }).finally(function () {
                AuditService.ReviewAction($stateParams.id, $scope.Action).then(function (res) {
                    if(res.status===200) $state.go('app.dashboard.main');
                });
            });
        };

        $scope.cancelAction = function() {
            if($scope.Form.Audit.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){ $state.go('app.dashboard.main'); });
                return false;
            }
            $state.go('app.dashboard.main');
        };

        $scope.Audit = {};
        AuditService.GetAction($stateParams.id).then(function (data) {
            $scope.dueDate = Utils.GetDPDate(data.dueDate);
            $scope.Action = data;
            if($scope.Action.actionStatus === "In Review"){
                $scope.Action.actionStatus = "In Progress";
            }
            return AuditService.GetEachAudit($scope.Action.auditId);
        }).then(function(audit){
            $scope.Audit = audit;
            return AuditService.GetEachTopic($scope.Action.topicid);
        }).then(function(topic){
            $scope.Audit.Topic = topic;
            return AuditService.GetEachFinding($scope.Action.findingId);
        }).then(function(finding){
            $scope.Audit.Finding = finding;
            $rootScope.app.Mask = false;
        }, function(err){
            $rootScope.app.Mask = false;
        });
    }
})();