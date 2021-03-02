app.service('DataInventoryService', function(APIHandler){

	/* Asset Inventory */
    this.GetAsset = function(size, page) {
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('datainventory/assetinventory?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetOneAsset = function(id){
        return APIHandler.Get('datainventory/assetinventory/' + id);
    };

    this.PostAsset = function(params){
        return APIHandler.Post('datainventory/assetinventory', params);
    };

    this.DeleteAsset = function(id){
        return APIHandler.Delete('datainventory/assetinventory/'+id);
    };

    this.PutAsset = function(id, params){
        return APIHandler.Put('datainventory/assetinventory/'+id, params);
    };
    
    /* Data Models */
    this.GetDataModels = function(size, page) {
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('datainventory/datamodel?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetOneDataModel = function(id){
        return APIHandler.Get('datainventory/datamodel/' + id);
    };

    this.PostDataModel = function(params){
        return APIHandler.Post('datainventory/datamodel', params);
    };

    this.DeleteDataModel = function(id){
        return APIHandler.Delete('datainventory/datamodel/'+id);
    };

    this.PutDataModel = function(id, params){
        return APIHandler.Put('datainventory/datamodel/'+id, params);
    };
    
    /* Data Mappings */
    this.GetDataMappings = function(size, page) {
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('datainventory/datamapping?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetOneDataMapping = function(id){
        return APIHandler.Get('datainventory/datamapping/' + id);
    };

    this.PostDataMapping = function(params){
        return APIHandler.Post('datainventory/datamapping', params);
    };

    this.DeleteDataMapping = function(id){
        return APIHandler.Delete('datainventory/datamapping/'+id);
    };

    this.PutDataMapping = function(id, params){
        return APIHandler.Put('datainventory/datamapping/'+id, params);
    };
    
    /* MetaData */
    this.GetMetadata = function(size, page) {
        size = size || 10;
        page = page || 1;
        return APIHandler.Get('datainventory/metadata?pagesize=' + size + '&pageNumber=' + page);
    };

    this.GetOneMetadata = function(id){
        return APIHandler.Get('datainventory/metadata/' + id);
    };

    this.PostMetadata = function(params){
        return APIHandler.Post('datainventory/metadata', params);
    };

    this.DeleteMetadata = function(id){
        return APIHandler.Delete('datainventory/metadata/'+id);
    };

    this.PutMetadata = function(id, params){
        return APIHandler.Put('datainventory/metadata/'+id, params);
    };
    
    this.FileUpload = function (idd, fileModel) {
        if(fileModel == null || fileModel.length < 1){
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
        var url = 'datainventory/' + idd + '/upload';
        return APIHandler.UploadFile(url, formdata);
    };
    
    this.FileDownload = function(idd){
        var url = 'datainventory/download/stream/' + idd ;
        return APIHandler.Get(url);
    };
    
    /* Download Excel */
    this.DownloadExcel = function (params) {
        return APIHandler.Excel('/createExcel', params);
    };

});