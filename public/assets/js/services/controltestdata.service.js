app.service('ControlTestDataService', function(APIHandler){

    this.Get = function(){
        return APIHandler.Get('controltestdata');
    };

    this.GetOne = function(id){
        return APIHandler.Get('controltestdata/' + id);
    };

    this.Post = function(params){
        return APIHandler.Post('controltestdata', params);
    };

    this.Delete = function(id){
        return APIHandler.Delete('controltestdata/'+id);
    };

    this.Put = function(id, params){
        return APIHandler.Put('controltestdata/'+id, params);
    };
    
    this.GetByRiskId = function(id){
        return APIHandler.Get('controltestdata/byRiskId/'+id);
    };

});