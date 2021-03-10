'use strict';

/**
 * Config for the router
 */
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$controllerProvider',
  '$compileProvider',
  '$filterProvider',
  '$provide',
  '$httpProvider',
  '$ocLazyLoadProvider',
  'ScrollBarsProvider',
  '$base64',
  'JS_REQUIRES',
  function (
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    $controllerProvider,
    $compileProvider,
    $filterProvider,
    $provide,
    $httpProvider,
    $ocLazyLoadProvider,
    ScrollBarsProvider,
    $base64,
    jsRequires
  ) {
    // $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.cache = false;

    //var user = 'user', pass = '6hf38!%DQ09736v,32/f85Ax@#';
    //console.log($base64.encode(user+':'+pass));
    // delete $httpProvider.defaults.headers['Authorization'];
    // delete $httpProvider.defaults.headers.common['Authorization'];
    // $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode(user+':'+pass);

    // $httpProvider.defaults.headers.common['Authorization'] = $localStorage.bearerToken;

    $httpProvider.interceptors.push('APIInterceptor');

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    // LAZY MODULES
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: jsRequires.modules,
    });

    ScrollBarsProvider.defaults = {
      scrollButtons: {
        scrollAmount: 'auto', // scroll amount when button pressed
        enable: true, // enable scrolling buttons by default
      },
      scrollInertia: 400, // adjust however you want
      axis: 'y', // enable 2 axis scrollbars by default,
      theme: 'dark-3',
      autoHideScrollbar: false,
    };

    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /app/dashboard
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
    $urlRouterProvider.otherwise('/dashboard');

    // Set up the states
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'assets/views/home.html',
        controller: '',
      })
      .state('app', {
        url: '',
        templateUrl: 'assets/views/app.html',
        resolve: loadSequence(
          'modernizr',
          'moment',
          'angularMoment',
          'uiSwitch',
          'perfect-scrollbar-plugin',
          'toaster',
          'ngAside',
          'vAccordion',
          'sweet-alert',
          'oitozero.ngSweetAlert',
          'truncate',
          'htmlToPlaintext',
          'angular-notification-icons',
          'ngrtPopover'
        ),
        abstract: true,
      })
      .state('app.dashboard', {
        url: '/dashboard',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.dashboard.main', {
        url: '',
        templateUrl: 'assets/views/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: loadSequence('mwl.calendar', 'DashboardCtrl'),
        title: 'Dashboard',
        ncyBreadcrumb: {
          label: 'Dashboard',
        },
      })
      .state('app.dashboard.action', {
        url: '/action',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.dashboard.action.form', {
        url: '/new',
        templateUrl: 'assets/views/dashboard.action.form.html',
        controller: 'DashActionFormCtrl',
        resolve: loadSequence('DashActionFormCtrl'),
        title: 'Dashboard Action',
        ncyBreadcrumb: {
          label: 'Dashboard',
        },
      })
      .state('app.dashboard.action.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/dashboard.action.form.html',
        controller: 'DashActionUpdateCtrl',
        resolve: loadSequence('DashActionUpdateCtrl'),
        title: 'Dashboard Action',
        ncyBreadcrumb: {
          label: 'Dashboard',
        },
      })
      .state('app.dashboard.attestation', {
        url: '/attestation',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.dashboard.attestation.update', {
        url: '/:id/updateAttestation',
        templateUrl: 'assets/views/dashboard.attestation.form.html',
        controller: 'DashAttestationUpdateCtrl',
        resolve: loadSequence('DashAttestationUpdateCtrl'),
        title: 'Dashboard Attestation',
        ncyBreadcrumb: {
          label: 'Dashboard',
        },
      })
      .state('app.dashboard.rcsa', {
        url: '/rcsa',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.dashboard.rcsa.update', {
        url: '/:id/updateRCSA',
        templateUrl: 'assets/views/dashboard.rcsa.form.html',
        controller: 'DashRCSAUpdateCtrl',
        resolve: loadSequence('DashRCSAUpdateCtrl'),
        title: 'Dashboard Risk Control Self Assessment',
        ncyBreadcrumb: {
          label: 'Dashboard',
        },
      })
      .state('app.dashboard.itriskassessment', {
        url: '/itriskassessment',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.dashboard.itriskassessment.update', {
        url: '/:id/updateITRiskAssessment',
        templateUrl: 'assets/views/dashboard.itriskassessment.form.html',
        controller: 'DashITRiskAssessmentUpdateCtrl',
        resolve: loadSequence('DashITRiskAssessmentUpdateCtrl'),
        title: 'Dashboard IT Risk Assessment',
        ncyBreadcrumb: {
          label: 'Dashboard',
        },
      })
      .state('app.dashboard.soxtp', {
        url: '/soxtp',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.dashboard.soxtp.update', {
        url: '/:id/updateSOXTP',
        templateUrl: 'assets/views/dashboard.soxtp.form.html',
        controller: 'DashSOXTPUpdateCtrl',
        resolve: loadSequence('DashSOXTPUpdateCtrl'),
        title: 'Dashboard SOX Test Plan',
        ncyBreadcrumb: {
          label: 'Dashboard',
        },
      })
      .state('app.dashboard.soxrcm', {
        url: '/soxrcm',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.dashboard.soxrcm.update', {
        url: '/:id/updateSOXRCM',
        templateUrl: 'assets/views/dashboard.soxrcm.form.html',
        controller: 'DashSOXRCMUpdateCtrl',
        resolve: loadSequence('DashSOXRCMUpdateCtrl'),
        title: 'Dashboard SOX Risk Control Matrix',
        ncyBreadcrumb: {
          label: 'Dashboard',
        },
      })
      .state('app.dashboard.soxpra', {
        url: '/soxpra',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.dashboard.soxpra.update', {
        url: '/:id/updateSOXPRA',
        templateUrl: 'assets/views/dashboard.soxpra.form.html',
        controller: 'DashSOXPRAUpdateCtrl',
        resolve: loadSequence('DashSOXPRAUpdateCtrl'),
        title: 'Dashboard SOX Process Risk Analysis',
        ncyBreadcrumb: {
          label: 'Dashboard',
        },
      })

      /*
         ---- OP RISK Routes ----
         */
      .state('app.oprisk', {
        url: '/oprisk',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.oprisk.incident', {
        url: '/incident',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.oprisk.incident.main', {
        url: '',
        templateUrl: 'assets/views/operationrisk/oprisk.incident.html',
        title: 'Loss Data Event Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'OprIncidentCtrl',
        resolve: loadSequence('OprIncidentCtrl'),
      })
      .state('app.oprisk.incident.form', {
        url: '/manage',
        templateUrl: 'assets/views/operationrisk/oprisk.incident.form.html',
        title: 'Loss Data Event Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'OprIncidentFormCtrl',
        resolve: loadSequence('OprIncidentFormCtrl'),
      })
      .state('app.oprisk.incident.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/operationrisk/oprisk.incident.form.html',
        title: 'Loss Data Event Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'OprIncidentUpdateCtrl',
        resolve: loadSequence('OprIncidentUpdateCtrl'),
      })
      .state('app.oprisk.incident.addaction', {
        url: '/addaction/:pid',
        templateUrl: 'assets/views/operationrisk/oprisk.action.form.html',
        title: 'Operational Risk Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'OprActionFormCtrl',
        resolve: loadSequence('OprActionFormCtrl'),
      })
      .state('app.oprisk.incident.updateaction', {
        url: '/updateaction/:id',
        templateUrl: 'assets/views/operationrisk/oprisk.action.form.html',
        title: 'Operational Risk Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'OprActionUpdateCtrl',
        resolve: loadSequence('OprActionUpdateCtrl'),
      })
      .state('app.oprisk.assessment', {
        url: '/assessment',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.oprisk.assessment.main', {
        url: '',
        templateUrl: 'assets/views/operationrisk/oprisk.assessment.html',
        title: 'Operational Risk Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'OprAssessmentCtrl',
        resolve: loadSequence('OprAssessmentCtrl'),
      })
      .state('app.oprisk.assessment.form', {
        url: '/manage',
        templateUrl: 'assets/views/operationrisk/oprisk.assessment.upload.html',
        title: 'Operational Risk Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'OprAssessmentFormCtrl',
        resolve: loadSequence('OprAssessmentFormCtrl'),
      })
      .state('app.oprisk.assessment.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/operationrisk/oprisk.assessment.upload.html',
        title: 'Operational Risk Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'OprAssessmentUpdateCtrl',
        resolve: loadSequence('OprAssessmentUpdateCtrl'),
      })

      /*
         ---- VENDOR RISK Routes ----
         */
      .state('app.vendorrisk', {
        url: '/vendorrisk',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.vendorrisk.stinfo', {
        url: '/stinfo',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.vendorrisk.stinfo.main', {
        url: '',
        templateUrl: 'assets/views/vendorrisk/vendorrisk.stinfo.html',
        title: 'Vendor Risk Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VendorriskStinfoCtrl',
        controllerAs: 'vrStinfo',
        resolve: loadSequence('VendorriskStinfoCtrl'),
      })
      .state('app.vendorrisk.stinfo.form', {
        url: '/manage',
        templateUrl: 'assets/views/vendorrisk/vendorrisk.stinfo.form.html',
        title: 'Vendor Risk Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VendorriskStinfoFormCtrl',
        controllerAs: 'VrStinfoForm',
        resolve: loadSequence('VendorriskStinfoFormCtrl'),
      })
      .state('app.vendorrisk.stinfo.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/vendorrisk/vendorrisk.stinfo.form.html',
        title: 'Vendor Risk Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VendorStinfoUpdateCtrl',
        controllerAs: 'vrStinfoupdate',
        resolve: loadSequence('VendorStinfoUpdateCtrl'),
      })
      .state('app.vendorrisk.assessment', {
        url: '/assess.create/:asId/:vrId/:page',
        templateUrl: 'assets/views/vendorrisk/vendorrisk.assess.create.html',
        title: 'Vendor Risk Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VendorAssessmentCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('VendorAssessmentCtrl'),
      })
      .state('app.vendorrisk.scorecard', {
        url: '/scorecard',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.vendorrisk.scorecard.main', {
        url: '',
        templateUrl: 'assets/views/vendorrisk/vendorrisk.scorecard.html',
        title: 'Vendor Risk Scorecards',
        icon: 'ti-layout-media-left-alt',
        controller: 'VendScoreCardCtrl',
        resolve: loadSequence('VendScoreCardCtrl'),
      })

      /* Vendor Link Routes */
      .state('vr', {
        url: '/vr',
        template: '<div ui-view class="fade-in-right-big smooth"></div>',
        abstract: true,
      })
      .state('vr.signin', {
        url: '/:asId/:vrId/:page',
        templateUrl: 'assets/views/vendor/login.html',
        controller: 'VendorLoginCtrl',
        resolve: loadSequence('VendorLoginCtrl'),
      })
      .state('vr.assessment', {
        url: '/assessment/:asId/:vrId/:page',
        templateUrl: 'assets/views/vendorrisk/vendorrisk.assess.create.html',
        title: 'Vendor Risk Assessment',
        icon: 'ti-layout-media-left-alt',
        controller: 'VendorAssessmentCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('VendorAssessmentCtrl'),
      })

      /*
         ---- IT RISK Routes ----
         */
      .state('app.itrisk', {
        url: '/itrisk',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.itrisk.incident', {
        url: '/incident',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.itrisk.incident.main', {
        url: '',
        templateUrl: 'assets/views/itrisk/itrisk.incident.html',
        title: 'IT Risk Incident Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ITRiskIncCtrl',
        resolve: loadSequence('ITRiskIncCtrl'),
      })
      .state('app.itrisk.incident.form', {
        url: '/manage',
        templateUrl: 'assets/views/itrisk/itrisk.incident.form.html',
        title: 'IT Risk Incident Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ITRiskIncFormCtrl',
        resolve: loadSequence('ITRiskIncFormCtrl'),
      })
      .state('app.itrisk.incident.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/itrisk/itrisk.incident.form.html',
        title: 'IT Risk Incident Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ITRiskIncUpdateCtrl',
        resolve: loadSequence('ITRiskIncUpdateCtrl'),
      })
      .state('app.itrisk.incident.addaction', {
        url: '/addaction/:pid',
        templateUrl: 'assets/views/itrisk/itrisk.action.form.html',
        title: 'IT Risk Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ITRiskActionFormCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ITRiskActionFormCtrl'),
      })
      .state('app.itrisk.incident.updateaction', {
        url: '/updateaction/:id',
        templateUrl: 'assets/views/itrisk/itrisk.action.form.html',
        title: 'IT Risk Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ITRiskActionUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ITRiskActionUpdateCtrl'),
      })
      .state('app.itrisk.assessment', {
        url: '/assessment',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.itrisk.assessment.main', {
        url: '',
        templateUrl: 'assets/views/itrisk/itrisk.assessment.html',
        title: 'IT Risk Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ITRiskAssCtrl',
        resolve: loadSequence('ITRiskAssCtrl'),
      })
      .state('app.itrisk.assessment.form', {
        url: '/manage',
        templateUrl: 'assets/views/itrisk/itrisk.assessment.form.html',
        title: 'IT Risk Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ITRiskAssFormCtrl',
        resolve: loadSequence('ITRiskAssFormCtrl'),
      })
      .state('app.itrisk.assessment.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/itrisk/itrisk.assessment.form.html',
        title: 'IT Risk Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ITRiskAssUpdateCtrl',
        resolve: loadSequence('ITRiskAssUpdateCtrl'),
      })

      /*
         ---- RISK Routes ----
         */
        .state('app.risk', {
            url: '/risk',
            template: '<div ui-view class="fade-in-up"></div>',
            abstract: true
        }).state('app.risk.profile', {
            url: '/profile',
            template: '<div ui-view class="fade-in-up"></div>',
            abstract: true
        }).state('app.risk.profile.main', {
            url: '',
            templateUrl: "assets/views/risk/risk.profile.html",
            title: 'Risk Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskProfileCtrl',
            resolve: loadSequence('RiskProfileCtrl', 'uniqueIds')
        }).state('app.risk.profile.form', {
            url: '/manage',
            templateUrl: "assets/views/risk/risk.profile.form.html",
            title: 'Risk Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskProfileFormCtrl',
            resolve: loadSequence('RiskProfileFormCtrl')
        }).state('app.risk.profile.update', {
            url: '/:id/update',
            templateUrl: "assets/views/risk/risk.profile.form.html",
            title: 'Risk Profile Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskProfileUpdateCtrl',
            resolve: loadSequence('RiskProfileUpdateCtrl')
        }).state('app.risk.profile.addcontroltestdata', {
            url: '/addcontroltestdata/:pid',
            templateUrl: "assets/views/risk/risk.controltestdata.form.html",
            title: 'Risk Profile Control Test Data Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskControlTestDataFormCtrl',
            resolve: loadSequence('RiskControlTestDataFormCtrl')
        }).state('app.risk.profile.updatecontroltestdata', {
            url: '/updatecontroltestdata/:controlTestDataId',
            templateUrl: "assets/views/risk/risk.controltestdata.form.html",
            title: 'Risk Profile Control Test Data Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskControlTestDataUpdateCtrl',
            resolve: loadSequence('RiskControlTestDataUpdateCtrl')
        }).state('app.risk.profile.addaction', {
            url: '/addaction/:pid',
            templateUrl: "assets/views/risk/risk.action.form.html",
            title: 'Risk Profile Action Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskProfileActionFormCtrl',
            controllerAs: 'vm',
            resolve: loadSequence('RiskProfileActionFormCtrl')
        }).state('app.risk.profile.updateaction', {
            url: '/updateaction/:id',
            templateUrl: "assets/views/risk/risk.action.form.html",
            title: 'Risk Profile Action Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskProfileActionUpdateCtrl',
            controllerAs: 'vm',
            resolve: loadSequence('RiskProfileActionUpdateCtrl')
        }).state('app.risk.assessment', {
            url: '/assessment',
            template: '<div ui-view class="fade-in-up"></div>',
            abstract: true
        }).state('app.risk.assessment.main', {
            url: '',
            templateUrl: "assets/views/risk/risk.assessment.html",
            title: 'Risk Control Self Assessment Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskAssessmentCtrl',
            resolve: loadSequence('RiskAssessmentCtrl')
        }).state('app.risk.assessment.form', {
            url: '/manage',
            templateUrl: "assets/views/risk/risk.assessment.form.html",
            title: 'Risk Control Self Assessment Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskAssessmentFormCtrl',
            resolve: loadSequence('RiskAssessmentFormCtrl')
        }).state('app.risk.assessment.update', {
            url: '/:id/update',
            templateUrl: "assets/views/risk/risk.assessment.form.html",
            title: 'Risk Control Self Assessment Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskAssessmentUpdateCtrl',
            resolve: loadSequence('RiskAssessmentUpdateCtrl')
        }).state('app.risk.matrix', {
            url: '/matrix',
            template: '<div ui-view class="fade-in-up"></div>',
            abstract: true
        }).state('app.risk.matrix.main', {
            url: '',
            templateUrl: "assets/views/risk/risk.matrix.html",
            title: 'Risk Control Matrix',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskProfileCtrl',
            resolve: loadSequence('RiskProfileCtrl', 'uniqueIds')
        }).state('app.risk.assessment.iso27000', {
            url: '/iso27000',
            template: '<div ui-view class="fade-in-up"></div>',
            abstract: true
        }).state('app.risk.assessment.create', {
            url: '/assessmentgencreate/:asId/:assessName/:assessmentBy/:approver/:approvedDate/:due_date/:riskType/:docType/:period',
            templateUrl: 'assets/views/risk/risk.assessment.create.html',
            title: 'Risk Control Self Assessment',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskAssessmentCreateCtrl',
            controllerAs: 'vm',
            resolve: loadSequence('RiskAssessmentCreateCtrl')
        }).state('app.risk.assessment.iso27000.main', {
            url: '',
            templateUrl: "assets/views/risk/risk.assessment.iso27000.html",
            title: 'ISO 27000 Assessment Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskISO27000AssessmentCtrl',
            resolve: loadSequence('RiskISO27000AssessmentCtrl')
        }).state('app.risk.assessment.iso27000.create', {
            url: '/assessmentgencreate/:assessName/:assessmentBy/:approver/:approvedDate/:due_date/:riskType/:docType/:period',
            templateUrl: 'assets/views/risk/risk.assessment.iso27000.create.html',
            title: 'ISO 27000 Assessment',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskISO27000AssessmentCreateCtrl',
            controllerAs: 'vm',
            resolve: loadSequence('RiskISO27000AssessmentCreateCtrl')
        }).state('app.risk.assessment.nydfs', {
            url: '/nydfs',
            template: '<div ui-view class="fade-in-up"></div>',
            abstract: true
        }).state('app.risk.assessment.nydfs.main', {
            url: '',
            templateUrl: "assets/views/risk/risk.assessment.nydfs.html",
            title: 'NYDFS Assessment Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskNYDFSAssessmentCtrl',
            resolve: loadSequence('RiskNYDFSAssessmentCtrl')
        }).state('app.risk.assessment.nydfs.create', {
            url: '/assessmentgencreate/:assessName/:assessmentBy/:approver/:approvedDate/:due_date/:riskType/:docType/:period',
            templateUrl: 'assets/views/risk/risk.assessment.nydfs.create.html',
            title: 'NYDFS Assessment',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskNYDFSAssessmentCreateCtrl',
            controllerAs: 'vm',
            resolve: loadSequence('RiskNYDFSAssessmentCreateCtrl')
        }).state('app.risk.assessment.gdpr', {
            url: '/gdpr',
            template: '<div ui-view class="fade-in-up"></div>',
            abstract: true
        }).state('app.risk.assessment.gdpr.main', {
            url: '',
            templateUrl: "assets/views/risk/risk.assessment.gdpr.html",
            title: 'GDPR Assessment Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskGDPRAssessmentCtrl',
            resolve: loadSequence('RiskGDPRAssessmentCtrl')
        }).state('app.risk.assessment.gdpr.create', {
            url: '/assessmentgencreate/:asId/:assessName/:assessmentBy/:approver/:approvedDate/:due_date/:riskType/:docType/:period',
            templateUrl: 'assets/views/risk/risk.assessment.gdpr.create.html',
            title: 'GDPR Assessment',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskGDPRAssessmentCreateCtrl',
            controllerAs: 'vm',
            resolve: loadSequence('RiskGDPRAssessmentCreateCtrl')
        }).state('app.risk.rcm', {
            url: '/rcm',
            template: '<div ui-view class="fade-in-up"></div>',
            abstract: true
        }).state('app.risk.rcm.main', {
            url: '',
            templateUrl: "assets/views/risk/risk.rcm.html",
            title: 'Risk Profile Management',
            icon: 'ti-layout-media-left-alt',
            controller: 'RiskRCMCtrl',
            resolve: loadSequence('RiskRCMCtrl')
        })

      /*
         ---- CONTROL Routes ----
         */
      .state('app.control', {
        url: '/control',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.control.repo', {
        url: '/repo',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.control.repo.main', {
        url: '',
        templateUrl: 'assets/views/control/control.repo.html',
        title: 'Control Data Repository Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'RepoCtrl',
        resolve: loadSequence('RepoCtrl'),
      })
      .state('app.control.repo.form', {
        url: '/manage',
        templateUrl: 'assets/views/control/control.repo.form.html',
        title: 'Control Data Repository Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'RepoFormCtrl',
        resolve: loadSequence('RepoFormCtrl'),
      })
      .state('app.control.repo.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/control/control.repo.form.html',
        title: 'Control Data Repository Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'RepoUpdateCtrl',
        resolve: loadSequence('RepoUpdateCtrl'),
      })
      .state('app.control.testplan', {
        url: '/testplan',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.control.testplan.main', {
        url: '',
        templateUrl: 'assets/views/control/control.testplan.html',
        title: 'CONTROL TEST PLAN  Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'TestPlanCtrl',
        resolve: loadSequence('TestPlanCtrl'),
      })
      .state('app.control.testplan.form', {
        url: '/manage',
        templateUrl: 'assets/views/control/control.testplan.form.html',
        title: 'CONTROL TEST PLAN Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'TestPlanFormCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('TestPlanFormCtrl'),
      })
      .state('app.control.testplan.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/control/control.testplan.form.html',
        title: 'CONTROL TEST PLAN Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'TestPlanUpdateCtrl',
        resolve: loadSequence('TestPlanUpdateCtrl'),
      })
      .state('app.control.testresult', {
        url: '/testresult',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.control.testresult.main', {
        url: '',
        templateUrl: 'assets/views/control/control.testresult.html',
        title: 'CONTROL TEST RESULT Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'TestResultCtrl',
        resolve: loadSequence('TestResultCtrl'),
      })
      .state('app.control.testresult.form', {
        url: '/manage',
        templateUrl: 'assets/views/control/control.testresult.form.html',
        title: 'CONTROL TEST RESULT Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'TestResultFormCtrl',
        resolve: loadSequence('TestResultFormCtrl'),
      })
      .state('app.control.testresult.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/control/control.testresult.form.html',
        title: 'CONTROL TEST RESULT Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'TestResultUpdateCtrl',
        resolve: loadSequence('TestResultUpdateCtrl'),
      })
      .state('app.control.mapping', {
        url: '/mapping',
        templateUrl: 'assets/views/control/control.mapping.html',
        title: 'Control Mapping',
        icon: 'ti-layout-media-left-alt',
        controller: 'ControlMapCtrl',
        resolve: loadSequence('ControlMapCtrl'),
      })
      .state('app.control.dashboard', {
        url: '/dashboard',
        templateUrl: 'assets/views/control/control.dashboard.html',
        title: 'Dashboard',
        icon: 'ti-layout-media-left-alt',
        controller: 'ControlDashboardCtrl',
        resolve: loadSequence('ControlDashboardCtrl'),
      })

      /*
         ---- Compliance Routes ----
         */
      .state('app.compliance', {
        url: '/compliance',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.compliance.amlkyctp', {
        url: '/amlkyctp',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.compliance.amlkyctp.main', {
        url: '',
        templateUrl: 'assets/views/compliance/amlkyctp.html',
        title: 'AML/KYC Test Plan Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AMLKYCTPCtrl',
        resolve: loadSequence('AMLKYCTPCtrl'),
      })
      .state('app.compliance.amlkyctp.form', {
        url: '/amlkycmanage',
        templateUrl: 'assets/views/compliance/amlkyctp.form.html',
        title: 'AML/KYC Test Plan Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AMLKYCTPFormCtrl',
        resolve: loadSequence('AMLKYCTPFormCtrl'),
      })
      .state('app.compliance.amlkyctp.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/compliance/amlkyctp.form.html',
        title: 'AML/KYC Test Plan Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AMLKYCTPUpdateCtrl',
        resolve: loadSequence('AMLKYCTPUpdateCtrl'),
      })
      .state('app.compliance.amlkyctp.create', {
        url: '/amlkyccreate',
        templateUrl: 'assets/views/compliance/amlkyctp.create.html',
        title: 'AML/KYC Test Plan',
        icon: 'ti-layout-media-left-alt',
        controller: 'AMLKYCTPCreateCtrl',
        resolve: loadSequence('AMLKYCTPCreateCtrl'),
      })
      .state('app.compliance.volckertp', {
        url: '/volckertp',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.compliance.volckertp.main', {
        url: '',
        templateUrl: 'assets/views/compliance/volckertp.html',
        title: 'Volcker Test Plan Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VOLCKERTPCtrl',
        resolve: loadSequence('VOLCKERTPCtrl'),
      })
      .state('app.compliance.volckertp.form', {
        url: '/volckermanage',
        templateUrl: 'assets/views/compliance/volckertp.form.html',
        title: 'Volcker Test Plan Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VOLCKERTPFormCtrl',
        resolve: loadSequence('VOLCKERTPFormCtrl'),
      })
      .state('app.compliance.volckertp.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/compliance/volckertp.form.html',
        title: 'Volcker Test Plan Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VOLCKERTPUpdateCtrl',
        resolve: loadSequence('VOLCKERTPUpdateCtrl'),
      })
      .state('app.compliance.volckertp.create', {
        url: '/volckercreate',
        templateUrl: 'assets/views/compliance/volckertp.create.html',
        title: 'Volcker Assessment',
        icon: 'ti-layout-media-left-alt',
        controller: 'VOLCKERTPCreateCtrl',
        resolve: loadSequence('VOLCKERTPCreateCtrl'),
      })
      .state('app.compliance.volckertp.create_assessment', {
        url:
          '/volcker.assess.create/:assessName/:assessDate/:assessmentBy/:assessType/:page',
        templateUrl: 'assets/views/compliance/volckertp.create_assessment.html',
        title: 'Volcker Assessment ',
        icon: 'ti-layout-media-left-alt',
        controller: 'VolckerAssessmentCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('VolckerAssessmentCtrl'),
      })
      .state('app.compliance.pcidss', {
        url: '/pcidss',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.compliance.pcidss.main', {
        url: '',
        templateUrl: 'assets/views/compliance/pcidss.html',
        title: 'PCIDSS Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PCIDSSCtrl',
        resolve: loadSequence('PCIDSSCtrl'),
      })
      .state('app.compliance.pcidss.form', {
        url: '/pcidssmanage',
        templateUrl: 'assets/views/compliance/pcidss.form.html',
        title: 'PCIDSS Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PCIDSSFormCtrl',
        resolve: loadSequence('PCIDSSFormCtrl'),
      })
      .state('app.compliance.pcidss.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/compliance/pcidss.form.html',
        title: 'PCIDSS Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PCIDSSUpdateCtrl',
        resolve: loadSequence('PCIDSSUpdateCtrl'),
      })
      .state('app.compliance.pcidss.create', {
        url: '/pcidsscreate',
        templateUrl: 'assets/views/compliance/pcidss.create.html',
        title: 'PCIDSS Test Plan',
        icon: 'ti-layout-media-left-alt',
        controller: 'PCIDSSCreateCtrl',
        resolve: loadSequence('PCIDSSCreateCtrl'),
      })
      .state('app.compliance.soxtp', {
        url: '/soxtp',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.compliance.soxtp.main', {
        url: '',
        templateUrl: 'assets/views/compliance/soxtp.html',
        title: 'SOX Test Plan Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOXTPCtrl',
        resolve: loadSequence('SOXTPCtrl'),
      })
      .state('app.compliance.soxtp.form', {
        url: '/soxtpmanage',
        templateUrl: 'assets/views/compliance/soxtp.form.html',
        title: 'SOX Test Plan Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOXTPFormCtrl',
        resolve: loadSequence('SOXTPFormCtrl'),
      })
      .state('app.compliance.soxtp.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/compliance/soxtp.form.html',
        title: 'SOX Test Plan Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOXTPUpdateCtrl',
        resolve: loadSequence('SOXTPUpdateCtrl'),
      })
      .state('app.compliance.soxtp.create', {
        url: '/soxtpcreate',
        templateUrl: 'assets/views/compliance/soxtp.create.html',
        title: 'SOX Test Plan',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOXTPCreateCtrl',
        resolve: loadSequence('SOXTPCreateCtrl'),
      })
      .state('app.compliance.soxpra', {
        url: '/soxpra',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.compliance.soxpra.main', {
        url: '',
        templateUrl: 'assets/views/compliance/soxpra.html',
        title: 'SOX Process Risk Analysis Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOXPRACtrl',
        resolve: loadSequence('SOXPRACtrl'),
      })
      .state('app.compliance.soxpra.form', {
        url: '/soxpramanage',
        templateUrl: 'assets/views/compliance/soxpra.form.html',
        title: 'SOX Process Risk Analysis Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOXPRAFormCtrl',
        resolve: loadSequence('SOXPRAFormCtrl'),
      })
      .state('app.compliance.soxpra.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/compliance/soxpra.form.html',
        title: 'SOX Process Risk Analysis Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOXPRAUpdateCtrl',
        resolve: loadSequence('SOXPRAUpdateCtrl'),
      })
      .state('app.compliance.soxrcm', {
        url: '/soxrcm',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.compliance.soxrcm.main', {
        url: '',
        templateUrl: 'assets/views/compliance/soxrcm.html',
        title: 'SOX Risk Control Matrix Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOXRCMCtrl',
        resolve: loadSequence('SOXRCMCtrl'),
      })
      .state('app.compliance.soxrcm.form', {
        url: '/soxrcmmanage',
        templateUrl: 'assets/views/compliance/soxrcm.form.html',
        title: 'SOX Risk Control Matrix Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOXRCMFormCtrl',
        resolve: loadSequence('SOXRCMFormCtrl'),
      })
      .state('app.compliance.soxrcm.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/compliance/soxrcm.form.html',
        title: 'SOX Risk Control Matrix Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOXRCMUpdateCtrl',
        resolve: loadSequence('SOXRCMUpdateCtrl'),
      })
      .state('app.compliance.soxrcm.create', {
        url: '/soxrcmcreate',
        templateUrl: 'assets/views/compliance/soxrcm.create.html',
        title: 'SOX Risk Control Matrix',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOXRCMCreateCtrl',
        resolve: loadSequence('SOXRCMCreateCtrl'),
      })
      .state('app.compliance.soctp', {
        url: '/soctp',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.compliance.soctp.main', {
        url: '',
        templateUrl: 'assets/views/compliance/soctp.html',
        title: 'SOC Test Plan Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOCTPCtrl',
        resolve: loadSequence('SOCTPCtrl'),
      })
      .state('app.compliance.soctp.form', {
        url: '/soctpmanage',
        templateUrl: 'assets/views/compliance/soctp.form.html',
        title: 'SOC Test Plan Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOCTPFormCtrl',
        resolve: loadSequence('SOCTPFormCtrl'),
      })
      .state('app.compliance.soctp.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/compliance/soctp.form.html',
        title: 'SOC Test Plan Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOCTPUpdateCtrl',
        resolve: loadSequence('SOCTPUpdateCtrl'),
      })
      .state('app.compliance.soctp.create', {
        url: '/soccreate',
        templateUrl: 'assets/views/compliance/soctp.create.html',
        title: 'SOC Test Plan',
        icon: 'ti-layout-media-left-alt',
        controller: 'SOCTPCreateCtrl',
        resolve: loadSequence('SOCTPCreateCtrl'),
      })
      .state('app.compliance.nydfs', {
        url: '/nydfs',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.compliance.nydfs.main', {
        url: '',
        templateUrl: 'assets/views/compliance/nydfs.html',
        title: 'NYDFS Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'NYDFSAssessmentCtrl',
        resolve: loadSequence('NYDFSAssessmentCtrl'),
      })
      .state('app.compliance.nydfs.form', {
        url: '/nydfsmanage',
        templateUrl: 'assets/views/compliance/nydfs.form.html',
        title: 'NYDFS Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'NYDFSAssessmentFormCtrl',
        resolve: loadSequence('NYDFSAssessmentFormCtrl'),
      })
      .state('app.compliance.nydfs.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/compliance/nydfs.form.html',
        title: 'NYDFS Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'NYDFSAssessmentUpdateCtrl',
        resolve: loadSequence('NYDFSAssessmentUpdateCtrl'),
      })
      .state('app.compliance.nydfs.create', {
        url:
          '/nydfscreate/:assessName/:assessmentBy/:approver/:approvedDate/:due_date/:riskType/:docType/:period',
        templateUrl: 'assets/views/compliance/nydfs.create.html',
        title: 'NYDFS Assessment',
        icon: 'ti-layout-media-left-alt',
        controller: 'NYDFSAssessmentCreateCtrl',
        resolve: loadSequence('NYDFSAssessmentCreateCtrl'),
      })
      .state('app.compliance.gdprpre', {
        url: '/gdprpre',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.compliance.gdprpre.main', {
        url: '',
        templateUrl: 'assets/views/compliance/gdprpre.html',
        title: 'GDPR Pre-Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'GDPRPreAssessmentCtrl',
        resolve: loadSequence('GDPRPreAssessmentCtrl'),
      })
      .state('app.compliance.gdprpre.form', {
        url: '/gdprmanage',
        templateUrl: 'assets/views/compliance/gdprpre.form.html',
        title: 'GDPR Pre-Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'GDPRPreAssessmentFormCtrl',
        resolve: loadSequence('GDPRPreAssessmentFormCtrl'),
      })
      .state('app.compliance.gdprpre.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/compliance/gdprpre.form.html',
        title: 'GDPR Pre-Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'GDPRPreAssessmentUpdateCtrl',
        resolve: loadSequence('GDPRPreAssessmentUpdateCtrl'),
      })
      .state('app.compliance.gdprpre.create', {
        url: '/gdprprecreate',
        templateUrl: 'assets/views/compliance/gdprpre.create.html',
        title: 'GDPR Pre-Assessment',
        icon: 'ti-layout-media-left-alt',
        controller: 'GDPRPreAssessmentCreateCtrl',
        resolve: loadSequence('GDPRPreAssessmentCreateCtrl'),
      })
      .state('app.compliance.gdpr', {
        url: '/gdpr',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.compliance.gdpr.main', {
        url: '',
        templateUrl: 'assets/views/compliance/gdpr.html',
        title: 'GDPR Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'GDPRAssessmentCtrl',
        resolve: loadSequence('GDPRAssessmentCtrl'),
      })
      .state('app.compliance.gdpr.form', {
        url: '/gdprmanage',
        templateUrl: 'assets/views/compliance/gdpr.form.html',
        title: 'GDPR Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'GDPRAssessmentFormCtrl',
        resolve: loadSequence('GDPRAssessmentFormCtrl'),
      })
      .state('app.compliance.gdpr.update', {
        url: '/:id/update',
        templateUrl: 'assets/views/compliance/gdpr.form.html',
        title: 'GDPR Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'GDPRAssessmentUpdateCtrl',
        resolve: loadSequence('GDPRAssessmentUpdateCtrl'),
      })
      .state('app.compliance.gdpr.create', {
        url:
          '/gdprcreate/:asId/:assessName/:assessmentBy/:approver/:approvedDate/:due_date/:riskType/:docType/:period',
        templateUrl: 'assets/views/compliance/gdpr.create.html',
        title: 'GDPR Assessment',
        icon: 'ti-layout-media-left-alt',
        controller: 'GDPRAssessmentCreateCtrl',
        resolve: loadSequence('GDPRAssessmentCreateCtrl'),
      })
      .state('app.compliance.nydfs.addcontroltestdata', {
        url: '/addcontroltestdata/:pid',
        templateUrl: 'assets/views/compliance/nydfs.controltestdata.form.html',
        title: 'NYDFS Control Test Data Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'NYDFSControlTestDataFormCtrl',
        resolve: loadSequence('NYDFSControlTestDataFormCtrl'),
      })
      .state('app.compliance.nydfs.updatecontroltestdata', {
        url: '/updatecontroltestdata/:controlTestDataId',
        templateUrl: 'assets/views/compliance/nydfs.controltestdata.form.html',
        title: 'NYDFS Control Test Data',
        icon: 'ti-layout-media-left-alt',
        controller: 'NYDFSControlTestDataUpdateCtrl',
        resolve: loadSequence('NYDFSControlTestDataUpdateCtrl'),
      })
      .state('app.compliance.gdpr.addcontroltestdata', {
        url: '/addcontroltestdata/:pid',
        templateUrl: 'assets/views/compliance/gdpr.controltestdata.form.html',
        title: 'GDPR Control Test Data Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'GDPRControlTestDataFormCtrl',
        resolve: loadSequence('GDPRControlTestDataFormCtrl'),
      })
      .state('app.compliance.gdpr.updatecontroltestdata', {
        url: '/updatecontroltestdata/:controlTestDataId',
        templateUrl: 'assets/views/compliance/gdpr.controltestdata.form.html',
        title: 'GDPR Control Test Data Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'GDPRControlTestDataUpdateCtrl',
        resolve: loadSequence('GDPRControlTestDataUpdateCtrl'),
      })

      /* Control Test Data Management */
      .state('app.controltestdata', {
        url: '/controltestdata',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.controltestdata.main', {
        url: '',
        templateUrl: 'assets/views/controltestdata/controltestdata.main.html',
        title: 'Test Data Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ControlTestDataMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ControlTestDataMainCtrl'),
      })
      .state('app.controltestdata.add', {
        url: '/add/:pid',
        templateUrl: 'assets/views/controltestdata/controltestdata.add.html',
        title: 'Test Data Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ControlTestDataAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ControlTestDataAddCtrl'),
      })
      .state('app.controltestdata.update', {
        url: '/update/:controlTestDataId',
        templateUrl: 'assets/views/controltestdata/controltestdata.add.html',
        title: 'Test Data Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ControlTestDataUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ControlTestDataUpdateCtrl'),
      })

      /* ------------------------ Data Inventory Management ----------------------- */

      .state('app.datainventory', {
        url: '/datainventory',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.datainventory.asset', {
        url: '/asset',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.datainventory.asset.main', {
        url: '',
        templateUrl: 'assets/views/datainventory/assetinventory.main.html',
        title: 'Asset Inventory Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AssetInventoryMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AssetInventoryMainCtrl'),
      })
      .state('app.datainventory.asset.add', {
        url: '/add',
        templateUrl: 'assets/views/datainventory/assetinventory.add.html',
        title: 'Asset Inventory Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AssetInventoryAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AssetInventoryAddCtrl'),
      })
      .state('app.datainventory.asset.update', {
        url: '/update/:assetId',
        templateUrl: 'assets/views/datainventory/assetinventory.add.html',
        title: 'Asset Inventory Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AssetInventoryUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AssetInventoryUpdateCtrl'),
      })
      .state('app.datainventory.datamodels', {
        url: '/datamodels',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.datainventory.datamodels.main', {
        url: '',
        templateUrl: 'assets/views/datainventory/datamodels.main.html',
        title: 'Data Models Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'DataModelsMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('DataModelsMainCtrl'),
      })
      .state('app.datainventory.datamodels.add', {
        url: '/add',
        templateUrl: 'assets/views/datainventory/datamodels.add.html',
        title: 'Data Models Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'DataModelsAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('DataModelsAddCtrl'),
      })
      .state('app.datainventory.datamodels.update', {
        url: '/update/:id',
        templateUrl: 'assets/views/datainventory/datamodels.add.html',
        title: 'Data Models Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'DataModelsUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('DataModelsUpdateCtrl'),
      })
      .state('app.datainventory.datamapping', {
        url: '/datamapping',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.datainventory.datamapping.main', {
        url: '',
        templateUrl: 'assets/views/datainventory/datamapping.main.html',
        title: 'Data Mapping Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'DataMappingMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('DataMappingMainCtrl'),
      })
      .state('app.datainventory.datamapping.add', {
        url: '/add',
        templateUrl: 'assets/views/datainventory/datamapping.add.html',
        title: 'Data Mapping Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'DataMappingAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('DataMappingAddCtrl'),
      })
      .state('app.datainventory.datamapping.update', {
        url: '/update/:id',
        templateUrl: 'assets/views/datainventory/datamapping.add.html',
        title: 'Data Mapping Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'DataMappingUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('DataMappingUpdateCtrl'),
      })
      .state('app.datainventory.metadata', {
        url: '/metadata',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.datainventory.metadata.main', {
        url: '',
        templateUrl: 'assets/views/datainventory/metadata.main.html',
        title: 'Metadata Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'MetadataMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('MetadataMainCtrl'),
      })
      .state('app.datainventory.metadata.add', {
        url: '/add',
        templateUrl: 'assets/views/datainventory/metadata.add.html',
        title: 'Metadata Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'MetadataAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('MetadataAddCtrl'),
      })
      .state('app.datainventory.metadata.update', {
        url: '/update/:id',
        templateUrl: 'assets/views/datainventory/metadata.add.html',
        title: 'Metadata Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'MetadataUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('MetadataUpdateCtrl'),
      })

      /*
         ---- Audit  ----
         */
      .state('app.audit', {
        url: '/audit',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.audit.main', {
        url: '',
        templateUrl: 'assets/views/audit/audit.main.html',
        title: 'AUDIT UNIVERSE',
        icon: 'ti-layout-media-left-alt',
        controller: 'AuditMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AuditMainCtrl'),
      })
      .state('app.audit.add_audit', {
        url: '/audit.add_audit',
        templateUrl: 'assets/views/audit/audit.add_audit.html',
        title: 'AUDIT UNIVERSE',
        icon: 'ti-layout-media-left-alt',
        controller: 'AuditAdd_AuditCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AuditAdd_AuditCtrl'),
      })
      .state('app.audit.update_audit', {
        url: '/update/:audit_id',
        templateUrl: 'assets/views/audit/audit.update_audit.html',
        title: 'AUDIT UNIVERSE',
        icon: 'ti-layout-media-left-alt',
        controller: 'AuditUpdate_AuditCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AuditUpdate_AuditCtrl'),
      })
      .state('app.audit.add_topic', {
        url: '/audit.add_topic/:audit_id',
        templateUrl: 'assets/views/audit/audit.add_topic.html',
        title: 'Audit Step Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AuditAdd_TopicCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AuditAdd_TopicCtrl'),
      })
      .state('app.audit.update_topic', {
        url: '/audit.update_topic/:topic_id',
        templateUrl: 'assets/views/audit/audit.update_topic.html',
        title: 'Audit Step Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AuditUpdate_TopicCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AuditUpdate_TopicCtrl'),
      })
      .state('app.audit.add_tasks', {
        url: '/audit.add_tasks/:topic_id',
        templateUrl: 'assets/views/audit/audit.add_task.html',
        title: 'Task Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AuditAdd_TaskCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AuditAdd_TaskCtrl'),
      })
      .state('app.audit.update_tasks', {
        url: '/audit.update_tasks/:task_id',
        templateUrl: 'assets/views/audit/audit.update_task.html',
        title: 'Task Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AuditUpdate_TaskCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AuditUpdate_TaskCtrl'),
      })
      .state('app.audit.add_findings', {
        url: '/audit.add_findings/:topic_id',
        templateUrl: 'assets/views/audit/audit.add_finding.html',
        title: 'Finding Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AuditAdd_FindingCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AuditAdd_FindingCtrl'),
      })
      .state('app.audit.update_findings', {
        url: '/audit.update_findings/:finding_id',
        templateUrl: 'assets/views/audit/audit.update_finding.html',
        title: 'Finding Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AuditUpdate_FindingCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AuditUpdate_FindingCtrl'),
      })
      .state('app.audit.add_action', {
        url: '/audit.add_action/:finding_id',
        templateUrl: 'assets/views/audit/audit.add_action.html',
        title: 'Action Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AuditAdd_ActionCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AuditAdd_ActionCtrl'),
      })
      .state('app.audit.update_action', {
        url: '/audit.update_action/:action_id',
        templateUrl: 'assets/views/audit/audit.update_action.html',
        title: 'Action Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'AuditUpdate_ActionCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AuditUpdate_ActionCtrl'),
      })

      /*
         ---- Business Process Management (BPM)  ----
         */
      .state('app.bpm', {
        url: '/bpm',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.bpm.main', {
        url: '',
        templateUrl: 'assets/views/bpm/bpm.main.html',
        title: 'Business Process Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'BpmMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('BpmMainCtrl'),
      })
      .state('app.bpm.add_process', {
        url: '/bpm.add_process',
        templateUrl: 'assets/views/bpm/bpm.add_process.html',
        title: 'Process Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'BpmAdd_ProcessCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('BpmAdd_ProcessCtrl'),
      })
      .state('app.bpm.update_process', {
        url: '/update/:process_id',
        templateUrl: 'assets/views/bpm/bpm.update_process.html',
        title: 'Process Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'BpmUpdate_ProcessCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('BpmUpdate_ProcessCtrl'),
      })
      .state('app.bpm.add_subprocess', {
        url: '/bpm.add_subprocess/:process_id',
        templateUrl: 'assets/views/bpm/bpm.add_subprocess.html',
        title: 'Subprocess Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'BpmAdd_SubprocessCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('BpmAdd_SubprocessCtrl'),
      })
      .state('app.bpm.update_subprocess', {
        url: '/bpm.update_subprocess/:subprocess_id',
        templateUrl: 'assets/views/bpm/bpm.update_subprocess.html',
        title: 'Subprocess Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'BpmUpdate_SubprocessCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('BpmUpdate_SubprocessCtrl'),
      })
      .state('app.bpm.add_activity', {
        url: '/bpm.add_activity/:subprocess_id',
        templateUrl: 'assets/views/bpm/bpm.add_activity.html',
        title: 'Activity Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'BpmAdd_ActivityCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('BpmAdd_ActivityCtrl'),
      })
      .state('app.bpm.update_activity', {
        url: '/bpm.update_activity/:activity_id',
        templateUrl: 'assets/views/bpm/bpm.update_activity.html',
        title: 'Activity Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'BpmUpdate_ActivityCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('BpmUpdate_ActivityCtrl'),
      })
      .state('app.bpm.add_attestation', {
        url: '/bpm.add_attestation/:activity_id',
        templateUrl: 'assets/views/bpm/bpm.add_attestation.html',
        title: 'Attestation Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'BpmAdd_AttestationCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('BpmAdd_AttestationCtrl'),
      })
      .state('app.bpm.update_attestation', {
        url: '/bpm.update_attestation/:attestation_id',
        templateUrl: 'assets/views/bpm/bpm.update_attestation.html',
        title: 'Attestation Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'BpmUpdate_AttestationCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('BpmUpdate_AttestationCtrl'),
      })

      /*
         ---- Policy Route ----
         */
      .state('app.polproc', {
        url: '/polproc',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.polproc.policy', {
        url: '/policy',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.polproc.policy.main', {
        url: '',
        templateUrl: 'assets/views/policy/policy.html',
        title: 'Policy Document Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PolicyCtrl',
        resolve: loadSequence('PolicyCtrl'),
      })
      .state('app.polproc.policy.form', {
        url: '/manage',
        templateUrl: 'assets/views/policy/policy.form.html',
        title: 'Policy Document Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PolicyFormCtrl',
        resolve: loadSequence('PolicyFormCtrl'),
      })
      .state('app.polproc.policy.update', {
        url: '/:id/manage',
        templateUrl: 'assets/views/policy/policy.form.html',
        title: 'Policy Document Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PolicyUpdateCtrl',
        resolve: loadSequence('PolicyUpdateCtrl'),
      })
      .state('app.polproc.policy.approver', {
        url: '/:id/manage-approver',
        templateUrl: 'assets/views/policy/policyapprover.form.html',
        title: 'Policy Approver Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PolicyApproverCtrl',
        resolve: loadSequence('PolicyApproverCtrl'),
      })
      .state('app.polproc.policy.approverupdate', {
        url: '/:id/manage-approver/:approverId/',
        templateUrl: 'assets/views/policy/policyapprover.form.html',
        title: 'Policy Approver Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PolicyApproverUpdateCtrl',
        resolve: loadSequence('PolicyApproverUpdateCtrl'),
      })
      .state('app.polproc.policydocs', {
        url: '/policydocs',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.polproc.policydocs.main', {
        url: '',
        templateUrl: 'assets/views/policy/policydocs.html',
        title: 'Policy and Procedure Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PolicyDocsCtrl',
        resolve: loadSequence('PolicyDocsCtrl'),
      })
      .state('app.polproc.policydocs.form', {
        url: '/manage',
        templateUrl: 'assets/views/policy/policydocs.form.html',
        title: 'Policy and Procedure Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PolicyDocsFormCtrl',
        resolve: loadSequence('PolicyDocsFormCtrl'),
      })
      .state('app.polproc.policydocs.update', {
        url: '/:id/manage',
        templateUrl: 'assets/views/policy/policydocs.form.html',
        title: 'Policy and Procedure Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PolicyDocsUpdateCtrl',
        resolve: loadSequence('PolicyDocsUpdateCtrl'),
      })
      .state('app.polproc.policydocs.approver', {
        url: '/:id/manage-approver',
        templateUrl: 'assets/views/policy/policyapprover.form.html',
        title: 'Policy Approver Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PolicyDocsApproverCtrl',
        resolve: loadSequence('PolicyDocsApproverCtrl'),
      })
      .state('app.polproc.policydocs.approverupdate', {
        url: '/:id/manage-approver/:approverId/',
        templateUrl: 'assets/views/policy/policyapprover.form.html',
        title: 'Policy Approver Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PolicyDocsApproverUpdateCtrl',
        resolve: loadSequence('PolicyDocsApproverUpdateCtrl'),
      })

      /*
         ---- Remediations Routes ----
         */
      .state('app.mitigate', {
        url: '/mitigate',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.mitigate.remediations', {
        url: '/remediations',
        templateUrl: 'assets/views/mitigate/remediations.html',
        title: 'Remediations Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'RemediationsCtrl',
        resolve: loadSequence('RemediationsCtrl'),
      })
      .state('app.mitigate.findings', {
        url: '/findings',
        templateUrl: 'assets/views/mitigate/findings.html',
        title: 'Findings Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'FindingsCtrl',
        resolve: loadSequence('FindingsCtrl'),
      })

      /*
         ---- IT RISK Routes ----
         */
      .state('app.measure', {
        url: '/measure',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.measure.pentest', {
        url: '/penetration',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.measure.pentest.main', {
        url: '',
        templateUrl: 'assets/views/measure/penetration.html',
        title: 'Penetration Testing Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PenetrationCtrl',
        resolve: loadSequence('PenetrationCtrl'),
      })
      .state('app.measure.pentest.form', {
        url: '/manage',
        templateUrl: 'assets/views/measure/penetration.form.html',
        title: 'Penetration Testing Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PenetrationFormCtrl',
        resolve: loadSequence('PenetrationFormCtrl'),
      })
      .state('app.measure.pentest.update', {
        url: '/manage/:id',
        templateUrl: 'assets/views/measure/penetration.form.html',
        title: 'Penetration Testing Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PenetrationUpdateCtrl',
        resolve: loadSequence('PenetrationUpdateCtrl'),
      })
      .state('app.measure.vulner', {
        url: '/vulner',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.measure.vulner.main', {
        url: '',
        templateUrl: 'assets/views/measure/vulnerability.html',
        title: 'Vulnerability Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VulnerabilityCtrl',
        resolve: loadSequence('VulnerabilityCtrl'),
      })
      .state('app.measure.vulner.form', {
        url: '/manage',
        templateUrl: 'assets/views/measure/vulnerability.form.html',
        title: 'Vulnerability Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VulnerabilityFormCtrl',
        resolve: loadSequence('VulnerabilityFormCtrl'),
      })
      .state('app.measure.vulner.update', {
        url: '/manage/:id',
        templateUrl: 'assets/views/measure/vulnerability.form.html',
        title: 'Vulnerability Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VulnerabilityUpdateCtrl',
        resolve: loadSequence('VulnerabilityUpdateCtrl'),
      })

      .state('app.contact', {
        url: '/contact',
        templateUrl: 'assets/views/contactus.html',
        title: 'Contact Us',
        icon: 'ti-layout-media-left-alt',
        controller: 'ContactusCtrl',
        resolve: loadSequence('ContactusCtrl'),
      })
      .state('app.glossary', {
        url: '/glossary',
        templateUrl: 'assets/views/glossary.html',
        title: 'Glossary',
        icon: 'ti-layout-media-left-alt',
        controller: 'GlossaryCtrl',
        resolve: loadSequence('GlossaryCtrl'),
      })

      /*
       *   ---- App Utility Page Routes ----
       */
      .state('error', {
        url: '/error',
        template: '<div ui-view class="fade-in-up"></div>',
      })
      .state('error.404', {
        url: '/404',
        templateUrl: 'assets/views/utility_404.html',
      })
      .state('error.500', {
        url: '/500',
        templateUrl: 'assets/views/utility_500.html',
      })

      /* Login Page Routes */
      .state('login', {
        url: '/login',
        template: '<div ui-view class="fade-in-right-big smooth"></div>',
        abstract: true,
      })
      .state('login.signin', {
        url: '',
        templateUrl: 'assets/views/login.signin.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('LoginCtrl'),
      })
      .state('login.forgot', {
        url: '/forgot',
        templateUrl: 'assets/views/login_forgot.html',
      })
      .state('login.registration', {
        url: '/registration',
        templateUrl: 'assets/views/login_registration.html',
      })
      .state('login.lockscreen', {
        url: '/lock',
        templateUrl: 'assets/views/login_lock_screen.html',
      })

      /* Admin page url */

      .state('app.admin', {
        url: '/admin',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })

      /* Dashboard */
      .state('app.admin.dashboard', {
        url: '/dashboard',
        templateUrl: 'assets/views/admin/Dashboard/dashboard.main.html',
        title: 'Admin Dashboard',
        icon: 'ti-layout-media-left-alt',
        controller: 'adminDashboardCtrl',
        resolve: loadSequence('adminDashboardCtrl'),
      })

      /* Roles */
      .state('app.admin.roles', {
        url: '/roles',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.roles.main', {
        url: '',
        templateUrl: 'assets/views/admin/roles/role.main.html',
        title: 'Role Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'RolesMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('RolesMainCtrl'),
      })
      .state('app.admin.roles.add', {
        url: '/add',
        templateUrl: 'assets/views/admin/roles/role.add.html',
        title: 'Role Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'RolesAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('RolesAddCtrl'),
      })
      .state('app.admin.roles.update', {
        url: '/update/:id',
        templateUrl: 'assets/views/admin/roles/role.add.html',
        title: 'Role Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'RolesUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('RolesUpdateCtrl'),
      })

      /* Users Management */
      .state('app.admin.users', {
        url: '/users',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.users.main', {
        url: '',
        templateUrl: 'assets/views/admin/users/user.main.html',
        title: 'User Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'UsersMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('UsersMainCtrl'),
      })
      .state('app.admin.users.add', {
        url: '/add',
        templateUrl: 'assets/views/admin/users/user.add.html',
        title: 'User Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'UsersAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('UsersAddCtrl'),
      })
      .state('app.admin.users.update', {
        url: '/update/:userId',
        templateUrl: 'assets/views/admin/users/user.add.html',
        title: 'User Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'UsersUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('UsersUpdateCtrl'),
      })

      /* OWASP Management */
      .state('app.admin.owasp', {
        url: '/owasp',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.owasp.main', {
        url: '',
        templateUrl: 'assets/views/admin/owasp/owasp.main.html',
        title: 'OWASP Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'OwaspMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('OwaspMainCtrl'),
      })
      .state('app.admin.owasp.add', {
        url: '/add',
        templateUrl: 'assets/views/admin/owasp/owasp.add.html',
        title: 'OWASP Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'OwaspAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('OwaspAddCtrl'),
      })
      .state('app.admin.owasp.update', {
        url: '/update/:id',
        templateUrl: 'assets/views/admin/owasp/owasp.add.html',
        title: 'OWASP Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'OwaspUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('OwaspUpdateCtrl'),
      })

      /* ISACA GDPR Pre-Assessment Management */
      .state('app.admin.gdprpre', {
        url: '/gdprpre',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.gdprpre.preassessment', {
        url: '/preassessment',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.gdprpre.preassessment.main', {
        url: '',
        templateUrl: 'assets/views/admin/gdprpre/preassessment.main.html',
        title: 'Pre-Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PreAssessmentMgmCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('PreAssessmentMgmCtrl'),
      })
      .state('app.admin.gdprpre.preassessment.add', {
        url: '/add',
        templateUrl: 'assets/views/admin/gdprpre/preassessment.form.html',
        title: 'Pre-Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PreAssessmentMgmAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('PreAssessmentMgmAddCtrl'),
      })
      .state('app.admin.gdprpre.preassessment.update', {
        url: '/update/:id',
        templateUrl: 'assets/views/admin/gdprpre/preassessment.form.html',
        title: 'Pre-Assessment Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PreAssessmentMgmUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('PreAssessmentMgmUpdateCtrl'),
      })
      .state('app.admin.gdprpre.category', {
        url: '/category',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.gdprpre.category.main', {
        url: '',
        templateUrl: 'assets/views/admin/gdprpre/category.main.html',
        title: 'Category Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'CategoryMgmCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('CategoryMgmCtrl'),
      })
      .state('app.admin.gdprpre.category.add', {
        url: '/add',
        templateUrl: 'assets/views/admin/gdprpre/category.form.html',
        title: 'Category Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'CategoryMgmAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('CategoryMgmAddCtrl'),
      })
      .state('app.admin.gdprpre.category.update', {
        url: '/update/:id',
        templateUrl: 'assets/views/admin/gdprpre/category.form.html',
        title: 'Category Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'CategoryMgmUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('CategoryMgmUpdateCtrl'),
      })
      .state('app.admin.gdprpre.control', {
        url: '/control',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.gdprpre.control.main', {
        url: '',
        templateUrl: 'assets/views/admin/gdprpre/control.main.html',
        title: 'Control Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ControlMgmCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ControlMgmCtrl'),
      })
      .state('app.admin.gdprpre.control.add', {
        url: '/add',
        templateUrl: 'assets/views/admin/gdprpre/control.form.html',
        title: 'Control Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ControlMgmAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ControlMgmAddCtrl'),
      })
      .state('app.admin.gdprpre.control.update', {
        url: '/update/:id',
        templateUrl: 'assets/views/admin/gdprpre/control.form.html',
        title: 'Control Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ControlMgmUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ControlMgmUpdateCtrl'),
      })
      .state('app.admin.gdprpre.response', {
        url: '/response',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.gdprpre.response.main', {
        url: '',
        templateUrl: 'assets/views/admin/gdprpre/response.main.html',
        title: 'Response Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ResponseMgmCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ResponseMgmCtrl'),
      })
      .state('app.admin.gdprpre.response.add', {
        url: '/add',
        templateUrl: 'assets/views/admin/gdprpre/response.form.html',
        title: 'Response Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ResponseMgmAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ResponseMgmAddCtrl'),
      })
      .state('app.admin.gdprpre.response.update', {
        url: '/update/:id',
        templateUrl: 'assets/views/admin/gdprpre/response.form.html',
        title: 'Response Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ResponseMgmUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ResponseMgmUpdateCtrl'),
      })

      /* Risk Score Management */
      .state('app.admin.riskscore', {
        url: '/riskscore',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.riskscore.main', {
        url: '',
        templateUrl: 'assets/views/admin/riskscore/riskscore.main.html',
        title: 'Risk Score Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'RiskScoreMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('RiskScoreMainCtrl'),
      })
      .state('app.admin.riskscore.add', {
        url: '/add',
        templateUrl: 'assets/views/admin/riskscore/riskscore.add.html',
        title: 'Risk Score Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'RiskScoreAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('RiskScoreAddCtrl'),
      })
      .state('app.admin.riskscore.update', {
        url: '/update/:riskscoreId',
        templateUrl: 'assets/views/admin/riskscore/riskscore.add.html',
        title: 'Risk Score Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'RiskScoreUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('RiskScoreUpdateCtrl'),
      })

      /* Vendor Management */
      .state('app.admin.vendor', {
        url: '/vendor',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.vendor.main', {
        url: '',
        templateUrl: 'assets/views/admin/vendor/vendor.main.html',
        title: 'Vendor Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VendorMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('VendorMainCtrl'),
      })
      .state('app.admin.vendor.add', {
        url: '/add',
        templateUrl: 'assets/views/admin/vendor/vendor.add.html',
        title: 'Vendor Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VendorAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('VendorAddCtrl'),
      })
      .state('app.admin.vendor.update', {
        url: '/update/:vendorId',
        templateUrl: 'assets/views/admin/vendor/vendor.add.html',
        title: 'Vendor Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VendorUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('VendorUpdateCtrl'),
      })

      /* Department Management */
      .state('app.admin.dept', {
        url: '/dept',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.dept.main', {
        url: '',
        templateUrl: 'assets/views/admin/dept/dept.main.html',
        title: 'Department Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'DeptMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('DeptMainCtrl'),
      })
      .state('app.admin.dept.add', {
        url: '/add',
        templateUrl: 'assets/views/admin/dept/dept.add.html',
        title: 'Department Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'DeptAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('DeptAddCtrl'),
      })
      .state('app.admin.dept.update', {
        url: '/update/:id',
        templateUrl: 'assets/views/admin/dept/dept.add.html',
        title: 'Department Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'DeptUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('DeptUpdateCtrl'),
      })

      /* Vendor Risk Management */
      .state('app.admin.vendorrisk', {
        url: '/vendorrisk',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.vendorrisk.main', {
        url: '',
        templateUrl: 'assets/views/admin/vendorrisk/vendorrisk.stinfo.html',
        title: 'Vendor Risk Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VendorriskAdminStinfoCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('VendorriskAdminStinfoCtrl'),
      })
      .state('app.admin.vendorrisk.update', {
        url: '/update/:id',
        templateUrl:
          'assets/views/admin/vendorrisk/vendorrisk.stinfo.form.html',
        title: 'Vendor Risk Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'VendorriskAdminStinfoUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('VendorriskAdminStinfoUpdateCtrl'),
      })

      /*Journaling*/
      .state('app.admin.journaling', {
        url: '/journaling',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.journaling.main', {
        url: '',
        templateUrl: 'assets/views/admin/journaling/journaling.main.html',
        title: 'Journaling search',
        icon: 'ti-layout-media-left-alt',
        controller: 'JournalingMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('JournalingMainCtrl'),
      })

      /* Approver Hierarchy Management */
      .state('app.admin.approver', {
        url: '/approver',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.approver.main', {
        url: '',
        templateUrl: 'assets/views/admin/approver/approver.main.html',
        title: 'Approver Hierarchy',
        icon: 'ti-layout-media-left-alt',
        controller: 'ApproverMainCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ApproverMainCtrl'),
      })
      .state('app.admin.approver.add', {
        url: '/add',
        templateUrl: 'assets/views/admin/approver/approver.add.html',
        title: 'Approver Hierarchy',
        icon: 'ti-layout-media-left-alt',
        controller: 'ApproverAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ApproverAddCtrl'),
      })
      .state('app.admin.approver.update', {
        url: '/update/:aprId',
        templateUrl: 'assets/views/admin/approver/approver.add.html',
        title: 'Approver Hierarchy',
        icon: 'ti-layout-media-left-alt',
        controller: 'ApproverUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ApproverUpdateCtrl'),
      })
      .state('app.admin.approver.policyapprover', {
        url: '/manage-approver',
        templateUrl: 'assets/views/admin/approver/policyapprover.form.html',
        title: 'Policy Approver Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PolicyApproverCtrl',
        resolve: loadSequence('PolicyApproverCtrl'),
      })
      .state('app.admin.approver.policyapproverupdate', {
        url: '/manage-approver/:approverId/',
        templateUrl: 'assets/views/admin/approver/policyapprover.form.html',
        title: 'Policy Approver Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'PolicyApproverUpdateCtrl',
        resolve: loadSequence('PolicyApproverUpdateCtrl'),
      })

      /*
         ---- Assessment Generator Routes ----
         */
      .state('app.admin.assessment', {
        url: '/assessmentgen',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.assessment.main', {
        url: '/assessmentgenmanage',
        templateUrl: 'assets/views/admin/assessment/assessment.html',
        title: 'Assessment Generator',
        icon: 'ti-layout-media-left-alt',
        controller: 'AssessmentGenCtrl',
        controllerAs: 'assessmentGen',
        resolve: loadSequence('AssessmentGenCtrl'),
      })
      .state('app.admin.assessment.create', {
        url:
          '/assessmentgencreate/:title/:assessmentBy/:approver/:approvedDate/:assessmentsDate/:riskType/:docType/:period',
        templateUrl: 'assets/views/admin/assessment/assessment.create.html',
        title: 'Assessment',
        icon: 'ti-layout-media-left-alt',
        controller: 'AssessmentGenCreateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('AssessmentGenCreateCtrl'),
      })

      .state('app.admin.misc', {
        url: '/misc',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.misc.dynlist', {
        url: '/dynlist',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.misc.dynlist.main', {
        url: '/:dynTypeCode',
        templateUrl: 'assets/views/admin/dynlist/dynlist.main.html',
        title: 'Dynamic List Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'DynListMgmCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('DynListMgmCtrl'),
      })
      .state('app.admin.misc.dynlist.add', {
        url: '/add/:dynTypeCode/:dynTypeDesc',
        templateUrl: 'assets/views/admin/dynlist/dynlist.form.html',
        title: 'Dynamic List Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'DynListMgmAddCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('DynListMgmAddCtrl'),
      })
      .state('app.admin.misc.dynlist.update', {
        url: '/update/:id',
        templateUrl: 'assets/views/admin/dynlist/dynlist.form.html',
        title: 'Dynamic List Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'DynListMgmUpdateCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('DynListMgmUpdateCtrl'),
      })
      .state('app.admin.misc.artifact', {
        url: '/artifact',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.misc.artifact.main', {
        url: '',
        templateUrl: 'assets/views/admin/artifact/artifact.main.html',
        title: 'Artifact Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'ArtifactMgmCtrl',
        controllerAs: 'vm',
        resolve: loadSequence('ArtifactMgmCtrl'),
      })
      .state('app.admin.misc.ctrlDataUpload', {
        url: '/ctrlDataUpload',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.misc.ctrlDataUpload.main', {
        url: '',
        templateUrl: 'assets/views/admin/Misc/ctrlDataUpload.html',
        title: 'Control Data Upload',
        icon: 'ti-layout-media-left-alt',
        controller: 'adminCtrlDataUpload',
        resolve: loadSequence('adminCtrlDataUpload'),
      })

      /* Template Management */
      .state('app.admin.tmpUplds', {
        url: '/tmpUplds',
        template: '<div ui-view class="fade-in-up"></div>',
        abstract: true,
      })
      .state('app.admin.tmpUplds.main', {
        url: '',
        templateUrl: 'assets/views/admin/TemplateMmt/templateMgmt.main.html',
        title: 'Template Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'tmpUpldsCtrl',
        resolve: loadSequence('tmpUpldsCtrl'),
      })
      .state('app.admin.tmpUplds.add', {
        url: '/templateForm',
        templateUrl: 'assets/views/admin/TemplateMmt/templateMgmt.form.html',
        title: 'Template Management',
        icon: 'ti-layout-media-left-alt',
        controller: 'tmpUpldsFormCtrl',
        resolve: loadSequence('tmpUpldsFormCtrl'),
      });

    // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
    function loadSequence() {
      var _args = arguments;
      return {
        deps: [
          '$ocLazyLoad',
          '$q',
          function ($ocLL, $q) {
            var promise = $q.when(1);
            for (var i = 0, len = _args.length; i < len; i++) {
              promise = promiseThen(_args[i]);
            }
            return promise;

            function promiseThen(_arg) {
              if (typeof _arg === 'function') return promise.then(_arg);
              else
                return promise.then(function () {
                  var nowLoad = requiredData(_arg);
                  if (!nowLoad)
                    return $.error(
                      'Route resolve: Bad resource name [' + _arg + ']'
                    );
                  return $ocLL.load(nowLoad);
                });
            }

            function requiredData(name) {
              if (jsRequires.modules)
                for (var m in jsRequires.modules)
                  if (
                    jsRequires.modules[m].name &&
                    jsRequires.modules[m].name === name
                  )
                    return jsRequires.modules[m];
              return jsRequires.scripts && jsRequires.scripts[name];
            }
          },
        ],
      };
    }
  },
]);
