(function () {
    BpmMainController.$inject = ['$scope', '$rootScope', '$state', 'BpmService', 'ChartFactory', 'Utils', '$filter'];
    app.controller('BpmMainCtrl', BpmMainController);

    function BpmMainController($scope, $rootScope, $state, BpmService, ChartFactory, Utils, $filter) {
        var vm = this;
        vm.mainTitle = $state.current.title;
        vm.mainDesc = "Add Edit Search & Delete Processes";

        vm.OpList = [5, 10, 25, 50, 100];
        vm.Grid1 = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'processName',
            IsAsc: true,
            Filter: "",
            Total: 0,
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

        vm.deleteAction = function (r) {
        	var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are you sure you want to delete the selected item", "Yes", "No");
            confirmation.result.then(function () {
                $rootScope.app.Mask = true;
                BpmService.DeleteProcess(r.id).then(function (data) {
                    if (data.status === 200) loadData();
                });
            });
        };

        BpmService.GetManageStatus()
            .then(function (data) {
                $rootScope.app.Mask = true;
                ChartFactory.CreatePieChart('Process By Status', 'Process By Status', data, 'process_MGStatus');
                return BpmService.GetManagePeriod();
            })
            .then(function (data) {
                ChartFactory.CreateLineChart('Process By Period', data, 'process_MGPeriod');
                return BpmService.GetManageRegion();
            })
            .then(function (data) {
                loadRegion(data);
                return BpmService.GetAttestationStatus();
            })
            .then(function (data) {
                ChartFactory.CreatePieChart('Attestations By Status', 'Attestations By Status', data, 'attestation_StatusChart');
                return BpmService.GetActivityOpen();
            })
            .then(function (data) {
                loadActivity(data);
                console.log(1111);
                return BpmService.GetManageDept();
            })
            .then(function (data) {
                console.log(data);
                ChartFactory.CreatePieChart('Status By Department', 'Status By Department', data, 'status_department');

            })
            .finally(function () {
                loadData();
            });


        function loadRegion(data) {
            var categories = [];
            $rootScope.app.Lookup.LIST001.forEach(function (item) {
                categories.push(item.val);
            });
            var tmpobj = {};
            for (var i in categories) {
                var item = categories[i];
                var tmpit = (item === 'South Ameria') ? 'EMEA' : item;
                angular.forEach(data, function (val, key) {
                    if (key.indexOf(tmpit) === 0) {
                        var re = key.substr(+tmpit.length + 1);
                        if(re.indexOf('Pacific') !== -1) re = re.substr(8);
                        if (angular.isArray(tmpobj[re])) {
                            tmpobj[re][i] += val * 1;
                        } else {
                            tmpobj[re] = [0, 0, 0, 0, 0];
                            tmpobj[re][i] = val;
                        }
                    }
                });

            }
            var series = [];
            angular.forEach(tmpobj, function (ary, key) {
                series.push({
                    name: key,
                    data: ary
                })
            });
            var config = {
                Text: 'Process By Region',
                Title: '',
                Categories: categories,
                Series: series
            };
            config = ChartFactory.SetupStackedChart(config);
            Highcharts.chart('process_MGRegion', config);
        }

        function loadActivity(data) {
            var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var tmpobj = {};
            for (var i in categories) {
                var item = categories[i].toLowerCase();
                angular.forEach(data, function (val, key) {
                    if (key.indexOf(item) === 0) {
                        var re = key.substr(item.length);
                        if (angular.isArray(tmpobj[re])) {
                            tmpobj[re][i] += val * 1;
                        } else {
                            tmpobj[re] = [0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0];
                            tmpobj[re][i] = val;
                        }
                    }
                });

            }
            var series = [];
            angular.forEach(tmpobj, function (ary, key) {
                series.push({
                    name: key,
                    data: ary
                })
            });
            var config = {
                Text: 'Open Activities By Period',
                yTitle: 'Activities',
                subTitle: 'Period',
                //Tooltip: '1',
                Categories: categories,
                Series: series
            };
            console.log(config);
            config = ChartFactory.SetupMonthLineChart(config);
            Highcharts.chart('openActivity_periodChart', config);
        }

        function loadData() {
            BpmService.GetProcesses($scope.PerPage, $scope.CurrPage).then(function (data) {
                vm.Grid1.Total = data.length;
                vm.Grid1.Data = data;
                
                return BpmService.GetAttestations();
            }).then (function (data) {
            	vm.AttestationData = data;
                return BpmService.GetActivities();
            }).then(function (data) {
                vm.ActivityData = data;
                return BpmService.GetSubprocesses();
            }).then(function (data) {
                angular.forEach(vm.Grid1.Data, function (r, k) {
                    r.dateOccurance = moment(r.dateOccurance).format('MMM-DD-YYYY');

                    r.Grid1 = {
                        PerPage: 10, CurrPage: 1, Column: 'subprocessName', IsAsc: true, Filter: "", Total: 0, Data: [],
                        SortMe: function (col, obj) {
                            if (obj.Grid1.Column === col)
                                obj.Grid1.IsAsc = !obj.Grid1.IsAsc;
                            else
                                obj.Grid1.Column = col;
                        },
                        GetIco: function (col, obj) {
                            if (obj.Grid1.Column === col) {
                                return obj.Grid1.IsAsc ? 'fa-sort-up' : 'fa-sort-down';
                            } else {
                                return 'fa-unsorted';
                            }
                        }
                    };

                    var tdata = $filter('filter')(data, {'processId': r.id});
                    r.Grid1.Total = tdata.length;
                    r.Grid1.Data = tdata;
                    $scope.$watch('r.Grid1.Filter', function (n, o) {
                        var searchedData = $filter('filter')(r.Grid1.Data, r.Grid1.Filter);
                        r.Grid1.Total = searchedData.length;
                    });

                    //---------Activity SubGrid----------------------
                    r.Grid1.Data.forEach(function (subprocess) {
                        subprocess.Grid1 = {
                            PerPage: 10,
                            CurrPage: 1,
                            Column: 'activityName',
                            IsAsc: true,
                            Filter: "",
                            Total: 0,
                            Data: [],
                            SortMe: function (col, obj) {
                                if (obj.Grid1.Column === col)
                                    obj.Grid1.IsAsc = !obj.Grid1.IsAsc;
                                else
                                    obj.Grid1.Column = col;
                            },
                            GetIco: function (col, obj) {
                                if (obj.Grid1.Column === col) {
                                    return obj.Grid1.IsAsc ? 'fa-sort-up' : 'fa-sort-down';
                                } else {
                                    return 'fa-unsorted';
                                }
                            }
                        };

                        var fdata = $filter('filter')(vm.ActivityData, {processId: r.id, subprocessId: subprocess.id});
                        subprocess.Grid1.Total = fdata.length;
                        subprocess.Grid1.Data = fdata;

                        $scope.$watch('subprocess.Grid1.Filter', function (n, o) {
                            var searchedData = $filter('filter')(subprocess.Grid1.Data, subprocess.Grid1.Filter);
                            subprocess.Grid1.Total = searchedData.length;
                        });
                        
                        //---------Attestation SubGrid----------------------
                        subprocess.Grid1.Data.forEach(function (activity) {
                            activity.Grid1 = {
                                PerPage: 10,
                                CurrPage: 1,
                                Column: 'attestationName',
                                IsAsc: true,
                                Filter: "",
                                Total: 0,
                                Data: [],
                                SortMe: function (col, obj) {
                                    if (obj.Grid1.Column === col)
                                        obj.Grid1.IsAsc = !obj.Grid1.IsAsc;
                                    else
                                        obj.Grid1.Column = col;
                                },
                                GetIco: function (col, obj) {
                                    if (obj.Grid1.Column === col) {
                                        return obj.Grid1.IsAsc ? 'fa-sort-up' : 'fa-sort-down';
                                    } else {
                                        return 'fa-unsorted';
                                    }
                                }
                            };

                            var adata = $filter('filter')(vm.AttestationData, {subprocessId: subprocess.id, activityId: activity.id});
                            activity.Grid1.Total = adata.length;
                            activity.Grid1.Data = adata;

                            $scope.$watch('activity.Grid1.Filter', function (n, o) {
                                var searchedData = $filter('filter')(activity.Grid1.Data, activity.Grid1.Filter);
                                activity.Grid1.Total = searchedData.length;
                            });

                        });
                        //----------------------------------------------
                        
                    });
                    //----------------------------------------------
                    
                });

                $rootScope.app.Mask = false;
            });
        }
    }
})();