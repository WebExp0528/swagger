(function(){
    CtrlDataUploadController.$inject = ['$scope', '$rootScope', '$state', '$filter', 'ControlService', 'ControlDataUploadLogService', 'Utils'];
    app.controller('adminCtrlDataUpload', CtrlDataUploadController);

    function CtrlDataUploadController($scope, $rootScope, $state, $filter, ControlService, ControlDataUploadLogService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Control Data Upload";

        $scope.OpList = [5, 10, 25, 50, 100];
        $scope.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'riskName',
            IsAsc: true,
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

        $scope.VM = {
            fileName: '',
            createdBy: '',
            createdOn: '',
            uploadStatus: '',
            noOfRecords: ''
        };

        $scope.$watch('Grid1.Filter', function(n, o){
            var searchedData = $filter('filter')($scope.Grid1.Data, $scope.Grid1.Filter);
            $scope.Grid1.Total = searchedData.length;
        });
        
        loadPage();

        $scope.submitAction = function () {
            var filename = ($scope.FileModel[0].fileName + "");
            s = filename.substr(filename.length - 4, filename.length);
            if(s !== ".xls"){
                alert('you must select .xls file!');
                angular.element($('input:file[name = fileupload]')).val('');
                return;
            }
            var current_user = $('.dropdown.current-user .username').text();
            var date = new Date();
            var current_date = Utils.createDate(date);
            /*console.log($scope.VM);
            loadPage($scope.VM);
            return;*/
            var fileModel = $scope.FileModel;
            var d = new Date();
            var idd = 'Ctrls' + d.getTime();
            $scope.VM.key = idd;
            ControlService.ImportControls(idd, fileModel).then(function(res) {
            	if (res.status == 200) {
        			console.log("Controls imported!: " + res);
        			
        			$scope.VM.fileName = filename;
		            $scope.VM.createdBy = current_user;
		            $scope.VM.createdOn = current_date;
		            $scope.VM.uploadStatus = res.data.Status;
		            $scope.VM.noOfRecords = res.data.Records;
		            
                	ControlDataUploadLogService.AddRepo($scope.VM).then(function(res) {
                		if (res.status == 200) {
                			console.log("Control Data Upload Log updated!")
                			loadPage();
                		}
                	});
        		}
            }).finally(function () {
            	$state.go('app.admin.misc.ctrlDataUpload.main');
            });
        };

        function loadPage(data){
        	$rootScope.app.Mask = true;
        	ControlDataUploadLogService.GetRepos($scope.PerPage, $scope.CurrPage).then(function(data) {
        		$scope.Grid1.Total = data.length;
                $scope.Grid1.Data = data;
                
                $rootScope.app.Mask = false;
        	});
        }
    }
})();