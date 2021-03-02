(function () {
    "use strict";

    GDPRPreAssessmentCreateCtrl.$inject = ['$scope', '$rootScope', '$state', '$filter', '$uibModal', 'GDPRPreService', 'ChartFactory', 'Utils'];
    app.controller('GDPRPreAssessmentCreateCtrl', GDPRPreAssessmentCreateCtrl);

    function GDPRPreAssessmentCreateCtrl($scope, $rootScope, $state, $filter, $uibModal, GDPRPreService, ChartFactory, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "GDPR Pre-Assessments";
        
        $rootScope.app.Mask = true;
        
        $scope.controls = {};
        
        $scope.buttons = [{id: 1, name: 'FULLY ACHIEVED'},
			{id: 2, name: 'LARGELY ACHIEVED'},
			{id: 3, name: 'PARTIALLY ACHIEVED'},
			{id: 4, name: 'NOT ACHIEVED'}];
        
        $scope.completed = 0;

        getControls();
        
        function getControls() {
        	GDPRPreService.GetControl().then(function(data) {
        		$scope.controls = data;
        		
        		populateCategoryData();
        		reset();
        		
        		$scope.id = 0;
        		$scope.assessmentOver = false;
        		$scope.inProgress = true;
        		$scope.prevOn = true;
        		$scope.nextOn = true;
        		$scope.review = true;
        		$scope.getControl();
        	});
        }
        
        function getQuestion(id) {
			if(id < $scope.questions.length) {
				return $scope.questions[id];
			} else {
				return false;
			}
		}
        
        function getTotalNumberQuestions() {
        	return $scope.questions.length;
        };
        
        function reset() {
        	$scope.selectedButton = $scope.buttons[0];
	        $scope.statement = 0;
			$scope.responses = 0;
			$scope.skipped = 0;
			$scope.notapplicable = 0;
			$scope.total = getTotalNumberControls();
	        $scope.inProgress = true;
	        $scope.assessmentOver = false;
	        $scope.btnClicked = false;
        }
        
        /*$scope.start = function() {
			$scope.id = 0;
			$scope.assessmentOver = false;
			$scope.inProgress = true;
			$scope.prevOn = true;
			$scope.nextOn = true;
			$scope.getControl();
		};*/

		$scope.reset = function() {
			reset();
	        
			//getControls();
			
	        //$rootScope.app.Mask = false;
		}
		
		$scope.getQuestion = function() {
			var q = getQuestion($scope.id);
			if(q) {
				$scope.question = q.question;
				$scope.options = q.options;
				/*$scope.answer = q.answer;*/
				$scope.answerMode = true;
				$scope.statement = $scope.id + 1;
			} else {
				$scope.assessmentOver = false;
				$scope.completed++; 
			}
		};
		
		$scope.setButton = function(btn){
			$scope.selectedButton = btn;
			
			if ($scope.btnClicked) {
				$scope.responses--;
				$scope.btnClicked = false;
				$scope.nextOn = true;
			} else if (!$scope.btnClicked) {
				$scope.responses++;
				$scope.btnClicked = true;
				$scope.nextOn = false;
			}
		};
		
		$scope.skipQuestion = function() {
			/**/
		};
		
		$scope.naQuestion = function() {
			/**/
		};
		
		$scope.prevQuestion = function() {
			$scope.id--;
			if ($scope.id <= 0) {
				$scope.id = 0;
				$scope.prevOn = true;
			}
			$scope.getControl();
		};

		$scope.nextQuestion = function() {
			$scope.id++;
			$scope.getControl();
			
			if ($scope.id >= $scope.total) {
				$scope.id = $scope.total;
				$scope.answerMode = false;
				$scope.review = false;
				$scope.nextOn = true;
			}
			
			if ($scope.id > 0) {
				$scope.prevOn = false;
			}
		};
		
		$scope.getControl = function() {
			var c = getControl($scope.id);
			if(c) {
				$scope.controlName = c.controlName;
				$scope.controlStatement = c.controlStatement;
				/*$scope.answer = q.answer;*/
				$scope.answerMode = true;
				$scope.statement = $scope.id + 1;
			} else {
				$scope.assessmentOver = true;
				$scope.completed++; 
			}
		};
		
		function getControl(id) {
        	if(id < $scope.controls.length) {
				return $scope.controls[id];
			} else {
				return false;
			}
        };
        
        function getTotalNumberControls() {
        	return $scope.controls.length;
        };
        
        function populateCategoryData(data) {
        	if (typeof $rootScope.VM !== 'undefined') {
	        	for (var i = 0; i < getTotalNumberControls(); i++) {
	        		$rootScope.VM.categoryData.push({"categoryName": $scope.controls[i].categoryName, "categoryDescription": "",
	        			"controlName": $scope.controls[i].controlName, "controlStatement": $scope.controls[i].controlStatement, "response": "",
	        			"responseDescription": "", "finding": ""})
	        	}
        	}
        };
        
        $scope.reviewAssessment = function() {
        	console.log("Clicked Review Assessment!");
        	$state.go('app.compliance.gdprpre.create');
        };
        
        $scope.reset();
        
        $rootScope.app.Mask = false;
    }
})();
