app.service('OwaspService', function(APIHandler){

    this.Get = function(size, page){
        return APIHandler.Get('owasp');
    };

    this.GetOne = function(id){
        return APIHandler.Get('owasp/' + id);
    };

    this.Add = function(params){
        return APIHandler.Post('owasp/', params);
    };

    this.Delete = function(id){
        return APIHandler.Delete('owasp/' + id);
    };

    this.Update = function(id, params){
        return APIHandler.Put('owasp/' + id, params);
    };

});