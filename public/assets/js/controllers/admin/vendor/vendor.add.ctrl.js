(function () {
    VendorAddController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'VendorService', 'Utils'];
    app.controller('VendorAddCtrl', VendorAddController);

    function VendorAddController($scope, $rootScope, $state, $uibModal, $filter, VendorService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "ADD Vendor";

        vm.formdata = {
            address: [],
            email: '',
            primaryContact: '',
            vendorName: ''
        };

        $rootScope.app.Mask = false;

        vm.submitAction = function(){
            $rootScope.app.Mask = true;
            if(vm.VendorForm.$invalid) return false;

            VendorService.PostVendor(vm.formdata).then(function (res) {

            }).finally(function () {
                $state.go('app.admin.vendor.main');
            });
        };

        vm.cancelAction = function () {
            if (vm.VendorForm.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.admin.vendor.main');
                });
                return false;
            }
            $state.go('app.admin.vendor.main');
        };
    }
})();