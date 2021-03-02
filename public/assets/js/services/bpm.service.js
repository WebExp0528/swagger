app.service('BpmService', function(APIHandler){

    this.GetProcesses = function(size, page){
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('bpmprocess?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetEachProcess = function(id){
        return APIHandler.Get('bpmprocess/'+id);
    };

    this.AddProcess = function(param){
        return APIHandler.Post('bpmprocess', param);
    };

    this.UpdateProcess = function (id, params) {
        return APIHandler.Put('bpmprocess/' + id, params);
    };
    
    this.DeleteProcess = function (id) {
        return APIHandler.Delete('bpmprocess/' + id);
    };

    this.GetSubprocesses = function(size, page){
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('bpmsubprocess?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetEachSubprocess =  function(id){
        return APIHandler.Get('bpmsubprocess/' + id);
    };

    this.GetSubprocessByProcess =  function(process_id){
        return APIHandler.Get('bpmsubprocess/subprocessesByProcessId/' + process_id);
    };

    this.AddSubprocess = function(param){
        return APIHandler.Post('bpmsubprocess', param);
    };

    this.DeleteSubprocess = function (id) {
        return APIHandler.Delete('bpmsubprocess/' + id);
    };
    
    this.UpdateSubprocess = function (id, params) {
        return APIHandler.Put('bpmsubprocess/' + id, params);
    };

    this.GetActivities = function(size, page){
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('bpmactivity?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetEachActivity = function(id){
        return APIHandler.Get('bpmactivity/'+id);
    };

    this.GetActivityBySubprocess =  function(subprocess_id){
        return APIHandler.Get('bpmactivity/activitiesBySubprocessId/' + subprocess_id);
    };

    this.AddActivity = function(param){
        return APIHandler.Post('bpmactivity', param);
    };
    
    this.DeleteActivity = function (id) {
        return APIHandler.Delete('bpmactivity/' + id);
    };
    
    this.UpdateActivity = function (id, params) {
        return APIHandler.Put('bpmactivity/' + id, params);
    };

    this.GetAttestations = function(size, page){
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('bpmattestation?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetAttestation = function(id){
        return APIHandler.Get('bpmattestation/' +id);
    };
    
    this.AddAttestation = function(param){
        return APIHandler.Post('bpmattestation', param);
    };
    
    this.DeleteAttestation = function (id) {
        return APIHandler.Delete('bpmattestation/' + id);
    };

    this.GetAttestationByActivity = function(activity_id){
        return APIHandler.Get('bpmattestation/attestationsByActivityId/'+activity_id);
    };

    this.ReviewAttestation = function(id, params){
        return APIHandler.Put('bpmattestation/'+id, params);
    };
    
    this.UpdateAttestation = function (id, params) {
        return APIHandler.Put('bpmattestation/' + id, params);
    };

    this.GetManageDept = function(){
        return APIHandler.Get('bpmprocess/dept');
    };

    this.GetActivityOpen = function(){
        return APIHandler.Get('bpmactivity/openactivities');
    };

    this.GetPolicyDocs = function(size, page){
        return APIHandler.Get('policies/policydocs');
    };

    this.GetManageStatus = function(){
        return APIHandler.Get('bpmprocess/status');
    };

    this.GetManageRegion =  function() {
        return APIHandler.Get('bpmprocess/region');
    };

    this.GetManagePeriod = function() {
        return APIHandler.Get('bpmprocess/period');
    };

    this.GetAttestationStatus = function() {
        return APIHandler.Get('bpmattestation/status');
    };

    this.GetControlData = function() {
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
        var url = 'bpmprocess/' + idd + '/upload';
        return APIHandler.UploadFile(url, formdata);
    };

    this.AttestationFileUpload = function (idd, fileModel) {
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
        var url = 'bpmattestation/' + idd + '/upload';
        return APIHandler.UploadFile(url, formdata);
    };

    this.FileDownload = function(idd){
        var url = 'bpmprocess/download/' + idd;
        return APIHandler.Get(url);
    };

});
