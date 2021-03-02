(function () {
    VendorUpdateController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'VendorService', 'Utils'];
    app.controller('VendorUpdateCtrl', VendorUpdateController);

    function VendorUpdateController($scope, $rootScope, $state, $uibModal, $filter, VendorService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Update Vendor";
        var vendorId = $state.params.vendorId;

        $rootScope.app.Mask = false;
        VendorService.GetVendorById(vendorId)
        .then(function (data) {
            vm.formdata = data;
        });

        vm.submitAction = function(){
            $rootScope.app.Mask = true;
            if(vm.VendorForm.$invalid) return false;

            VendorService.PutVendor(vendorId, vm.formdata).then(function (res) {

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