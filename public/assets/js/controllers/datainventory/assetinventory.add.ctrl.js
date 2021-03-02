(function () {
	AssetInventoryAddController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$filter', 'DataInventoryService', 'Utils'];
    app.controller('AssetInventoryAddCtrl', AssetInventoryAddController);

    function AssetInventoryAddController($scope, $rootScope, $state, $uibModal, $filter, DataInventoryService, Utils) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add Asset";

        vm.formdata = {
            assetId: "",
            assetName: "",
            businessOwner: "",
            technologyOwner: "",
            department: "",
            region: "",
            environment: "",
            operatingSystem: "",
            assetClassification: "",
            infrastructure: "",
            informationClassification: "",
            informationAssetType: "",
            informationHandling: "",
            riskRating: "",
            vendorApp: "",
            sox: "",
            fdicia: "",
            gdpr: "",
            iso27000: "",
            cobit: "",
            nist: ""
        };

        vm.submitAction = function(){
            $rootScope.app.Mask = true;
            if(vm.AssetInventoryForm.$invalid) return false;

            DataInventoryService.PostAsset(vm.formdata).then(function (res) {

            }).finally(function () {
                $state.go('app.datainventory.asset.main');
            });
        };

        vm.cancelAction = function () {
            if (vm.AssetInventoryForm.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Do you want to cancel and if yes you should go back to previous screen", "Yes", "No");
                confirm.result.then(function () {
                    $state.go('app.datainventory.asset.main');
                });
                return false;
            }
            $state.go('app.datainventory.asset.main');
        };
        
        vm.downloadExcel = function () {
            var data = {};
            data.heights = [];
            data.sheetName = "Asset Information";
            data.body = [];
            var asset_data = [
                [
                    "Asset ID",
                    angular.isUndefined(vm.formdata.assetId)? "" : vm.formdata.assetId + "",
                    "",
                    "Asset Name",
                    angular.isUndefined(vm.formdata.assetName)? "" : vm.formdata.assetName + "",
                ],
                [
                    "Business Owner",
                    angular.isUndefined(vm.formdata.businessOwner)? "" : vm.formdata.businessOwner + "",
                    "",
                    "Technology Owner",
                    angular.isUndefined(vm.formdata.technologyOwner)? "" : vm.formdata.technologyOwner + "",
                ],
                [
                    "Region",
                    angular.isUndefined(vm.formdata.region)? "" : vm.formdata.region + "",
                    "",
                    "Department",
                    angular.isUndefined(vm.formdata.department)? "" : vm.formdata.department + "",
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
                    row: 7,
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

            newObj.push([
            	vm.formdata.environment,
            	vm.formdata.operatingSystem,
            	vm.formdata.assetClassification,
                vm.formdata.infrastructure,
                vm.formdata.informationClassification,
                vm.formdata.informationAssetType,
                vm.formdata.informationHandling,
                vm.formdata.riskRating,
                vm.formdata.vendorApp,
                vm.formdata.sox,
                vm.formdata.fdicia,
                vm.formdata.gdpr,
                vm.formdata.iso27000,
                vm.formdata.cobit,
                vm.formdata.nist
            ]);
            num++;

            data.commonData = {
                data: newObj,
                font: {name: 'Calibri', sz: '11', family: '2', scheme: '-'},
                border: {left: 'thin', top: 'thin', right: 'thin', bottom: 'thin'},
                wrap: 'true',
                height: 60,
                srow: 7,
                scol: 2
            };

            data.cols = 17;
            data.rows = num * 1 + 2;

            var wval = [10, 10, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
            data.widths = [];
            for (var i = 0; i < wval.length; i++) {
                data.widths.push({col: +i + 1, width: wval[i]});
            }
            
            DataInventoryService.DownloadExcel(data).then(function (response) {
                var nodeUrl = $rootScope.app.NodeApi;
                location.assign(nodeUrl+ '/downloadExcel/' + response.data);
            }).catch(function (error) {
                console.log('error!');
            });
        };
        
        $rootScope.app.Mask = false;
    }
})();