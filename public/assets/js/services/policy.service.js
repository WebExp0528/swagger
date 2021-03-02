/**
 * Created by Precision on 03/01/2017.
 */

app.service('PolicyService', function(APIHandler){

    this.GetPolicies = function(size, page){
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('policies?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetPolicy = function(id){
        return APIHandler.Get('policies/' + id);
    };

    this.AddPolicy = function(params){
        return APIHandler.Post('policies/', params);
    };

    this.DeletePolicy = function(id){
        return APIHandler.Delete('policies/' + id);
    };

    this.UpdatePolicy = function(id, params){
        return APIHandler.Put('policies/' + id, params);
    };

    this.GetPolicyDocs = function(size, page){
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('policies/policydocs?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetPolicyDoc = function(id){
        return APIHandler.Get('policies/policydocs/' + id);
    };

    this.GetPolicyBusinessProcess = function() {
        return APIHandler.Get('policies/businessprocess/');
    }

    this.AddPolicyDoc = function(params){
        return APIHandler.Post('policies/policydocs/', params);
    };

    this.DeletePolicyDoc = function(id){
        return APIHandler.Delete('policies/policydocs/' + id);
    };

    this.UpdatePolicyDoc = function(id, params){
        return APIHandler.Put('policies/policydocs/' + id, params);
    };

    this.GetPolicyByProcess = function(){
        return APIHandler.Get('policies/policydocs/byprocess/');
    };

    this.GetPolicyByType = function(){
        return APIHandler.Get('policies/policydocs/bytype/');
    };

    this.GetPolicyBySource = function(){
        return APIHandler.Get('policies/policydocs/bysource/');
    };

    this.GetPolicyByDept = function(){
        return APIHandler.Get('policies/policydocs/bydepartment/');
    };

    this.GetPolicyDocsByProcess = function(){
        return APIHandler.Get('policies/byprocess/');
    };

    this.GetPolicyDocsByType = function(){
        return APIHandler.Get('policies/bytype/');
    };

    this.GetPolicyDocsBySource = function(){
        return APIHandler.Get('policies/bysource/');
    };

    this.GetPolicyDocsByDept = function(){
        return APIHandler.Get('policies/bydepartment/');
    };



    this.FileUpload = function (idd, fileModel) {
        if(!fileModel || fileModel.length < 1){
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
        var url = 'policies/' + idd + '/upload';
        return APIHandler.UploadFile(url, formdata);
    };

    this.FileDownload = function(idd, path){
        var url = 'policies/download/stream/' + idd ;
        return APIHandler.Get(url);
    };

    //approvers

    this.AddPolicyApprover = function(params, id){
        return APIHandler.Post(`policies/${id}/approvers/`, params);
    };
    this.AddPolicyDocsApprover = function(params, id){
        return APIHandler.Post(`policies/policydocs/${id}/approvers/`, params);
    };
    
    this.UpdatePolicyApprover = function(id, params){
        return APIHandler.Put(`policies/policydocs/approvers/${id}`, params);
    };

    this.GetAllPolicyApprovers = function(page, size){
        size = size || 10;
        page = page || 1;
        return APIHandler.Get(`policies/policydocs/approvers?pagesize=${size}&pageNumber=${page}`);
    };

    this.GetPolicyApprover = function(id){
        return APIHandler.Get(`policies/policydocs/approvers/${id}`);
    };

    this.DeletePolicyApprover = function(policyId, id){
        return APIHandler.Delete(`policies/approvers/${id}/`);
    };

    this.DeletePolicyDocsApprover = function(policyDocsId, id){
        return APIHandler.Delete(`policies/policydocs/approvers/${id}/`);
    };

    this.GetAllVersions = function(id){
        return APIHandler.Get(`policies_history/versions/${id}`);
    };

    this.SaveVersion = function(params){
        return APIHandler.Post('policies_history/', params);
    };

    this.GetOneHistory = function(id){
        return APIHandler.Get(`policies_history/${id}/`, params);
    };

});
