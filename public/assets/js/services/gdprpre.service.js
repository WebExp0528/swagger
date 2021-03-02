app.service('GDPRPreService', function(APIHandler){

    this.Get = function(){
        return APIHandler.Get('assessmentdata');
    };

    this.GetOne = function(id){
        return APIHandler.Get('assessmentdata/' + id);
    };

    this.Post = function(params){
        return APIHandler.Post('assessmentdata', params);
    };

    this.Delete = function(id){
        return APIHandler.Delete('assessmentdata/'+id);
    };

    this.Put = function(id, params){
        return APIHandler.Put('assessmentdata/'+id, params);
    };
    
    this.GetResponse = function(){
        return APIHandler.Get('assessmentdata/response');
    };

    this.GetOneResponse = function(id){
        return APIHandler.Get('assessmentdata/response/' + id);
    };

    this.PostResponse = function(params){
        return APIHandler.Post('assessmentdata/response', params);
    };

    this.DeleteResponse = function(id){
        return APIHandler.Delete('assessmentdata/response/'+id);
    };

    this.PutResponse = function(id, params){
        return APIHandler.Put('assessmentdata/response/'+id, params);
    };
    
    this.GetCategory = function(){
        return APIHandler.Get('assessmentdata/category');
    };

    this.GetOneCategory = function(id){
        return APIHandler.Get('assessmentdata/category/' + id);
    };

    this.PostCategory = function(params){
        return APIHandler.Post('assessmentdata/category', params);
    };

    this.DeleteCategory = function(id){
        return APIHandler.Delete('assessmentdata/category/'+id);
    };

    this.PutCategory = function(id, params){
        return APIHandler.Put('assessmentdata/category/'+id, params);
    };

    this.GetControl = function(){
        return APIHandler.Get('assessmentdata/control');
    };

    this.GetOneControl = function(id){
        return APIHandler.Get('assessmentdata/control/' + id);
    };

    this.PostControl = function(params){
        return APIHandler.Post('assessmentdata/control', params);
    };

    this.DeleteControl = function(id){
        return APIHandler.Delete('assessmentdata/control/'+id);
    };

    this.PutControl = function(id, params){
        return APIHandler.Put('assessmentdata/control/'+id, params);
    };
    
    this.DownloadExcel = function (params) {
        return APIHandler.Excel('/createExcel', params);
    };
    
    this.GetCategoryData = function(){
        return APIHandler.Get('assessmentdata/categorydata');
    };

    this.GetOneCategoryData = function(id){
        return APIHandler.Get('assessmentdata/categorydata/' + id);
    };

    this.PostCategoryData = function(params){
        return APIHandler.Post('assessmentdata/categordata', params);
    };

    this.DeleteCategoryData = function(id){
        return APIHandler.Delete('assessmentdata/categorydata/'+id);
    };

    this.PutCategoryData = function(id, params){
        return APIHandler.Put('assessmentdata/categorydata/'+id, params);
    };

});
