(function () {
	CategoryAddController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'GDPRPreService', 'Utils'];
    app.controller('CategoryMgmAddCtrl', CategoryAddController);

    function CategoryAddController($scope, $rootScope, $state, $uibModal, $filter, GDPRPreService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add GDPR Pre-Assessment Category";

        vm.formdata = {
            name: '',
            description: ''
        };

        $rootScope.app.Mask = false;

        vm.submitAction = function(){
            $rootScope.app.Mask = true;
            if(vm.CategoryForm.$invalid) return false;

            GDPRPreService.PostCategory(vm.formdata).then(function (res) {

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
