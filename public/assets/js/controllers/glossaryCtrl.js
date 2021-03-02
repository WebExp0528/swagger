'use strict';
/** 
  * controller for Contact Us
*/
app.controller('GlossaryCtrl', [
    "$scope", "$rootScope", "$state",
    function ($scope, $rootScope, $state) {
    $scope.mainTitle = $state.current.title || 'loading';
    $scope.mainDesc = "Glossary / Terminology";

    $rootScope.app.Mask = false;
}]);