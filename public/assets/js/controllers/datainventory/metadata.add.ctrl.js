(function () {
	MetadataAddController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'DataInventoryService', 'Utils'];
    app.controller('MetadataAddCtrl', MetadataAddController);

    function MetadataAddController($scope, $rootScope, $state, $uibModal, $filter, DataInventoryService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add Metadata";

        $rootScope.app.Mask = true;
        $rootScope.app.Mask = false;
    }
})();
