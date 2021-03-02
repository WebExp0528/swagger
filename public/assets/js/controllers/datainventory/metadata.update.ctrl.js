(function () {
	MetadataUpdateController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'DataInventoryService', 'Utils'];
    app.controller('MetadataUpdateCtrl', MetadataUpdateController);

    function MetadataUpdateController($scope, $rootScope, $state, $uibModal, $filter, DataInventoryService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Update Metadata";

        $rootScope.app.Mask = true;
        $rootScope.app.Mask = false;
    }
})();