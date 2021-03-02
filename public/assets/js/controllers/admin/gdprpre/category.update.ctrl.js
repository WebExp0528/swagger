(function () {
	CategoryUpdateController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'GDPRPreService', 'Utils'];
    app.controller('CategoryMgmUpdateCtrl', CategoryUpdateController);

    function CategoryUpdateController($scope, $rootScope, $state, $uibModal, $filter, GDPRPreService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Update GDPR Pre-Assessment Category";
        var id = $state.params.id;

        $rootScope.app.Mask = false;
        GDPRPreService.GetOneCategory(id).then(function(data) {
        	vm.formdata = data;
        })

        vm.submitAction = function(){
            $rootScope.app.Mask = true;
            if(vm.CategoryForm.$invalid) return false;

            GDPRPreService.PutCategory(id, vm.formdata).then(function (res) {

            }).finally(function () {
                $state.go('app.admin.gdprpre.category.main');
            });
        };

        vm.cancelAction = function () {
            if (vm.CategoryForm.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.admin.gdprpre.category.main');
                });
                return false;
            }
            $state.go('app.admin.gdprpre.category.main');
        };
    }
})();
