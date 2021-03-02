(function(){
    MappingController.$inject = ['$scope','$rootScope','$state', 'ControlService', 'Utils'];
    app.controller('ControlMapCtrl', MappingController);

    function MappingController ($scope, $rootScope, $state, ControlService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Security Controls Mapping between Standards";

        $rootScope.app.Mask = false;
        function loadMapping() {}
        $('.control-mappping-table td')
            .css({borderColor: '#000000'})
            .addClass('text-center');
        
        $scope.VM = {
        	active: ""
        };
    }
})();