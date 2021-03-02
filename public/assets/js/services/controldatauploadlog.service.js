app.service('ControlDataUploadLogService', function ($rootScope, APIHandler, Utils) {
    this.GetRepos = function (size, page) {
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('crtlsdatauploadlog?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetRepo = function (id) {
        return APIHandler.Get('crtlsdatauploadlog/' + id);
    };

    this.AddRepo = function (params) {
        return APIHandler.Post('crtlsdatauploadlog/', params);
    };

    this.DeleteRepo = function (id) {
        return APIHandler.Delete('crtlsdatauploadlog/' + id);
    };

    this.UpdateRepo = function (id, params) {
        return APIHandler.Put('crtlsdatauploadlog/' + id, params);
    };
});