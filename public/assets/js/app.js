var app = angular.module('aasriApp', [
  'app.patch',
  'xeditable',
  'ui.bootstrap',
]);

app.run([
  '$rootScope',
  '$state',
  '$stateParams',
  '$location',
  '$http',
  '$localStorage',
  'editableOptions',
  function (
    $rootScope,
    $state,
    $stateParams,
    $location,
    $http,
    $localStorage,
    $editableOptions
  ) {
    $editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs4', 'bs2', 'default'

    FastClick.attach(document.body);

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.app = {
      name: 'Aasri Control',
      author: 'Aasri Control',
      description: 'Aasri Control, Angular application',
      version: '2.0',
      year: new Date().getFullYear(),
      isMobile: (function () {
        var check = false;
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          check = true;
        }
        return check;
      })(),
      layout: {
        isNavbarFixed: true,
        isSidebarFixed: false,
        isSidebarClosed: false,
        isFooterFixed: false,
        theme: 'theme-1',
        logo: 'assets/img/logo.png',
      },
      IsAuthenticated: false,
      APIPrefix: 'https://sraclone.aasricontrols.com/api/2/',
      NodeApi: 'http://localhost:3000/node',
      Debug: true,
      Mask: true,
      MaskLabel: null,
      CurrentModal: null,
    };
    $rootScope.app.authToken = (function () {
      var token = $localStorage.bearerToken;
      if (!token) {
        return '';
      }
      return token;
    })();
    $rootScope.user = {
      name: 'Alan',
      job: 'ng-Dev',
      picture: 'app/img/user/01.jpg',
    };
  },
]);

app.config([
  'cfpLoadingBarProvider',
  '$qProvider',
  function (cfpLoadingBarProvider, $qProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;

    $qProvider.errorOnUnhandledRejections(false);
  },
]);
