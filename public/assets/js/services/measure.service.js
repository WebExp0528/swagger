app.service('MeasureService', function(APIHandler){

    this.GetVuln = function(size, page){
        return APIHandler.Get('vulnerability');
    };

    this.GetOneVuln = function(id){
        return APIHandler.Get('vulnerability/' + id);
    };

    this.AddVuln = function(params){
        return APIHandler.Post('vulnerability/', params);
    };

    this.DeleteVuln = function(id){
        return APIHandler.Delete('vulnerability/' + id);
    };

    this.UpdateVuln = function(id, params){
        return APIHandler.Put('vulnerability/' + id, params);
    };

    this.FileDownloadVuln = function (id) {
        var url = 'vulnerability/download/stream/' + idd ;
        return APIHandler.Get(url);
    };

    this.GetFilesVuln = function(name) {
        return APIHandler.Get('vulnerability/files/' + name);
    };

    this.FileUploadVuln = function (idd, fileModel) {
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
        var url = 'vulnerability/' + idd + '/upload';
        return APIHandler.UploadFile(url, formdata);
    };

    /* Penetration Testing */
    this.GetPenTest = function(size, page){
        return APIHandler.Get('pentest');
    };

    this.GetOnePenTest = function(id){
        return APIHandler.Get('pentest/' + id);
    };

    this.AddPenTest = function(params){
        return APIHandler.Post('pentest/', params);
    };

    this.DeletePenTest = function(id){
        return APIHandler.Delete('pentest/' + id);
    };

    this.UpdatePenTest = function(id, params){
        return APIHandler.Put('pentest/' + id, params);
    };

    this.FileDownloadPenTest = function (id) {
        var url = 'pentest/download/stream/' + idd ;
        return APIHandler.Get(url);
    };

    this.GetFilesPenTest = function(name) {
        return APIHandler.Get('pentest/files/' + name);
    };

    this.FileUploadPenTest = function (idd, fileModel) {
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
        var url = 'pentest/' + idd + '/upload';
        return APIHandler.UploadFile(url, formdata);
    };
});
