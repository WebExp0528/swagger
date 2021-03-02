(function () {
    PenTestController.$inject = ['$scope', '$rootScope', '$state', '$filter', 'MeasureService', 'Utils'];
    app.controller('PenetrationCtrl', PenTestController);

    function PenTestController($scope, $rootScope, $state, $filter, MeasureService, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add Edit Search & Delete Penetration Tests";

        $scope.OpList = [5, 10, 25, 50, 100];
        $scope.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'filename',
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
        $scope.$watch('Grid1.Filter', function(n, o){
            var searchedData = $filter('filter')($scope.Grid1.Data, $scope.Grid1.Filter);
            $scope.Grid1.Total = searchedData.length;
        });

        loadFiles();

        $scope.OpList2 = [5, 10, 25, 50, 100];
        $scope.Grid2 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'issue',
            IsAsc: true,
            Filter: "",
            Total: 0,
            Data: [],
            SortMe: function(col){
                if($scope.Grid2.Column === col)
                    $scope.Grid2.IsAsc = !$scope.Grid2.IsAsc;
                else
                    $scope.Grid2.Column = col;
            },
            GetIco: function(col){
                if($scope.Grid2.Column === col){
                    return $scope.Grid2.IsAsc? 'fa-sort-up' : 'fa-sort-down';
                } else {
                    return 'fa-unsorted';
                }
            }
        };
        $scope.$watch('Grid2.Filter', function(n, o){
            var searchedData = $filter('filter')($scope.Grid2.Data, $scope.Grid2.Filter);
            $scope.Grid2.Total = searchedData.length;
        });

        loadPenTest();

        $scope.deletePenTest = function(p){
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                $rootScope.app.Mask = true;
                MeasureService.DeletePenTest(p.id).then(function(data){
                    if(data.status===200) loadPenTest();
                }, function(err){
                    $rootScope.app.Mask = false
                });
            });
        };

        $scope.downloadFile = function(p){
            $rootScope.app.Mask = true;
            console.log("File: ", p);
            MeasureService.FileDownloadPenTest(p.id).then(function(data){
                if(data.status===200) {
                    loadFiles();
                }
            }, function(err){
                $rootScope.app.Mask = false
            });
        };

        $scope.uploadFile = function() {
            var fileModel = $scope.VM.files;
            var d = new Date();
            var idd = 'PenTest-TestPlan' + d.getTime();
            $scope.VM.key = idd;

            MeasureService.FileUploadPenTest(idd, fileModel).then(function(res){
                if(res.status === 200) {
                    for (var i in fileModel) {
                        fileModel[i].id = res.data.fileId;
                        fileModel[i].filePath = res.data.path;
                    }

                    loadFiles();
                }
            })
        };

        function loadFiles(){
            MeasureService.GetFilesPenTest("PenTest-TestPlan")
                .then(function(data) {
                    $scope.Grid1.Total = data.length;
                    $scope.Grid1.Data = data;
                    $rootScope.app.Mask = false;
                });
        }

        function loadPenTest(){
            MeasureService.GetPenTest($scope.PerPage, $scope.CurrPage)
                .then(function(data) {
                    var dtype = 'YYYY-MM-DD';
                    var d1 = moment(data.createdOn);
                    var d2 = moment(data.modifiedOn);
                    var d3 = moment(data.testDate);
                    var d4 = moment(data.startDate);
                    var d5 = moment(data.endDate);
                    data.createdOn = (d1.isValid()) ? d1.format(dtype) : '';
                    data.modifiedOn = (d2.isValid()) ? d2.format(dtype) : '';
                    data.testDate = (d3.isValid()) ? d3.format(dtype) : '';
                    data.startDate = (d4.isValid()) ? d4.format(dtype) : '';
                    data.endDate = (d5.isValid()) ? d5.format(dtype) : '';
                    data.createonDtStr = data.createdOn;
                    data.modifiedonDtStr = data.modifiedOn;
                    data.testDtStr = data.testDate;
                    data.startDtStr = data.startDate;
                    data.endDtStr = data.endDate;
                    $scope.Grid2.Total = data.length;
                    $scope.Grid2.Data = data;
                    $rootScope.app.Mask = false;
                });
        }
    }
})();
