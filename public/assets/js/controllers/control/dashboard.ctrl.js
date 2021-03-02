(function () {
    DashboardController.$inject = ['$scope', '$rootScope', '$state', '$filter', 'ControlService', 'ChartFactory', 'Utils'];
    app.controller('ControlDashboardCtrl', DashboardController);

    function DashboardController($scope, $rootScope, $state, $filter, ControlService, ChartFactory, Utils) {
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = 'Controls Dashboard';

        $scope.IsAsc = true;

        $scope.OpList = [10, 25, 50, 100];
        $scope.PerPage = 10;
        
        $rootScope.app.Mask = true;
        
        function random(seed, bound) {
            var x = Math.sin(seed) * 10000;
            return parseInt((x - Math.floor(x)) * bound);
        }

        ControlService.GetBySoure().then(function (per) {
        	setupSourceChart(per);
            /*return ControlService.GetByCtrlDefn(); 
        }).then(function (per) {
            setupDefinitionChart(per);
            return ControlService.GetRiskType();
        }).then(function (per) {
            setupRisktypeChart(per);*/
            return ControlService.GetByTePeriod();
        }).then(function (per) {
            setupTePeriodChart(per);
            /*return ControlService.GetTeRiskType();
        }).then(function (per) {
            setupTeRisktypeChart(per);*/
            return ControlService.GetTeBySoure();
        }).then(function (per) {
            setupTeSourceChart(per);
            return ControlService.GetTsByDept();
        }).then(function (data) {
        	setupTsByDeptHeatMap(data);
        	return ControlService.GetTsByRegion();
        }).then(function (data) {
        	setupTsByRegionHeatMap(data);
        	return ControlService.GetTrByDept();
        }).then(function (data) {
        	setupTrByDeptHeatMap(data)
            return ControlService.GetTrByRegion();
        }).then(function (data) {
        	setupTrByRegionHeatMap(data)
            
            $rootScope.app.Mask = false;
        });


        function setupCategoryChart(data) {

            var dataAry = data.bycateogry;
            var dataList = [];
            Object.keys(dataAry).forEach(function (k) {
                dataList.push([k, dataAry[k]]);
            });
            console.log('dataListdataListdataList',dataList);
            var chartObj = ChartFactory.CreatePieChartTemplate('Controls by Category', 'Controls by Category', dataList, ['#E0ED00', '#1372DF', '#24CBE5', '#1CB400']);
            Highcharts.chart('categoryChart', chartObj);
        }

        function setupDefinitionChart(data) {
            var dataAry = data.byctrldefn;
            var opts = {
                Title: "Controls By Definition",
                YText: "Values",
                Categories : [],
                Series: 'Definition',
                Data : []
            };

            Object.keys(dataAry).forEach(function (k) {
                opts.Categories.push(k);
                opts.Data.push(dataAry[k]);
            });
            ChartFactory.SetupColChart('definitionChart', opts);
        }

        function setupRisktypeChart(data) {
            var dataAry = data.bycateogry;
            var opts = {
                Title: "Controls By Risk Type",
                YText: "Values",
                Categories : [],
                Series: 'RiskType',
                Data : []
            };

            Object.keys(dataAry).forEach(function (k) {
                opts.Categories.push(k);
                opts.Data.push(dataAry[k]);
            });
            ChartFactory.SetupColChart('risktypeChart', opts);
        }

        function setupSourceChart(data) {
            var dataAry = data.bysource;
            var dataList = [];
            Object.keys(dataAry).forEach(function (k) {
                dataList.push([k, dataAry[k]]);
            });
            var chartObj = ChartFactory.CreatePieChartTemplate('Controls by Source', 'Controls by Source', dataList, ['#FF8800', '#00ED17', '#ED00B8', '#B9BBED', '#1CB400', '#8A8A8A']);
            Highcharts.chart('sourceChart', chartObj);
        }

        function setupRisktypeChart1(data) {
            var dataAry = data.bycateogry;
            var opts = {
                Title: "Controls By Risk Type",
                subTitle: "",
                yTitle: "",
                tooltip: "",
                Categories : [],
                Series: 'Risk Type',
                Data : null
            };
            var dataList = [];
            Object.keys(dataAry).forEach(function (k) {
                dataList.push([k, dataAry[k]]);
            });
            opts.Data = dataList;
            var chartObj = ChartFactory.SetupLabelChart(opts);
            // console.clear();
            console.log(chartObj);
            Highcharts.chart('risktypeChart', chartObj);
        }

        function setupTePeriodChart (data){

            var month, opts = {
                Title: "Controls Tested By Period",
                YText: "Values",
                Categories : [],
                Series: [
                    { name: "High", data: [], color:'#c62733' },
                    { name: "Medium", data: [], color:'#db981f' },
                    { name: "Low", data: [], color:'#00d356' }
                ]

            };
            Object.keys(data).forEach(function(k){
                if(k.indexOf('High')>-1) {
                    month = Utils.camelizeString(k.split('High')[0]);
                    opts.Series[0].data.push(data[k]);
                }
                if(k.indexOf('Med')>-1) {
                    month = Utils.camelizeString(k.split('Med')[0]);
                    opts.Series[1].data.push(data[k]);
                }
                if(k.indexOf('Low')>-1) {
                    month = Utils.camelizeString(k.split('Low')[0]);
                    opts.Series[2].data.push(data[k]);
                }
                if(opts.Categories.indexOf(month)===-1)
                    opts.Categories.push(month);
            });

            ChartFactory.SetupMultiColChart('tePeriodChart', opts);
        }

        function setupTeCategoryChart(data) {
            var dataAry = data.bycateogry;
            var dataList = [];
            Object.keys(dataAry).forEach(function (k) {
                dataList.push([k, dataAry[k]]);
            });
            var chartObj = ChartFactory.CreatePieChartTemplate('CONTROLS BEING TESTED by Category', 'CONTROLS BEING TESTED by Category', dataList, ['#E0ED00', '#1372DF', '#24CBE5', '#1CB400']);
            Highcharts.chart('teCategoryChart', chartObj);
        }

        function setupTeRisktypeChart(data) {
            var dataAry = data.bycateogry;
            var opts = {
                Title: "Controls Tested By Risk Type",
                subTitle: "",
                yTitle: "",
                tooltip: "",
                Categories : [],
                Series: 'Risk Type',
                Data : null
            };
            var dataList = [];
            Object.keys(dataAry).forEach(function (k) {
                dataList.push([k, dataAry[k]]);
            });
            opts.Data = dataList;
            var chartObj = ChartFactory.SetupLabelChart(opts);
            // console.clear();
            console.log(chartObj);
            Highcharts.chart('teRisktypeChart', chartObj);
        }

        function setupTeSourceChart(data) {
            var dataAry = data.bysource;
            var dataList = [];
            Object.keys(dataAry).forEach(function (k) {
                dataList.push([k, dataAry[k]]);
            });
            var chartObj = ChartFactory.CreatePieChartTemplate('Controls Tested by Source', 'Controls Tested by Source', dataList, ['#FF8800', '#00ED17', '#ED00B8', '#B9BBED', '#1CB400', '#8A8A8A']);
            Highcharts.chart('teSourceChart', chartObj);
        }

        function setupStatusChart(data) {

            var serTypes = { approved: 'Approved', completed: 'Completed', in_progress: 'In Progress', ready_to_approve: 'Ready to Approve', submitted: 'Submitted', to_approve: 'To Approve' };
            var cats = [], currCats = [];
            var serList = [
                { name: 'Approved', data: [] },
                { name: 'Completed', data: [] },
                { name: 'In Progress', data: [] },
                { name: 'Ready to Approve', data: [] },
                { name: 'Submitted', data: [] },
                { name: 'To Approve', data: [] }
            ];

            Object.keys(serTypes).forEach(function(ck){
                cats.push(ck);
            });

            cats.forEach(function(cat, i){
                currCats = $filter('filter')(Object.keys(data), cat);
                currCats.forEach(function(c){
                    if(c.indexOf(' approved')>-1) {
                        serList[0].data.push(data[c]);
                    }
                    if(c.indexOf(' completed')>-1) {
                        serList[1].data.push(data[c]);
                    }
                    if(c.indexOf(' in_progress')>-1) {
                        serList[2].data.push(data[c]);
                    }
                    if(c.indexOf(' ready_to_approve')>-1) {
                        serList[3].data.push(data[c]);
                    }
                    if(c.indexOf(' submitted')>-1) {
                        serList[4].data.push(data[c]);
                    }
                    if(c.indexOf(' to_approve')>-1) {
                        serList[5].data.push(data[c]);
                    }
                });
            });

            cats.forEach(function(c, i){ cats[i] = serTypes[c]; });
            console.log(serList);

            Highcharts.chart('regionstacked', {
                chart: { type: 'bar' },
                title: { text: 'By Region' },
                xAxis: {
                    categories: cats
                },
                yAxis: {
                    min: 0,
                    title: { text: 'By Re' }
                },
                legend: {  reversed: false },
                plotOptions: {
                    series: { stacking: 'normal' }
                },
                series: serList
            });
        }
      
        function setupTsByDeptHeatMap(data) {
        	var ChartOpts = {
                Title: 'Test Status by Department',
                YCategories: data.ycategories,
                XCategories: data.xcategories,
                SeriesName: 'Series',
                SeriesData: []
            };
	
        	for (var i = 0; i < ChartOpts.XCategories.length; i++) {
        		for (var j = 0; j < ChartOpts.YCategories.length; j++) {
        			Object.keys(data).forEach(function(c) {
        				if (c.indexOf(ChartOpts.YCategories[j]) !== -1 && c.indexOf(ChartOpts.XCategories[i]) !== -1) {
                			ChartOpts.SeriesData.push({x: i, y: j, value: data[c], color: cellColor(data[c])});
                		}
                	});
        		}
        	}

			ChartFactory.BuildHeatMap2('tsDeptHeatmap', ChartOpts);
		}
        
        function setupTsByRegionHeatMap(data) {
        	var ChartOpts = {
                Title: 'Test Status by Region',
                YCategories: data.ycategories,
                XCategories: data.xcategories,
                SeriesName: 'Series',
                SeriesData: []
            };
        	
        	for (var i = 0; i < ChartOpts.XCategories.length; i++) {
        		for (var j = 0; j < ChartOpts.YCategories.length; j++) {
        			Object.keys(data).forEach(function(c) {
        				if (c.indexOf(ChartOpts.YCategories[j]) !== -1 && c.indexOf(ChartOpts.XCategories[i]) !== -1) {
                			ChartOpts.SeriesData.push({x: i, y: j, value: data[c], color: cellColor(data[c])});
                		}
                	});
        		}
        	}
			
			ChartFactory.BuildHeatMap2('tsRegionHeatmap', ChartOpts);
		}
        
        function setupTrByDeptHeatMap(data) {
        	var ChartOpts = {
                Title: 'Test Result by Department',
                YCategories: data.ycategories,
                XCategories: data.xcategories,
                SeriesName: 'Series',
                SeriesData: []
            };
	
        	for (var i = 0; i < ChartOpts.XCategories.length; i++) {
        		for (var j = 0; j < ChartOpts.YCategories.length; j++) {
        			Object.keys(data).forEach(function(c) {
        				if (c.indexOf(ChartOpts.YCategories[j]) !== -1 && c.indexOf(ChartOpts.XCategories[i]) !== -1) {
                			ChartOpts.SeriesData.push({x: i, y: j, value: data[c], color: cellColor(data[c])});
                		}
                	});
        		}
        	}
			
			ChartFactory.BuildHeatMap2('trDeptHeatmap', ChartOpts);
		}
        
        function setupTrByRegionHeatMap(data) {
        	var ChartOpts = {
                Title: 'Test Result by Region',
                YCategories: data.ycategories,
                XCategories: data.xcategories,
                SeriesName: 'Series',
                SeriesData: []
            };
	
        	for (var i = 0; i < ChartOpts.XCategories.length; i++) {
        		for (var j = 0; j < ChartOpts.YCategories.length; j++) {
        			Object.keys(data).forEach(function(c) {
        				if (c.indexOf(ChartOpts.YCategories[j]) !== -1 && c.indexOf(ChartOpts.XCategories[i]) !== -1) {
                			ChartOpts.SeriesData.push({x: i, y: j, value: data[c], color: cellColor(data[c])});
                		}
                	});
        		}
        	}
			
			ChartFactory.BuildHeatMap2('trRegionHeatmap', ChartOpts);
		}
        
        function cellColor(val) {
            var ranges = [0, 0.5, 1, 1.5, 2, 3, 5, 10, 20];
            var colors = ['#F34A4D', '#E3500A', '#FF9109', '#FFDB27', '#D3FF12', '#D1FF08', '#35D321', '#92F115', '#229C00'];
            var resCol = '#E3001F';
            for(var i in ranges){
                if(i>0){
                    if(val > ranges[i]) resCol = colors[i-1];
                }
            }

            return resCol;
        }
    }
})();
