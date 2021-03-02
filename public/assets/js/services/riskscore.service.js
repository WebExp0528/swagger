/**
 * Created by Nilang on 06/12/2017.
 */

app.service('RiskScoreService', function(APIHandler){

    this.Get = function(){
        return APIHandler.Get('riskscoring');
    };

    this.GetOne = function(id){
        return APIHandler.Get('riskscoring/' + id);
    };

    this.Post = function(params){
        return APIHandler.Post('riskscoring', params);
    };

    this.Delete = function(id){
        return APIHandler.Delete('riskscoring/'+id);
    };

    this.Put = function(id, params){
        return APIHandler.Put('riskscoring/'+id, params);
    };

});