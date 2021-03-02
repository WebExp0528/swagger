'use strict';
/**
 * Clip-Two Main Controller
 */
app.controller('AppCtrl', function($rootScope, $scope, $state, $location, $localStorage, $window, $document, $timeout, cfpLoadingBar, APIHandler, AuthFactory, $filter) {
    $rootScope.adminState = false;
    // Loading bar transition
	// -----------------------------------
	var $win = $($window);
    $rootScope.$on("$locationChangeSuccess", function(event, url, oldUrl, state, oldState) {
        // 1) Check if localStorage has "UserStatus", and UserStatus is admin
        if($localStorage['UserState'] === 'admin'){
		 	$rootScope.adminState = true;
		}else{
            $rootScope.adminState = false;
		}


		var page_flag = false;
		var urlArray = ['dashboard', 'oprisk', 'itrisk', 'vendorrisk', 'audit', 'compliance', 'control', 'policy', 'remediations', 'admin'];
		for(var i = 0; i < urlArray.length; i++){
			if(url.indexOf('/#!/' + urlArray[i]) !== -1){
				page_flag = true;
				i = urlArray.length;
			}
		}
        if (page_flag && !AuthFactory.isLoggedIn()) {
            event.preventDefault();
            $location.path('/login');
        } else {
            //$location.path('/home');
        }
    });

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		// console.log(toState);
		// if(!$rootScope.app.IsAuthenticated && !toState.name === 'app.login') $state.go('app.login.signin');

		cfpLoadingBar.start();
		$rootScope.app.Mask = true;

		if ($rootScope.app.CurrentModal) {
            $rootScope.app.CurrentModal.dismiss();
    	}
	});

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		//stop loading bar on stateChangeSuccess
		event.targetScope.$watch("$viewContentLoaded", function() {

			cfpLoadingBar.complete();
		});

		// scroll top the page on change state
		$('#app .main-content').css({
			position : 'relative',
			top : 'auto'
		});

		$('footer').show();

		window.scrollTo(0, 0);

		if (angular.element('.email-reader').length) {
			angular.element('.email-reader').animate({
				scrollTop : 0
			}, 0);
		}

		// Save the route title
		$rootScope.currTitle = $state.current.title;
	});

	// State not found
	$rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
		//$rootScope.loading = false;
		console.log(unfoundState.to);
		// "lazy.state"
		console.log(unfoundState.toParams);
		// {a:1, b:2}
		console.log(unfoundState.options);
		// {inherit:false} + default options
	});

	$rootScope.pageTitle = function() {
		return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
	};

	// save settings to local storage
	if (angular.isDefined($localStorage.layout)) {
		$scope.app.layout = $localStorage.layout;

	} else {
		$localStorage.layout = $scope.app.layout;
	}
	$scope.$watch('app.layout', function() {
		// save to local storage
		$localStorage.layout = $scope.app.layout;
	}, true);

	$rootScope.$watch('app.Mask', function (nv, ov) {
		if (nv)
			$('.view-mask').show();
		else
			$('.view-mask').hide();
	});

	//global function to scroll page up
	$scope.toTheTop = function() {
		$document.scrollTopAnimated(0, 600);
	};

	// Function that find the exact height and width of the viewport in a cross-browser way
	var viewport = function() {
		var e = window, a = 'inner';
		if (!('innerWidth' in window)) {
			a = 'client';
			e = document.documentElement || document.body;
		}
		return {
			width : e[a + 'Width'],
			height : e[a + 'Height']
		};
	};
	// function that adds information in a scope of the height and width of the page
	$scope.getWindowDimensions = function() {
		return {
			'h' : viewport().height,
			'w' : viewport().width
		};
	};
	// Detect when window is resized and set some variables
	$scope.$watch($scope.getWindowDimensions, function(newValue, oldValue) {
		$scope.windowHeight = newValue.h;
		$scope.windowWidth = newValue.w;

		if (newValue.w >= 992) {
			$scope.isLargeDevice = true;
		} else {
			$scope.isLargeDevice = false;
		}
		if (newValue.w < 992) {
			$scope.isSmallDevice = true;
		} else {
			$scope.isSmallDevice = false;
		}
		if (newValue.w <= 768) {
			$scope.isMobileDevice = true;
		} else {
			$scope.isMobileDevice = false;
		}
	}, true);
	// Apply on resize
	$win.on('resize', function() {

		$scope.$apply();
		if ($scope.isLargeDevice) {
			$('#app .main-content').css({
				position : 'relative',
				top : 'auto',
				width: 'auto'
			});
			$('footer').show();
		}
	});

	/*
	   ----------------------------------------
		 Loading Lookup Collections
	   ----------------------------------------
	*/
	$rootScope.app.Lookup = {};
	APIHandler.Get('dynlisttypes').then(function(listTypes){

        listTypes.forEach(function (lt) {
            if(!$rootScope.app.Lookup.hasOwnProperty(lt.dylistTypecode))
                $rootScope.app.Lookup[lt.dylistTypecode] = [];
        });
		return APIHandler.Get('dynlists');
	}).then(function(dlist){
        dlist.forEach(function (li) {
            $rootScope.app.Lookup[li.dylistTypecode].push({ key: li.dylistCode, val: li.dylistDesc });
        });

        //added by Roma
        /*$rootScope.app.Lookup.LIST001.forEach(function (item) {
			if(item.val.indexOf('Asia') !== -1){
                item.key = 'Asia';
                item.val = 'Asia';
			}
            if(item.val.indexOf('EMEA') !== -1){
                item.key = 'South America';
                item.val = 'South America';
            }
        });*/
        ///////////////////////

        return APIHandler.Get('depts');
	}).then(function(depts){
		$rootScope.app.Lookup.Departments = depts ;
        return APIHandler.Get('users/usersdropdownlist');
	}).then(function(users){
		$rootScope.app.Lookup.Users = users;

		if(AuthFactory.isLoggedIn()){
            var userinfo = AuthFactory.getUserStatus();
            $rootScope.user.name = userinfo.username;

            /*var tmpary = $filter('filter')(users, {name: userinfo.username});

            APIHandler.Get('users/' + tmpary[0].id).then(function (res) {
            	$rootScope.currentUserInfo = res;
            });*/
        }

		return APIHandler.Get('roles');
	}).then(function(roles){
        $rootScope.app.Lookup.Roles = roles;
        return APIHandler.Get('assessmenttypes');
    }).then(function(ats){
		$rootScope.app.Lookup.AssessTypes = ats;
		return APIHandler.Get('assessmentdata/category');
	}).then(function(categories) {
		$rootScope.app.Lookup.Categories = categories;
	});

    $rootScope.currentUserInfo = AuthFactory.getUserInfo();
    /*console.log($rootScope.currentUserInfo);*/

	$rootScope.app.Lookup.Severity = [
        { key: 'Low', val: 'Low' },
    	{ key: 'Medium', val: 'Medium' },
        { key: 'High', val: 'High' }
	];

	/*
	  --- Lookup Glossary ---
	  LIST001 --- Region
 	  LIST002 --- Risk Period
	  LIST003 --- Risk Frequency
	  LIST004 --- Risk Status
	  LIST005 --- Priority
	  LIST006 --- Risk Impact
	  LIST007 --- Inherent Impact
	  LIST008 --- Control Category
	  LIST009 --- Risk Types
	  LIST010 --- Control Type
	  LIST011 --- Nature_of_Control
	  LIST012 --- Control Frequency
	  LIST013 --- Control Status
	  LIST014 --- Control Method
	  LIST015 --- Test Results
	  LIST016 --- Audit Status
	  LIST017 --- Document Types
	  LIST018 --- Artifact Types
	  LIST019 --- GDPR Classification
	  LIST020 --- NYDFS Classification
	  LIST021 --- Asset Classification
	  LIST022 --- Asset Infrastructure
	  LIST023 --- Information Classification
	  LIST024 --- Information Asset Type
	  LIST025 --- Information Handling
	  LIST026 --- IT Risk Category
	  LIST027 --- OP Risk Category
	  LIST028 --- Risk Profile Risk Category
	  Departments --- Departments
	  Users --- Users
	  Severity --- Severity
	  AssessTypes --- Assessment Types
	  LIST033 --- Audit Phases
	*/


	//Setup Custom Colors for High Charts
    // Highcharts.setOptions({
    //     colors: ['#E20D01', '#B49400', '#EDA300', '#1372DF', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#0FF900']
    // });


	/*
	* User's event handling
	* */

    // When click "Admin" link for admin page on User's page
    // 1) localStorage <- UserStatus:admin
    // 2) Goto /admin/dashboard page

	$scope.gotoAdminPage = function(){
    	$localStorage['UserState'] = 'admin';
        $state.go('app.admin.dashboard');
	};

    // When click "Main" link for dashboard page on Admin's page
    // 1) localStorage <- UserStatus:user
    // 2) Goto /dashboard page

    $scope.gotoUserDashboard = function(){
        $localStorage['UserState'] = 'user';
        $state.go('app.dashboard.main');
    };

    $scope.doLogout = function () {
    	AuthFactory.logout();
        $state.go('login.signin');
    };
});
