'use strict';

app.service('AssessmentService', ['APIHandler', '$localStorage', function (APIHandler, $localStorage) {
	this.GetRiskType = function () {
        return APIHandler.Get('vendorriskassessmenttype');
    };
    this.GetUserList = function () {
        return APIHandler.Get('users');
    };
    this.GetCollectionFromControl = function (sourceName) {
        return APIHandler.Get('crtldata/vr/questions?sourcename=' + sourceName);
    };
    this.DownloadExcel = function (params) {
        return APIHandler.Excel('/createExcel', params);
    };
    this.GetCollectionFromControlDataByRiskType = function(riskType){
        return APIHandler.Get('crtldata/riskTypes?riskType=' + riskType);
    };
}]);