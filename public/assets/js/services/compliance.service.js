app.service('ComplianceService', function (APIHandler) {

    this.GetSOXTPs = function (size, page) {
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('compliance/soxtp?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetSOXTP = function (id) {
        return APIHandler.Get('compliance/soxtp/' + id);
    };

    this.AddSOXTP = function () {
        return APIHandler.Post('compliance/soxtp/');
    };

    this.DeleteSOXTP = function (id) {
        return APIHandler.Delete('compliance/soxtp/' + id);
    };

    this.UpdateSOXTP = function (id, params) {
        return APIHandler.Put('compliance/soxtp/' + id, params);
    };
    
    this.GetSOXTPTemplate = function(){
        return APIHandler.Get('compliance/soxtp/templates');
    };

    this.GetSOXRCMs = function (size, page) {
        return APIHandler.Get('compliance/soxrcm?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetSOXRCM = function (id) {
        return APIHandler.Get('compliance/soxrcm/' + id);
    };

    this.AddSOXRCM = function (params) {
        return APIHandler.Post('compliance/soxrcm/' + params);
    };

    this.DeleteSOXRCM = function (id) {
        return APIHandler.Delete('compliance/soxrcm/' + id);
    };

    this.UpdateSOXRCM = function (id, params) {
        return APIHandler.Put('compliance/soxrcm/' + id, params);
    };
    
    this.GetSOXRCMTemplate = function(){
        return APIHandler.Get('compliance/soxrcm/templates');
    };

    this.GetSOXPRAs = function (size, page) {
        return APIHandler.Get('compliance/soxpra?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetSOXPRA = function (id) {
        return APIHandler.Get('compliance/soxpra/' + id);
    };

    this.AddSOXPRA = function (params) {
        return APIHandler.Post('compliance/soxpra/' + params);
    };

    this.DeleteSOXPRA = function (id) {
        return APIHandler.Delete('compliance/soxpra/' + id);
    };

    this.UpdateSOXPRA = function (id, params) {
        return APIHandler.Put('compliance/soxpra/' + id, params);
    };
    
    this.GetSOXPRATemplate = function(){
        return APIHandler.Get('compliance/soxpra/templates');
    };

    this.GetUsers = function () {
        return APIHandler.Get('users');
    };

    this.GetSOXPRADept = function () {
        return APIHandler.Get('compliance/soxpra/dept');
    };

    this.GetSOXPRAPeriod = function () {
        return APIHandler.Get('compliance/soxpra/period');
    };

    this.GetSOXPRARegion = function () {
        return APIHandler.Get('compliance/soxpra/region');
    };

    this.GetSOXPRAStatus = function () {
        return APIHandler.Get('compliance/soxpra/status');
    };

    this.GetSOXRCMDept = function () {
        return APIHandler.Get('compliance/soxrcm/dept');
    };

    this.GetSOXRCMPeriod = function () {
        return APIHandler.Get('compliance/soxrcm/period');
    };

    this.GetSOXRCMRegion = function () {
        return APIHandler.Get('compliance/soxrcm/region');
    };

    this.GetSOXRCMStatus = function () {
        return APIHandler.Get('compliance/soxrcm/status');
    };

    this.GetSOXTPDept = function () {
        return APIHandler.Get('compliance/soxtp/dept');
    };

    this.GetSOXTPPeriod = function () {
        return APIHandler.Get('compliance/soxtp/period');
    };

    this.GetSOXTPRegion = function () {
        return APIHandler.Get('compliance/soxtp/region');
    };

    this.GetSOXTPStatus = function () {
        return APIHandler.Get('/compliance/soxtp/status');
    };

    this.DownloadExcel = function (params) {
        return APIHandler.Excel('/createExcel', params);
    };
    this.ExcelDownload = function (params) {
        return APIHandler.Excel('/xlsx', params);
    };

    this.DTExcelDownload = function (param) {
        return APIHandler.Excel('/control_xlsx', param);
    };

    this.GetSOXPRAAssessments = function () {
        return APIHandler.Get('compliance/soxpra');
    };

    this.GetSOXPRAAssessment = function (id) {
        return APIHandler.Get('compliance/soxpra/' + id);
    };

    this.PostSOXPRAAssessment = function (params) {
        return APIHandler.Post('compliance/soxpra', params);
    };

    this.DeleteSOXPRAAssessment = function (id) {
        return APIHandler.Delete('compliance/soxpra/' + id);
    };

    this.UpdateSOXPRAAssessment = function (id, params) {
        return APIHandler.Put('compliance/soxpra/' + id, params);
    };

    this.GetSOXRCMAssessments = function () {
        return APIHandler.Get('compliance/soxrcm');
    };

    this.GetSOXRCMAssessment = function (id) {
        return APIHandler.Get('compliance/soxrcm/' + id);
    };

    this.PostSOXRCMAssessment = function (params) {
        return APIHandler.Post('compliance/soxrcm', params);
    };

    this.DeleteSOXRCMAssessment = function (id) {
        return APIHandler.Delete('compliance/soxrcm/' + id);
    };

    this.UpdateSOXRCMAssessment = function (id, params) {
        return APIHandler.Put('compliance/soxrcm/' + id, params);
    };
    this.GetSOXTPAssessments = function () {
        return APIHandler.Get('compliance/soxtp');
    };

    this.GetSOXTPAssessment = function (id) {
        return APIHandler.Get('compliance/soxtp/' + id);
    };

    this.PostSOXTPAssessment = function (params) {
        return APIHandler.Post('compliance/soxtp', params);
    };

    this.DeleteSOXTPAssessment = function (id) {
        return APIHandler.Delete('compliance/soxtp/' + id);
    };

    this.UpdateSOXTPAssessment = function (id, params) {
        return APIHandler.Put('compliance/soxtp/' + id, params);
    };
    
    // AML/KYC
    this.GetAMLKYCTPs = function (size, page) {
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('compliance/amlkyctp?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetAMLKYCTP = function (id) {
        return APIHandler.Get('compliance/amlkyctp/' + id);
    };

    this.AddAMLKYCTP = function () {
        return APIHandler.Post('compliance/amlkyctp/');
    };

    this.DeleteAMLKYCTP = function (id) {
        return APIHandler.Delete('compliance/amlkyctp/' + id);
    };

    this.UpdateAMLKYCTP = function (id, params) {
        return APIHandler.Put('compliance/amlkyctp/' + id, params);
    };
    
    this.GetAMLKYCTPTemplate = function(){
        return APIHandler.Get('compliance/amlkyctp/templates');
    };
    
    this.GetAMLKYCTPAssessments = function () {
        return APIHandler.Get('compliance/amlkyctp');
    };

    this.GetAMLKYCTPAssessment = function (id) {
        return APIHandler.Get('compliance/amlkyctp/' + id);
    };

    this.PostAMLKYCTPAssessment = function (params) {
        return APIHandler.Post('compliance/amlkyctp', params);
    };

    this.DeleteAMLKYCTPAssessment = function (id) {
        return APIHandler.Delete('compliance/amlkyctp/' + id);
    };

    this.UpdateAMLKYCTPAssessment = function (id, params) {
        return APIHandler.Put('compliance/amlkyctp/' + id, params);
    };
    
    this.GetAMLKYCTPDept = function () {
        return APIHandler.Get('compliance/amlkyctp/dept');
    };

    this.GetAMLKYCTPPeriod = function () {
        return APIHandler.Get('compliance/amlkyctp/period');
    };

    this.GetAMLKYCTPRegion = function () {
        return APIHandler.Get('compliance/amlkyctp/region');
    };

    this.GetAMLKYCTPStatus = function () {
        return APIHandler.Get('compliance/amlkyctp/status');
    };
    // AML/KYC
    
    // PCIDSS
    this.GetPCIDSS = function (id) {
        return APIHandler.Get('compliance/pcidss/' + id);
    };

    this.AddPCIDSS = function () {
        return APIHandler.Post('compliance/pcidss/');
    };

    this.DeletePCIDSS = function (id) {
        return APIHandler.Delete('compliance/pcidss/' + id);
    };

    this.UpdatePCIDSS = function (id, params) {
        return APIHandler.Put('compliance/pcidss/' + id, params);
    };
    
    this.GetPCIDSSTemplate = function(){
        return APIHandler.Get('compliance/pcidss/templates');
    };
    
    this.GetPCIDSSAssessments = function () {
        return APIHandler.Get('compliance/pcidss');
    };

    this.GetPCIDSSAssessment = function (id) {
        return APIHandler.Get('compliance/pcidss/' + id);
    };

    this.PostPCIDSSAssessment = function (params) {
        return APIHandler.Post('compliance/pcidss', params);
    };

    this.DeletePCIDSSAssessment = function (id) {
        return APIHandler.Delete('compliance/pcidss/' + id);
    };

    this.UpdatePCIDSSAssessment = function (id, params) {
        return APIHandler.Put('compliance/pcidss/' + id, params);
    };
    
    this.GetPCIDSSDept = function () {
        return APIHandler.Get('compliance/pcidss/dept');
    };

    this.GetPCIDSSPeriod = function () {
        return APIHandler.Get('compliance/pcidss/period');
    };

    this.GetPCIDSSRegion = function () {
        return APIHandler.Get('compliance/pcidss/region');
    };

    this.GetPCIDSSStatus = function () {
        return APIHandler.Get('compliance/pcidss/status');
    };
    // PCIDSS
    
    // Volcker
    this.GetVOLCKERTPs = function (size, page) {
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('compliance/volckertp?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetVOLCKERTP = function (id) {
        return APIHandler.Get('compliance/volckertp/' + id);
    };

    this.AddVOLCKERTP = function () {
        return APIHandler.Post('compliance/volckertp/');
    };

    this.DeleteVOLCKERTP = function (id) {
        return APIHandler.Delete('compliance/volckertp/' + id);
    };

    this.UpdateVOLCKERTP = function (id, params) {
        return APIHandler.Put('compliance/volckertp/' + id, params);
    };
    
    this.GetVOLCKERTPTemplate = function(){
        return APIHandler.Get('compliance/volckertp/templates');
    };
    
    this.GetVOLCKERTPAssessments = function () {
        return APIHandler.Get('compliance/volckertp');
    };

    this.GetVOLCKERTPAssessment = function (id) {
        return APIHandler.Get('compliance/volckertp/' + id);
    };

    this.PostVOLCKERTPAssessment = function (params) {
        return APIHandler.Post('compliance/volckertp', params);
    };

    this.DeleteVOLCKERTPAssessment = function (id) {
        return APIHandler.Delete('compliance/volckertp/' + id);
    };

    this.UpdateVOLCKERTPAssessment = function (id, params) {
        return APIHandler.Put('compliance/volckertp/' + id, params);
    };
    
    this.GetVOLCKERTPDept = function () {
        return APIHandler.Get('compliance/volckertp/dept');
    };

    this.GetVOLCKERTPPeriod = function () {
        return APIHandler.Get('compliance/volckertp/period');
    };

    this.GetVOLCKERTPRegion = function () {
        return APIHandler.Get('compliance/volckertp/region');
    };

    this.GetVOLCKERTPStatus = function () {
        return APIHandler.Get('/compliance/volckertp/status');
    };
    // Volcker
    
    // SOC
    this.GetSOCTPs = function (size, page) {
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('compliance/soctp?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetSOCTP = function (id) {
        return APIHandler.Get('compliance/soctp/' + id);
    };

    this.AddSOCTP = function () {
        return APIHandler.Post('compliance/soctp/');
    };

    this.DeleteSOCTP = function (id) {
        return APIHandler.Delete('compliance/soctp/' + id);
    };

    this.UpdateSOCTP = function (id, params) {
        return APIHandler.Put('compliance/soctp/' + id, params);
    };
    
    this.GetSOCTPTemplate = function(){
        return APIHandler.Get('compliance/soctp/templates');
    };
    
    this.GetSOCTPAssessments = function () {
        return APIHandler.Get('compliance/soctp');
    };

    this.GetSOCTPAssessment = function (id) {
        return APIHandler.Get('compliance/soctp/' + id);
    };

    this.PostSOCTPAssessment = function (params) {
        return APIHandler.Post('compliance/soctp', params);
    };

    this.DeleteSOCTPAssessment = function (id) {
        return APIHandler.Delete('compliance/soctp/' + id);
    };

    this.UpdateSOCTPAssessment = function (id, params) {
        return APIHandler.Put('compliance/soctp/' + id, params);
    };
    
    this.GetSOCTPDept = function () {
        return APIHandler.Get('compliance/soctp/dept');
    };

    this.GetSOCTPPeriod = function () {
        return APIHandler.Get('compliance/soctp/period');
    };

    this.GetSOCTPRegion = function () {
        return APIHandler.Get('compliance/soctp/region');
    };

    this.GetSOCTPStatus = function () {
        return APIHandler.Get('/compliance/soctp/status');
    };
    // SOC
    
    this.GetQuestionsFromControl = function (sourceName) {
        return APIHandler.Get('crtldata/vr/questions?sourcename=' + sourceName);
    };
    
    this.GetControlData = function () {
        return APIHandler.Get('crtldata');
    };

    this.FileUpload = function (idd, fileModel) {
        if(fileModel.length < 1){
            return APIHandler.NullPromise();
        }
        var formdata = new FormData();
        for (var i in fileModel) {
            if(fileModel[i].id != 'newfile'){
                return APIHandler.NullPromise();
            }
            fileModel[i].id = idd + '_' + i;
            formdata.append("file", fileModel[i]._file);
        }
        var url = 'compliance/' + idd + '/upload';
        return APIHandler.UploadFile(url, formdata);
    };

    this.FileDownload = function(idd){
        var url = 'compliance/download/' + idd;
        return APIHandler.Get(url);
    };
});

