(function () {
    "use strict";

    AssetInventorysMainCtrl.$inject = ['$scope', '$rootScope', '$state', '$filter', '$uibModal', 'DataInventoryService', 'Utils'];
    app.controller('AssetInventoryMainCtrl', AssetInventorysMainCtrl);

    function AssetInventorysMainCtrl($scope, $rootScope, $state, $filter, $uibModal, DataInventoryService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add Edit Search & Delete & Download Asset Inventories";

        vm.OpList = [5, 10, 25, 50, 100];
        vm.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'assetName',
            IsAsc: true,
            Filter: "",
            Total: 1,
            Data: [],
            SortMe: function (col) {
                if (vm.Grid1.Column === col)
                    vm.Grid1.IsAsc = !vm.Grid1.IsAsc;
                else
                    vm.Grid1.Column = col;
            },
            GetIco: function (col) {
                if (vm.Grid1.Column === col) {
                    return vm.Grid1.IsAsc ? 'fa-sort-up' : 'fa-sort-down';
                } else {
                    return 'fa-unsorted';
                }
            }
        };
        $scope.$watch('vm.Grid1.Filter', function (n, o) {
            var searchedData = $filter('filter')(vm.Grid1.Data, vm.Grid1.Filter);
            vm.Grid1.Total = searchedData.length;
        });

        DataInventoryService.GetAsset($scope.PerPage, $scope.CurrPage).then(function (data) {
        	vm.Grid1.Total = data.length;
            vm.Grid1.Data = data;

            $rootScope.app.Mask = false;
        });

        vm.deleteAction = function (r) {
        	var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                $rootScope.app.Mask = true;
                var rowId = r.id;
                DataInventoryService.DeleteAsset(r.id).then(function (data) {
                    if (data.status === 200){
                        vm.Grid1.Total--;
                        for(var i in vm.Grid1.Data){
                            if(vm.Grid1.Data[i].id === rowId){
                                delete vm.Grid1.Data[i];
                            }
                        }
                        $rootScope.app.Mask = false;
                    }
                });
            });
        };
        
        $scope.selectAll = function () {
            var chk = $scope.all_check;
            console.log("chk: ", chk);
            angular.forEach(vm.Grid1.Data, function (value, key) {
                value.checked = chk;
            });
        }
        
        vm.downloadAssets = function() {
        	var data = {};
            data.heights = [];
            data.sheetName = "Asset Inventory";
            data.body = [];

            var head_txt = [
                'Asset ID',
                'Asset Name',
                'Business Owner',
                'Technology Owner',
                'Region',
                'Department',
                'Environment',
                'Operating System',
                'Asset Classification',
                'Infrastructure',
                'Information Classification',
                'Information Asset Type',
                'Information Handling',
                'Risk Rating',
                'Vendor Application',
                'SOX',
                'FDICIA',
                'GDPR',
                'ISO 27000',
                'COBIT',
                'NIST'
            ];
            for (var i = 0; i < head_txt.length; i++) {
                data.body.push({
                    col: (+i + 2),
                    row: 3,
                    text: head_txt[i],
                    font: {name: 'Calibri', sz: '11', family: '3', scheme: '-', bold: 'true'},
                    fill: {type: 'solid', fgColor: '99b8ca'},
                    border: {left: 'thin', top: 'thin', right: 'thin', bottom: 'thin'},
                    wrap: 'true',
                    align: 'center'
                });
            }
            data.heights.push({row: 3, height: 30});

            var num = 4;
            var newData = $filter('filter')(vm.Grid1.Data, {checked: true});
            if(newData.length < 1){
                alert('Please select at least one record');
                return false;
            }
            var newObj = []
            angular.forEach(newData, function (obj, ind) {
                newObj.push([
                    obj.assetId,
                    obj.assetName,
                    obj.businessOwner,
                    obj.technologyOwner,
                    obj.region,
                    obj.department,
                    obj.environment,
                    obj.operatingSystem,
                    obj.assetClassification,
                    obj.infrastructure,
                    obj.informationClassification,
                    obj.informationAssetType,
                    obj.informationHandling,
                    obj.riskRating,
                    obj.vendorApp,
                    obj.sox,
                    obj.fdicia,
                    obj.gdpr,
                    obj.iso27000,
                    obj.cobit,
                    obj.nist
                ]);
                num++;
            });

            data.commonData = {
                data: newObj,
                font: {name: 'Calibri', sz: '11', family: '2', scheme: '-'},
                border: {left: 'thin', top: 'thin', right: 'thin', bottom: 'thin'},
                wrap: 'true',
                align: 'center',
                height: 60,
                srow: 4,
                scol: 2
            };

            data.cols = 23;
            data.rows = num * 1 + 2;

            var wval = [10,20, 40, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
            data.widths = [];
            for (var i = 0; i < wval.length; i++) {
                data.widths.push({col: +i + 1, width: wval[i]});
            }

            DataInventoryService.DownloadExcel(data).then(function (response) {
                var nodeUrl = $rootScope.app.NodeApi;
                location.assign(nodeUrl+ '/downloadExcel/' + response.data);
            }).catch(function (error) {
                console.log('error!: ');
            });
        };
    }
})();
