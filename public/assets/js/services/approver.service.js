/**
 * Created by Roma on 03/09/2017.
 */

app.service('ApproverService', function(APIHandler){

    this.Get = function(size, page){
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('approver?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetOne = function(id){
        return APIHandler.Get('approver/' + id);
    };

    this.Post = function(params){
        return APIHandler.Post('approver', params);
    };

    this.Delete = function(id){
        return APIHandler.Delete('approver/'+id);
    };

    this.Put = function(id, params){
        return APIHandler.Put('approver/'+id, params);
    };

});
