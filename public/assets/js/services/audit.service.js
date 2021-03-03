/**
 * Created by Precision on 03/01/2017.
 */

app.service('AuditService', function (APIHandler) {
  /* ----------------------------- Audit API Calls ---------------------------- */

  this.GetAudits = function (size, page) {
    size = size || 10;
    page = page || 1;
    return APIHandler.Get('auditmgmt?pagesize=' + size + '&pageNumber=' + page);
  };

  this.GetEachAudit = function (id) {
    return APIHandler.Get('auditmgmt/' + id);
  };

  this.AddAudits = function (param) {
    return APIHandler.Post('auditmgmt', param);
  };

  this.UpdateAudit = function (id, param) {
    return APIHandler.Put('auditmgmt/' + id, param);
  };

  this.DeleteAudit = function (id) {
    return APIHandler.Delete('auditmgmt/' + id);
  };

  /* ---------------------------- Topics API Calls ---------------------------- */

  this.GetTopics = function (size, page) {
    size = size || 10;
    page = page || 1;
    return APIHandler.Get(
      'audittopic?pagesize=' + size + '&pageNumber=' + page
    );
  };

  this.GetEachTopic = function (id) {
    return APIHandler.Get('audittopic/' + id);
  };

  this.GetTopicByAudit = function (audit_id) {
    return APIHandler.Get('audittopic/topicsByAuditId/' + audit_id);
  };

  this.AddTopic = function (param) {
    return APIHandler.Post('audittopic', param);
  };

  this.DeleteTopic = function (id) {
    return APIHandler.Delete('audittopic/' + id);
  };

  this.UpdateTopic = function (id, param) {
    return APIHandler.Put('audittopic/' + id, param);
  };

  /* --------------------------- Findings API Calls --------------------------- */

  this.GetFindings = function (size, page) {
    size = size || 10;
    page = page || 1;
    return APIHandler.Get(
      'auditfindings?pagesize=' + size + '&pageNumber=' + page
    );
  };

  this.GetEachFinding = function (id) {
    return APIHandler.Get('auditfindings/' + id);
  };

  this.GetFindingByTopic = function (topic_id) {
    return APIHandler.Get('auditfindings/findingsByTopicId/' + topic_id);
  };

  this.AddFinding = function (param) {
    return APIHandler.Post('auditfindings', param);
  };

  this.DeleteFinding = function (id) {
    return APIHandler.Delete('auditfindings/' + id);
  };

  this.UpdateFinding = function (id, param) {
    return APIHandler.Put('auditfindings/' + id, param);
  };

  /* ----------------------------- Task API Calls ----------------------------- */

  this.GetTasks = function (size, page) {
    size = size || 10;
    page = page || 1;
    return APIHandler.Get(
      'audittasks?pagesize=' + size + '&pageNumber=' + page
    );
  };

  this.GetEachTask = function (id) {
    return APIHandler.Get('audittasks/' + id);
  };

  this.GetTaskByTopic = function (topic_id) {
    return APIHandler.Get('audittasks/findingsByTopicId/' + topic_id);
  };

  this.AddTask = function (param) {
    return APIHandler.Post('audittasks', param);
  };

  this.DeleteTask = function (id) {
    return APIHandler.Delete('audittasks/' + id);
  };

  this.UpdateTask = function (id, param) {
    return APIHandler.Put('audittasks/' + id, param);
  };

  /* ---------------------------- Action API Calls ---------------------------- */

  this.AddAction = function (param) {
    return APIHandler.Post('auditactions', param);
  };

  this.DeleteAction = function (action_id) {
    return APIHandler.Delete('auditactions/' + action_id);
  };

  this.GetActions = function (size, page) {
    size = size || 10;
    page = page || 1;
    return APIHandler.Get(
      'auditactions?pagesize=' + size + '&pageNumber=' + page
    );
  };

  this.GetAction = function (id) {
    return APIHandler.Get('auditactions/' + id);
  };

  this.AddAction = function (param) {
    return APIHandler.Post('auditactions', param);
  };

  this.DeleteAction = function (id) {
    return APIHandler.Delete('auditactions/' + id);
  };

  this.UpdateAction = function (id, param) {
    return APIHandler.Put('auditactions/' + id, param);
  };

  this.GetActionByFinding = function (finding_id) {
    //return APIHandler.Get('auditactions');
    return APIHandler.Get('auditactions/actionsByFindingId/' + finding_id);
  };

  this.ReviewAction = function (id, params) {
    return APIHandler.Put('auditactions/' + id, params);
  };

  this.GetManageDept = function () {
    return APIHandler.Get('auditmgmt/dept');
  };

  this.GetFindingOpen = function () {
    return APIHandler.Get('auditfindings/openfindings');
  };

  this.GetPolicyDocs = function (size, page) {
    return APIHandler.Get('policies/policydocs');
  };

  this.GetManageStatus = function () {
    return APIHandler.Get('auditmgmt/status');
  };

  this.GetManageRegion = function () {
    return APIHandler.Get('auditmgmt/region');
  };

  this.GetManagePeriod = function () {
    return APIHandler.Get('auditmgmt/period');
  };

  this.GetManagePhase = function () {
    return APIHandler.Get('auditmgmt/phase');
  };

  this.GetActionStatus = function () {
    return APIHandler.Get('auditactions/status');
  };

  this.GetControlData = function () {
    return APIHandler.Get('crtldata');
  };

  this.GetRCSA = function () {
    return APIHandler.Get('rcsa');
  };

  this.FileUpload = function (idd, fileModel) {
    if (fileModel.length < 1) {
      return APIHandler.NullPromise();
    }
    var formdata = new FormData();
    for (var i in fileModel) {
      if (fileModel[i].id != 'newfile') {
        return APIHandler.NullPromise();
      }
      fileModel[i].id = idd + '_' + i;
      formdata.append('file', fileModel[i]._file);
    }
    var url = 'auditmgmt/' + idd + '/upload';
    return APIHandler.UploadFile(url, formdata);
  };

  this.ActionFileUpload = function (idd, fileModel) {
    if (fileModel.length < 1) {
      return APIHandler.NullPromise();
    }
    var formdata = new FormData();
    for (var i in fileModel) {
      if (fileModel[i].id != 'newfile') {
        return APIHandler.NullPromise();
      }
      fileModel[i].id = idd + '_' + i;
      formdata.append('file', fileModel[i]._file);
    }
    var url = 'auditactions/' + idd + '/upload';
    return APIHandler.UploadFile(url, formdata);
  };

  this.FileDownload = function (idd) {
    var url = 'auditmgmt/download/' + idd;
    return APIHandler.Get(url);
  };
});
