(function () {
	MetadataController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'DataInventoryService', 'Utils'];
    app.controller('MetadataMainCtrl', MetadataController);

    function MetadataController($scope, $rootScope, $state, $uibModal, $filter, DataInventoryService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add Edit Search & Delete & Download Metadata";

        $rootScope.app.Mask = true;
        $rootScope.app.Mask = false;
    }
})();
