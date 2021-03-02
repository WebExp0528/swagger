(function () {
    "use strict";
    app.service('RiskService', function ($rootScope, APIHandler, Utils) {

        this.GetUsers = function () {
            return APIHandler.Get('users');
        };

        this.GetRiskProfile = function () {
            return APIHandler.Get('risk/profile');
        };

        this.GetRiskProfileById = function (id) {
            return APIHandler.Get('risk/profile/' + id);
        };

        this.PostAction = function (params) {
            return APIHandler.Post('risk/profile/actions', params);
        };

        this.PutAction = function (id, params) {
            return APIHandler.Put('risk/profile/actions/' + id, params);
        };

        this.GetOneAction = function (id) {
            return APIHandler.Get('risk/profile/actions/' + id);
        };

        this.DeleteAction = function (id) {
            return APIHandler.Delete('risk/profile/actions/' + id);
        };

        this.GetActionsByRiskId = function (id) {
            return APIHandler.Get('risk/profile/actionsbyriskid/' + id);
        };

        this.AddRiskProfile = function (params) {
            return APIHandler.Post('risk/profile', params);
        };

        this.DeleteRiskProfile = function (id) {
            return APIHandler.Delete('risk/profile/' + id);
        };

        this.UpdateRiskProfile = function (id, params) {
            return APIHandler.Put('risk/profile/' + id, params);
        };
        
        this.GetRiskCategory = function() {
        	return APIHandler.Get('risk/profile/riskCategory');
        }
        
        this.GetControlData = function(){
            return APIHandler.Get('crtldata');
        };
        
        this.GetControlTestData = function(){
            return APIHandler.Get('controltestdata');
        };
        
        this.GetControlTestPlan = function () {
            return APIHandler.Get('crtls/testPlans');
        };
        
        /*
         * New Assessment APIs
         */
        this.GetAssessment = function () {
            return APIHandler.Get('assessment');
        };

        this.GetAssessmentById = function (id) {
            return APIHandler.Get('assessment/' + id);
        };
        
        this.AddAssessment = function (params) {
            return APIHandler.Post('assessment', params);
        };

        this.DeleteAssessment = function (id) {
            return APIHandler.Delete('assessment/' + id);
        };

        this.UpdateAssessment = function (id, params) {
            return APIHandler.Put('assessment/' + id, params);
        };

        this.GetDept = function(){
            return APIHandler.Get('assessment/dept');
        };

        this.GetTemplates = function(){
            return APIHandler.Get('assessment/templates');
        };

        this.GetPeriod = function(){
            return APIHandler.Get('assessment/period');
        };
        
        this.GetRegion = function(){
            return APIHandler.Get('assessment/region');
        };

        this.GetStatus = function(){
            return APIHandler.Get('assessment/status');
        };
        
        /*
         * NYDFS Assessment APIs
         */
        this.GetNYDFSAssessment = function () {
            return APIHandler.Get('assessment/nydfs/');
        };

        this.GetNYDFSAssessmentById = function (id) {
            return APIHandler.Get('assessment/nydfs/' + id);
        };
        
        this.AddNYDFSAssessment = function (params) {
            return APIHandler.Post('assessment/nydfs/', params);
        };

        this.DeleteNYDFSAssessment = function (id) {
            return APIHandler.Delete('assessment/nydfs/' + id);
        };

        this.UpdateNYDFSAssessment = function (id, params) {
            return APIHandler.Put('assessment/nydfs/' + id, params);
        };

        this.GetNYDFSDept = function(){
            return APIHandler.Get('assessment/nydfs/dept');
        };

        this.GetNYDFSPeriod = function(){
            return APIHandler.Get('assessment/nydfs/period');
        };
        
        this.GetNYDFSRegion = function(){
            return APIHandler.Get('assessment/nydfs/region');
        };

        this.GetNYDFSStatus = function(){
            return APIHandler.Get('assessment/nydfs/status');
        };
        
        /*
         * GDPR Assessment APIs
         */
        this.GetGDPRAssessment = function () {
            return APIHandler.Get('assessment/gdpr/');
        };

        this.GetGDPRAssessmentById = function (id) {
            return APIHandler.Get('assessment/gdpr/' + id);
        };
        
        this.AddGDPRAssessment = function (params) {
            return APIHandler.Post('assessment/gdpr/', params);
        };

        this.DeleteGDPRAssessment = function (id) {
            return APIHandler.Delete('assessment/gdpr/' + id);
        };

        this.UpdateGDPRAssessment = function (id, params) {
            return APIHandler.Put('assessment/gdpr/' + id, params);
        };

        this.GetGDPRDept = function(){
            return APIHandler.Get('assessment/gdpr/dept');
        };

        this.GetGDPRPeriod = function(){
            return APIHandler.Get('assessment/gdpr/period');
        };
        
        this.GetGDPRRegion = function(){
            return APIHandler.Get('assessment/gdpr/region');
        };

        this.GetGDPRStatus = function(){
            return APIHandler.Get('assessment/gdpr/status');
        };
        
        this.FileUpload = function (idd, fileModel) {
            if (fileModel.length < 1) {
                return APIHandler.NullPromise();
            }
            var formdata = new FormData();
            for (var i in fileModel) {
                if (fileModel[i].id != 'newfile') {
                    return APIHandler.NullPromise();
                }
                fileModel[i].id = idd + '_' + i;
                formdata.append("file", fileModel[i]._file);
            }
            var url = 'risk/' + idd + '/upload';
            return APIHandler.UploadFile(url, formdata);
        };

        this.FileDownload = function (idd) {
            var url = 'risk/download/' + idd;
            return APIHandler.Get(url);
        };
        
        this.DownloadExcel = function (params) {
            return APIHandler.Excel('/createExcel', params);
        };
    });
})();
