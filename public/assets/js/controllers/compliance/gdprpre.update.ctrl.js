(function () {
    "use strict";

    GDPRPreAssessmentUpdateController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$filter', 'GDPRPreService', 'Utils'];
    app.controller('GDPRPreAssessmentUpdateCtrl', GDPRPreAssessmentUpdateController);

    function GDPRPreAssessmentUpdateController($scope, $rootScope, $state, $stateParams, $filter, GDPRPreService, Utils) {

        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Update GDPR Pre-Assessement";
        $scope.currPage = 'update';
                
        $scope.controls = {};
        $scope.categories = {};
        $scope.responses = {};
        
        $scope.buttons = [{id: 1, name: 'Fully Achieved'},
			{id: 2, name: 'Largely Achieved'},
			{id: 3, name: 'Partially Achieved'},
			{id: 4, name: 'Not Achieved'}];
        
        $rootScope.app.Mask = true;
        
        $scope.Form = {};
        
        $scope.OpList = [5, 10, 25, 50, 100];
        $scope.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'assessmentId',
            IsAsc: false,
            Filter: "",
            Total: 0,
            Data: [],
            SortMe: function(col){
                if($scope.Grid1.Column === col)
                    $scope.Grid1.IsAsc = !$scope.Grid1.IsAsc;
                else
                    $scope.Grid1.Column = col;
            },
            GetIco: function(col){
                if($scope.Grid1.Column === col){
                    return $scope.Grid1.IsAsc? 'fa-sort-up' : 'fa-sort-down';
                } else {
                    return 'fa-unsorted';
                }
            }
        };

        $scope.$watch('Grid1.Filter', function(n, o){
            var searchedData = $filter('filter')($scope.Grid1.Data, $scope.Grid1.Filter);
            $scope.Grid1.Total = searchedData.length;
        });

        loadData();
        
        $scope.submitAction = function () {
            if ($scope.Form.PreAssessment.$invalid) return false;

            var dtype = 'YYYY-MM-DD';
            var d1 = moment($scope.VM.completionDate);
            $scope.VM.completionDate = (d1.isValid()) ? d1.format(dtype) : '';
            $scope.VM.completionDtStr = $scope.VM.completionDate;
            
            var good = 0;
            var some = 0;
            var many = 0;
            var serious = 0;
            
            console.log("length: ", $scope.VM.categoryData.length);
            for (var i = 0; i < $scope.VM.categoryData.length; i++) {
            	switch($scope.VM.categoryData[i].response) {
            		case "Fully Achieved":
            			good++;
            			break;
            		case "Largely Achieved":
            			some++;
            			break;
            		case "Partially Achieved":
            			many++;
            			break;
            		case "Not Achieved":
            			serious++;
            			break;
            		case "Skipped":
            		case "Not Applicable":
            			break;
            		default:
            			console.log("Unknown response: ", $scope.VM.categoryData[i].response);
            			break;
            	}
            }
            
            if (good != $scope.VM.categoryData.inGoodCondition) {
            	$scope.VM.inGoodCondition = good;
            }
            if (some != $scope.VM.categoryData.someAreasToImprove) {
            	$scope.VM.someAreasToImprove = some;
            }
            if (many != $scope.VM.categoryData.inGoodCondition) {
            	$scope.VM.manyAreasToImprove = many;
            }
            if (serious != $scope.VM.categoryData.inGoodCondition) {
            	$scope.VM.needsASeriousLook = serious;
            }

        	GDPRPreService.Put($stateParams.id, $scope.VM).then(function (res) {
                console.log('res', res);
            }).finally(function () {
                $state.go('app.compliance.gdprpre.main');
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.PreAssessment.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function(){
                    $state.go('app.compliance.gdprpre.main');
                });
                return false;
            }
            $state.go('app.compliance.gdprpre.main');
        };
        
        function reset() {
        	$scope.selectedButton = $scope.buttons[0];
	        $scope.statement = 0;
			$scope.answered = 0;
			$scope.skipped = 0;
			$scope.notapplicable = 0;
			$scope.total = getTotalNumberControls();
			$scope.showResults = true;
			$scope.assessmentOver = true;
			$scope.inProgress = false;
        }
        
        $scope.startAssessment = function(id) {
			$scope.id = id;
			$scope.assessmentOver = false;
			$scope.inProgress = true;
			$scope.prevOn = true;
			$scope.nextOn = true;
			$scope.review = true;
			if ($scope.VM.answered != 0) {
				$scope.answered = $scope.VM.answered;
			}
			if ($scope.VM.skipped != 0) {
				$scope.skipped = $scope.VM.skipped;
			}
			if ($scope.VM.notApplicable != 0) {
				$scope.notapplicable = $scope.VM.notApplicable;
			}
			$scope.getControl();
		};

		$scope.reset = function() {
			reset();
		}

		function loadData() {
        	GDPRPreService.GetCategory().then(function(data) {
        		$scope.categories = data;
        		return GDPRPreService.GetResponse();
        	}).then(function(data) {
        		$scope.responses = data;
        		return GDPRPreService.GetControl();
        	}).then(function(data) {
        		$scope.controls = data;
        		
        		reset();
        		return GDPRPreService.GetOne($stateParams.id);
        	}).then(function(data) {
        		$scope.VM = data;
        		
        		var dtype = 'MM-DD-YYYY';
        		var d1 = moment($scope.VM.completionDate);
                $scope.VM.completionDate = (d1.isValid()) ? d1.format(dtype) : '';
                $scope.VM.completionDtStr = $scope.VM.completionDate;
                
                populateAssessmentId();
                $scope.Grid1.Total = $scope.VM.categoryData.length;
                $scope.Grid1.Data = $scope.VM.categoryData;
        	});
        };
        
        $scope.setButton = function(btn){
			$scope.selectedButton = btn;
			//console.log("button name: ", btn.name);
			//console.log("response #1: ", $scope.VM.categoryData[$scope.id].response);
			if ($scope.VM.categoryData[$scope.id].response != "") {
				if ($scope.VM.categoryData[$scope.id].response == "Not Applicable") {
					$scope.VM.notApplicable--;
					$scope.notapplicable--;
				} else if ($scope.VM.categoryData[$scope.id].response == "Skipped") {
					$scope.VM.skipped--;
					$scope.skipped--;
				}
			}
			//console.log("isFullyAchieved: ", $scope.VM.categoryData[$scope.id].response == "Fully Achieved");
			//console.log("isLargelyAchieved: ", $scope.VM.categoryData[$scope.id].response == "Largely Achieved");
			//console.log("isPartiallyAchieved: ", $scope.VM.categoryData[$scope.id].response == "Partially Achieved");
			//console.log("isNotAchieved: ", $scope.VM.categoryData[$scope.id].response == "Not Achieved");
			if ($scope.VM.categoryData[$scope.id].response != "Fully Achieved" || $scope.VM.categoryData[$scope.id].response != "Largely Achieved" ||
					$scope.VM.categoryData[$scope.id].response != "Partially Achieved" || $scope.VM.categoryData[$scope.id].response != "Not Achieved" ||
					$scope.VM.categoryData[$scope.id].response == "") {
				if ($scope.VM.categoryData[$scope.id].response == "") {
					$scope.VM.answered++;
					$scope.answered++;
				}
				$scope.VM.categoryData[$scope.id].response = btn.name;
				//console.log("button name: ", btn.name);
				//console.log("response changed to: ", $scope.VM.categoryData[$scope.id].response);
			}
			
			$scope.nextOn = false;
		};
		
		$scope.skipQuestion = function() {
			console.log("Skipped Button Pressed!");
			console.log("response #2: ", $scope.VM.categoryData[$scope.id].response);
			if ($scope.VM.categoryData[$scope.id].response != "") {
				if ($scope.VM.categoryData[$scope.id].response == "Not Applicable") {
					$scope.VM.notApplicable--;
					$scope.notapplicable--;
				} else if ($scope.VM.categoryData[$scope.id].response == "Fully Achieved" || $scope.VM.categoryData[$scope.id].response == "Largely Achieved" ||
						$scope.VM.categoryData[$scope.id].response == "Partially Achieved" || $scope.VM.categoryData[$scope.id].response == "Not Achieved") {
					$scope.VM.answered--;
					$scope.answered--;
				}
			}
			if ($scope.VM.categoryData[$scope.id].response != "Skipped" || $scope.VM.categoryData[$scope.id].response == "") {
				$scope.VM.skipped++;
				$scope.skipped++;
				$scope.VM.categoryData[$scope.id].response = "Skipped";
				$scope.VM.categoryData[$scope.id].responseDescription = "Please select a response of Fully Achieved, Largely Achieved, Partially Achieved, Not Achieved or Not Applicable.";
			}
		};
		
		$scope.naQuestion = function() {
			console.log("Not Applicable Button Pressed!");
			console.log("response #3: ", $scope.VM.categoryData[$scope.id].response);
			if ($scope.VM.categoryData[$scope.id].response != "") {
				if ($scope.VM.categoryData[$scope.id].response == "Skipped") {
					$scope.VM.skipped--;
					$scope.skipped--;
				} else if ($scope.VM.categoryData[$scope.id].response == "Fully Achieved" || $scope.VM.categoryData[$scope.id].response == "Largely Achieved" ||
						$scope.VM.categoryData[$scope.id].response == "Partially Achieved" || $scope.VM.categoryData[$scope.id].response == "Not Achieved") {
					$scope.VM.answered--;
					$scope.answered--;
				}
			}
			if ($scope.VM.categoryData[$scope.id].response != "Not Applicable" || $scope.VM.categoryData[$scope.id].response == "") {
				$scope.VM.notApplicable++;
				$scope.notapplicable++;
				$scope.VM.categoryData[$scope.id].response = "Not Applicable";
				$scope.VM.categoryData[$scope.id].responseDescription = "The control does not apply to your company or department.";
			}
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
				$scope.review = false;
				$scope.nextOn = true;
				$scope.assessmentOver = false;
			}
			
			if ($scope.id > 0) {
				$scope.prevOn = false;
			}
		};
		
		$scope.getControl = function() {
			console.log("id: ", $scope.id);
			var c = getControl($scope.id);
			if(c) {
				$scope.controlName = c.controlName;
				$scope.controlStatement = c.controlStatement;
				$scope.statement = $scope.id + 1;
			} else {
				$scope.assessmentOver = true;
		        $scope.showResults = true;
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
        
        function populateControlData() {
        	for (var i = 0; i < getTotalNumberControls(); i++) {
        		$scope.VM.categoryData.push({"categoryName": $scope.controls[i].categoryName, "categoryDescription": "",
        			"controlName": $scope.controls[i].controlName, "controlStatement": $scope.controls[i].controlStatement, "response": "",
        			"responseDescription": "", "finding": ""})
        	}
        };
        
        function populateAssessmentId() {
        	for (var i = 0; i < getTotalNumberControls(); i++) {
        		for (var j = 0; j < getTotalNumberControls(); j++) {
	        		if ($scope.VM.categoryData[i].controlName == $scope.controls[j].controlName) {
	        			$scope.VM.categoryData[i].assessmentId = $scope.controls[j].controlId;
	        		}
        		}
        	}
        };
        
        function populateCategoryData() {
    		for (var i = 0; i < getTotalNumberControls(); i++) {
    			for (var j = 0; j < $scope.categories.length; j++) {
	        		if ($scope.categories[j].name == $scope.VM.categoryData[i].categoryName) {
	        			$scope.VM.categoryData[i].categoryDescription = $scope.categories[j].description;
	        		}
	        	}
    		}
        };
        
        function populateResponseData() {
    		for (var i = 0; i < getTotalNumberControls(); i++) {
    			for (var k = 0; k < $scope.responses.length; k++) {
	        		if (($scope.responses[k].name == $scope.VM.categoryData[i].response) && ($scope.responses[k].controlName == $scope.VM.categoryData[i].controlName)) {
	        			$scope.VM.categoryData[i].responseDescription = $scope.responses[k].description;
	        		}
	        	}
    		}
        };
        
        $scope.reviewAssessment = function() {
        	console.log("Clicked Review Assessment!");
        	$scope.inProgress = false;
	        $scope.assessmentOver = true;
	        if ($scope.showResults == false) {
	        	$scope.showResults = true;
	        }
	        populateResponseData();
	        $scope.Grid1.Total = $scope.VM.categoryData.length;
            $scope.Grid1.Data = $scope.VM.categoryData;
        };
        
        $scope.reviseAssessment = function(id) {
        	console.log("Clicked REVISE! - ID: ", id);
        	//reset();
        	$scope.showResults = false;
			$scope.assessmentOver = false;
			$scope.inProgress = true;
        	$scope.Grid1.Total = 0;
        	$scope.Grid1.Data = [];
        	$scope.startAssessment(id - 1);
        	$scope.review = false;
        }
        
        $scope.downloadExcel = function() {
        	var data = {};
            data.heights = [];
            data.sheetName = "GDPR Pre-Assessment";
            data.body = [];
            var asset_data = [
                [
                    "Assessment Name",
                    angular.isUndefined($scope.VM.assessmentName)? "" : $scope.VM.assessmentName + "",
                    "",
                    "Assessment Description",
                    angular.isUndefined($scope.VM.assessmentDescription)? "" : $scope.VM.assessmentDescription + "",
                ],
                [
                    "Assessment By",
                    angular.isUndefined($scope.VM.assessmentBy)? "" : $scope.VM.assessmentBy + "",
                    "",
                    "Period",
                    angular.isUndefined($scope.VM.assessmentPeriod)? "" : $scope.VM.assessmentPeriod + "",
                ],
                [
                    "Department",
                    angular.isUndefined($scope.VM.department)? "" : $scope.VM.department + "",
                    "",
                    "Completion Date",
                    angular.isUndefined($scope.VM.completionDate)? "" : $scope.VM.completionDate + "",
                ]
            ];

            for(var i=0; i<asset_data.length; i++){
                for(var j=0; j<=4; j++){
                    data.body.push({
                        col: (+j+4),
                        row: (+i+2),
                        text: asset_data[i][j],
                        font: {name: 'Calibri', sz: '11', family: '3', scheme: '-', bold: 'true',iter:'true'},
                        fill: {type: 'solid', fgColor: 'adadad'},
                        border: {left: 'thin', top: 'thin', right: 'thin', bottom: 'thin'},
                        wrap: 'true',
                        align:'center'
                    });
                }
                data.heights.push({row: (+i+2), height: 30});
            }

            var head_txt = [
                'ID',
                'Category Name',
                'Category Description',
                'Control Name',
                'Control Statement',
                'Response',
                'Response Description',
                'Finding'
            ];
            for (var i = 0; i < head_txt.length; i++) {
                data.body.push({
                    col: (+i + 2),
                    row: 6,
                    text: head_txt[i],
                    font: {name: 'Calibri', sz: '11', family: '3', scheme: '-'},
                    fill: {type: 'solid', fgColor: '99b8ca'},
                    border: {left: 'thin', top: 'thin', right: 'thin', bottom: 'thin'},
                    wrap: 'true'
                });
            }
            data.heights.push({row: 6, height: 30});

            var num = 7;
            var newObj = []

            angular.forEach($scope.VM.categoryData, function (obj) {
                newObj.push([
                	obj.assessmentId,
                	obj.categoryName,
                	obj.categoryDescription,
                	obj.controlName,
                	obj.controlStatement,
                	obj.response,
                	obj.responseDescription,
                	obj.finding
                ]);
                num++;
            });
            
            data.commonData = {
                data: newObj,
                font: {name: 'Calibri', sz: '11', family: '2', scheme: '-'},
                border: {left: 'thin', top: 'thin', right: 'thin', bottom: 'thin'},
                wrap: 'true',
                height: 60,
                srow: 7,
                scol: 2
            };

            data.cols = 10;
            data.rows = num * 1 + 2;

            var wval = [10, 5, 30, 60, 30, 60, 15, 60, 20, 15];
            data.widths = [];
            for (var i = 0; i < wval.length; i++) {
                data.widths.push({col: +i + 1, width: wval[i]});
            }
            
            GDPRPreService.DownloadExcel(data).then(function (response) {
                var nodeUrl = $rootScope.app.NodeApi;
                location.assign(nodeUrl+ '/downloadExcel/' + response.data);
            }).catch(function (error) {
                console.log('error!');
            });
        };
        
        $rootScope.app.Mask = false;
    }
})();
