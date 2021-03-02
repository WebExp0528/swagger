(function(){
    "use strict";

    app.factory('ChartFactory', function($rootScope, Utils){
        function ChartFactory(){ this.name = "Chart Factory" }
        ChartFactory.prototype.constructor = ChartFactory;
        /*
         *  High Chart related functions
         */
        ChartFactory.prototype.CreateDepartMentChart = function(title, name, data, chartEle){
            var dataList = [],
                rcsaChrt = [],
                pattern_data = {
                    "Asset Management": null, //1
                    "Equities": null, //2
                    "IT": null,//3
                    "Investment Banking": null,//4
                    "Operations": null, //5
                    "TAX": null//6
                },
                color = [
                    '#D4AF37', //1
                    '#ff0000', //2
                    '#FDF204', //3
                    '#32cd32', //4
                    '#7fffd4', //5
                    '#523357' //6
                ];

            for(var i in data){
                pattern_data[i]=data[i];
            }
            // console.log('datadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadata',pattern_data);
            Object.keys(pattern_data).forEach(function (k) {
                rcsaChrt.push({key: Utils.camelizeString(k), val: pattern_data[k]});
            });
            rcsaChrt.forEach(function(o){ dataList.push([o.key, o.val]); });

            if(color && color.length) Highcharts.getOptions().plotOptions.pie.colors = color;
            var chartObj =  {
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'pie',
                    options3d: { enabled: true, alpha: 45, beta: 0 }
                },
                title: { text: title },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{ type: 'pie', name: name, data: dataList }]
            };

            return Highcharts.chart(chartEle, chartObj);
        };

        ChartFactory.prototype.CreateFindingChart = function(title, data, chartEle){
            var month, opts = {
                Title: title,
                YText: "Values",
                Categories : [],
                Series: [
                    { name: "Draft", data: [] },
                    { name: "Review", data: [] }
                ],
                Colors: ['#ffa500', '#039220']
            };

            Object.keys(data).forEach(function (k) {
                if (k.indexOf('Draft') > -1) {
                    month = Utils.camelizeString(k.split('High')[0]);
                    opts.Series[0].data.push(data[k]);
                }
                if (k.indexOf('Review') > -1) {
                    month = Utils.camelizeString(k.split('Med ')[0]);
                    opts.Series[1].data.push(data[k]);
                }
                if (opts.Categories.indexOf(month) === -1)
                    opts.Categories.push(month);
            });

            var chartObj = {
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'column'
                },
                title: {
                    text: opts.Title
                },
                subtitle: {
                    text: 'Monthly'
                },
                xAxis: {  categories: opts.Categories },
                yAxis: {
                    min: 0,
                    title: {
                        text: opts.YText
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: opts.Series,
                colors: opts.Colors
            };

            return Highcharts.chart(chartEle, chartObj);
        };

        ChartFactory.prototype.CreatePieChartTemplate = function(title, name, data, cols){
            if(cols && cols.length) Highcharts.getOptions().plotOptions.pie.colors = cols;
            return {
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'pie',
                    options3d: { enabled: true, alpha: 45, beta: 0 }
                },
                title: { text: title },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{ type: 'pie', name: name, data: data }]
            };
        };

        ChartFactory.prototype.CreatePieChart = function(title, name, data, chartEle){
            // return;
            var dataList = [],
                rcsaChrt = [],
                pattern_data = {
                    "In Progress": null,
                    "in_progress": null,//1
                    "Completed": null,
                    "completed": null,//2
                    "Submitted": null,
                    "submitted": null,//3
                    "To Approve": null,
                    "to_approve": null,//4
                    "Ready To Approve": null,
                    "ready_to_approve": null,//5
                    "approved": null,
                    "Approved": null,//6
                    "Draft": null,//7
                    "In Review": null,//8
                    "Accept": null,//9
                    "Complete Pending Review": null, //10
                    "Complete": null, //11
                    "High": null, //12
                    "Medium": null, //13
                    "Low": null //14
                },
                color = [
                    '#22a3e1',
                    '#9a84ff',
                    '#2649fa',
                    '#ffeeaa',
                    '#06913f',
                    '#ffb100',
                    '#039220',
                    '#33bbff',
                    '#ffff00',
                    '#ff0000',
                    '#0ccbfd',
                    '#32cd32',
                    '#bb0bff',
                    '#0600C7',
                    '#523357',
                    '#ff00f8',
                    '#4bff00',
                    '#FF6100'
                ];

            for(var i in data){
                pattern_data[i]=data[i];
            }
            // console.log('datadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadata',pattern_data);
            Object.keys(pattern_data).forEach(function (k) {
                rcsaChrt.push({key: Utils.camelizeString(k), val: pattern_data[k]});
            });
            rcsaChrt.forEach(function(o){ dataList.push([o.key, o.val]); });

            if(color && color.length) Highcharts.getOptions().plotOptions.pie.colors = color;
            var chartObj =  {
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'pie',
                    options3d: { enabled: true, alpha: 45, beta: 0 }
                },
                title: { text: title },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        colors: color,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{ type: 'pie', name: name, data: dataList }]
            };

            return Highcharts.chart(chartEle, chartObj);
        };

        ChartFactory.prototype.CreateStatusChart = function(title, name, data, chartEle){
            // return;
            var dataList = [],
                rcsaChrt = [],
                pattern_data = {
                    "In Progress": null,
                    "in_progress": null,//1
                    "Completed": null,
                    "completed": null,//2
                    "Submitted": null,
                    "submitted": null,//3
                    "To Approve": null,
                    "to_approve": null,//4
                    "Ready To Approve": null,
                    "ready_to_approve": null,//5
                    "approved": null,
                    "Approved": null,//6
                    "Draft": null,//7
                    "In Review": null,//8
                    "Accept": null,//9
                    "Complete Pending Review": null, //10
                    "Complete": null, //11
                    "High": null, //12
                    "Medium": null, //13
                    "Low": null //14
                },
                color = [
                    '#D4AF37',
                    '#D4AF37', //1
                    '#ff0000',
                    '#ff0000', //2
                    '#FDF204',
                    '#FDF204', //3
                    '#32cd32',
                    '#32cd32', //4
                    '#7fffd4',
                    '#7fffd4', //5
                    '#0600C7',
                    '#523357', //6
                    '#22a3e1', //7
                    '#aaa0C7', //8
                    '#faebd7', //9
                    '#ffeeaa', //10
                    '#808080', //11
                    '#ffa500', //12
                    '#039220', //13
                    '#33bbff' //14
                ];

            for(var i in data){
                pattern_data[i]=data[i];
            }
            // console.log('datadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadata',pattern_data);
            Object.keys(pattern_data).forEach(function (k) {
                rcsaChrt.push({key: Utils.camelizeString(k), val: pattern_data[k]});
            });
            rcsaChrt.forEach(function(o){ dataList.push([o.key, o.val]); });

            if(color && color.length) Highcharts.getOptions().plotOptions.pie.colors = color;
            var chartObj =  {
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'pie',
                    options3d: { enabled: true, alpha: 45, beta: 0 }
                },
                title: { text: title },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{ type: 'pie', name: name, data: dataList }]
            };

            return Highcharts.chart(chartEle, chartObj);
        };

        ChartFactory.prototype.CreateLabelChart = function(title, subTitle, yTitle, tooltip, series, data, chartEle){
            var dataList = [];
            angular.forEach(data, function(value, key){
                dataList.push([key, value*1]);
            });

            var chartObj = {
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'column'
                },
                title: {
                    text: title
                },
                subtitle: {
                    text: subTitle
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: yTitle
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: tooltip
                },
                series: [{
                    name: 'Population',
                    data: dataList,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            };

            return Highcharts.chart(chartEle, chartObj);
        };

        ChartFactory.prototype.CreateMultiColChart = function(title, data, chartEle){
            var month, opts = {
                Title: title,
                YText: "Values",
                Categories : [],
                Series: [
                    { name: "High", data: [] },
                    { name: "Medium", data: [] },
                    { name: "Low", data: [] }
                ],
                Colors: ['#ffa500', '#039220', '#33BBFF']
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

            var chartObj = {
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'column'
                },
                title: {
                    text: opts.Title
                },
                subtitle: {
                    text: 'Monthly'
                },
                xAxis: {  categories: opts.Categories },
                yAxis: {
                    min: 0,
                    title: {
                        text: opts.YText
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: opts.Series,
                colors: opts.Colors
            };

            return Highcharts.chart(chartEle, chartObj);
        };

        ChartFactory.prototype.CreateStackedChart = function($filter, data, chartEle){
            var cats = [], currCats = [];
            var serList = [
                { name: 'High', data: [] },
                { name: 'Medium', data: [] },
                { name: 'Low', data: [] }
            ];
            Object.keys(data.categories).forEach(function(ck){ cats.push(data.categories[ck]); });

            cats.forEach(function(cat, i){
                currCats = $filter('filter')(Object.keys(data['risk category status']), cat);
                currCats.forEach(function(c){
                    if(c.indexOf('Low')>-1) {
                        serList[2].data.push(data['risk category status'][c]);
                    }
                    if(c.indexOf('Med')>-1) {
                        serList[1].data.push(data['risk category status'][c]);
                    }
                    if(c.indexOf('High')>-1) {
                        serList[0].data.push(data['risk category status'][c]);
                    }
                });
            });

            var config = {
                Text:"By Risk Category",
                Title:"By Risk Category",
                Series: serList,
                Categories: cats,
                Colors: ['#C70039', '#0000ff', '#FAFA10']
            };

            var configqwe = {
                credits: {
                    enabled: false
                },
                chart: { type: 'bar' },
                title: { text: config.Text },
                xAxis: {
                    categories: config.Categories
                },
                yAxis: {
                    min: 0,
                    title: { text: config.Title }
                },
                legend: {  reversed: false },
                plotOptions: {
                    series: { stacking: 'normal' }
                },
                series: config.Series,
                colors: config.Colors
            };

            return Highcharts.chart(chartEle, configqwe);
        };

        ChartFactory.prototype.CreateRegionChart = function (data, chartEle, $filter){

            var opts = {
                Title: "By Region",
                YText: "Values",
                Categories: [],
                Series: [
                    {name: "In Progress", data: [], color: '#008000'},
                    {name: "Completed", data: [], color: '#ff0000'},
                    {name: "Submitted", data: [], color: '#ffff00'},
                    {name: "To Approve", data: [], color: '#ffc0cb'},
                    {name: "Ready To Approve", data: [], color: '#ffa500'},
                    {name: "Approved", data: [], color: '#0000ff'}
                ]
            }, cats = ['In Progress', 'Completed', 'Submitted', 'To Approve', 'Ready To Approve', 'Approved'];
            Object.keys(data).forEach(function (k) {
                if (opts.Categories.indexOf(Utils.removeLastWord(k)) === -1) opts.Categories.push(Utils.removeLastWord(k));
            });

            opts.Categories.forEach(function (c) {
                var filteredData = $filter('filter')(Object.keys(data), c);
                filteredData.forEach(function (ck) {
                    cats.forEach(function (ct, j) {
                        if (ck.indexOf(ct) > -1) {
                            opts.Series[j].data.push(data[ck]);
                        }
                    });
                });
            });


            var chartObj = {
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'column'
                },
                title: {
                    text: opts.Title
                },
                subtitle: {
                    text: 'Monthly'
                },
                xAxis: {  categories: opts.Categories },
                yAxis: {
                    min: 0,
                    title: {
                        text: opts.YText
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: opts.Series,
                colors: opts.Colors
            };
            Highcharts.chart(chartEle, chartObj);
        };

        ChartFactory.prototype.SetupStackedChart = function(config){

            //if(config.Colors) Highcharts.getOptions().plotOptions.bar.colors = config.Colors;
            return {
                credits: {
                    enabled: false
                },
                chart: { type: 'bar' },
                title: { text: config.Text },
                xAxis: {
                    categories: config.Categories
                },
                yAxis: {
                    min: 0,
                    title: { text: config.Title }
                },
                legend: {  reversed: false },
                plotOptions: {
                    series: { stacking: 'normal' }
                },
                series: config.Series
            };
        };

        ChartFactory.prototype.SetupMultiColChart = function(el, opts){

            var chartObj = {
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'column'
                },
                title: {
                    text: opts.Title
                },
                subtitle: {
                    text: 'Monthly'
                },
                xAxis: {  categories: opts.Categories },
                yAxis: {
                    min: 0,
                    title: {
                        text: opts.YText
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: opts.Series,
                colors: opts.Colors
            };

            Highcharts.chart(el, chartObj);
        };

        ChartFactory.prototype.SetupColChart = function(el, opts){

            var chartObj = {
                credits: {
                    enabled: false
                },
                chart: {
                    renderTo: el,
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 0,
                        beta: -20,
                        depth: 100,
                        viewDistance: 25
                    }
                },
                colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
                title: { text: opts.Title },
                xAxis: { categories: opts.Categories },
                yAxis: { title: { text: 'Level' } },
                series: [{ name: opts.Series, data: opts.Data }]
            };

            new Highcharts.Chart(chartObj);
        };

        ChartFactory.prototype.SetupLabelChart = function(opts){

            var chartObj = {
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'column',
                },
                title: {
                    text: opts.Title
                },
                subtitle: {
                    text: opts.subTitle
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: opts.yTitle
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: opts.tooltip
                },
                series: [{
                    name: 'Population',
                    data: opts.Data,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            };

            return chartObj;
        };

        ChartFactory.prototype.SetupMonthLineChart = function(opts){

            var chartObj = {
                title: {
                    text: opts.Text,
                    x: -20 //center
                },
                subtitle: {
                    text: opts.subTitle,
                    x: -20
                },
                xAxis: {
                    categories: opts.Categories
                },
                yAxis: {
                    title: {
                        text: opts.yTitle
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: opts.Tooltip
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: opts.Series
            };

            return chartObj;
        };

        ChartFactory.prototype.BuildHeatMap = function (el, opts) {
        	var max = 0;
            var min = 0;
            opts.SeriesData.forEach(function(opt) {
                if (!isNaN(opt[2])) {
                    if (min > opt[2]) min = opt[2];
                    if (max < opt[2]) max = opt[2];
                }
            });
            var part = (max + 1 - min) / 3;
            var colors = ['red', 'yellow', 'green'];
            var chartObj = {
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'heatmap',
                    marginTop: 40,
                    marginBottom: 80,
                    plotBorderWidth: 1,
                    events: {
                        load: function () {
                            var points = this.series[0].data,
                                lenY = this.yAxis[0].tickPositions.length - 1,
                                lenX = this.xAxis[0].tickPositions.length - 1,
                                x = lenX,
                                tmpX = 0,
                                y = 0,
                                j = 0;

                            $.each(points, function (i, p) {
                                if (!isNaN(p.value)) {
                                    p.update({
                                        color: colors[parseInt(p.value / part)]
                                    }, false);
                                } else {
                                    var idx = 2;
                                    if (p.value.toLowerCase() === 'moderate') idx = 1;
                                    if (p.value.toLowerCase() === 'low') idx = 0;
                                    p.update({
                                        color: colors[idx]
                                    }, false);
                                }
                            });

                            this.isDirty = true;
                            this.redraw();
                        }
                    }
                },
                title: { text: opts.Title },
                xAxis: {
                    categories: opts.XCategories
                },
                yAxis: {
                    categories: opts.YCategories,
                    title: null
                },
                legend: false,
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> ratings <br><b>' +
                            this.point.value + '</b> for <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                    }
                },
                series: [{
                    name: opts.SeriesName,
                    borderWidth: 1,
                    data: opts.SeriesData,
                    dataLabels: {
                        enabled: true,
                        color: '#000000'
                    }
                }]
            };

            Highcharts.chart(el, chartObj);
        };
        
        ChartFactory.prototype.BuildHeatMap2 = function (el, opts) {
            var chartObj = {
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'heatmap',
                    marginTop: 40,
                    marginBottom: 80,
                    plotBorderWidth: 1,
                },
                title: { text: opts.Title },
                xAxis: {
                    categories: opts.XCategories
                },
                yAxis: {
                    categories: opts.YCategories,
                    title: null
                },
                legend: false,
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> ratings <br><b>' +
                            this.point.value + '</b> for <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                    }
                },
                series: [{
                    name: opts.SeriesName,
                    borderWidth: 1,
                    data: opts.SeriesData,
                    dataLabels: {
                        enabled: true,
                        color: '#000000'
                    }
                }]
            };

            Highcharts.chart(el, chartObj);
        };

        ChartFactory.prototype.CreateLineChart = function(title, data, chartEle){
            var month, opts = {
                Title: title,
                YText: "Values",
                Categories : [],
                Series: [
                    { name: "High", data: [] },
                    { name: "Medium", data: [] },
                    { name: "Low", data: [] }
                ],
                Colors: ['#ffa500', '#039220', '#33BBFF']
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

            var chartObj = {
                credits: {
                    enabled: false
                },
                title: {
                    text: opts.Title
                },
                subtitle: {
                    text: 'Monthly'
                },
                xAxis: {  categories: opts.Categories },
                yAxis: {
                    title: {
                        text: 'Values'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                series: opts.Series,
                colors: opts.Colors
            };

            return Highcharts.chart(chartEle, chartObj);
        };

        return new ChartFactory();
    });

})();

