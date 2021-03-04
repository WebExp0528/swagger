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

  /**
   * Generate Report
   */
  this.GenerateSummaryReport = function (data) {
    const {
      auditBackground = '',
      auditScope = '',
      auditObjectives = '',
      auditRecommendations = '',
      auditManagementResponse = '',
      overallRiskScore = '',
      overallRiskRating = '',
    } = data;

    const doc = new docx.Document({
      creator: 'Ansri',
      description: 'Audit Report',
      title: 'Audit Report',
    });

    doc.addSection({
      properties: {},
      children: [
        new docx.Paragraph({
          text: 'BACKGROUND AND SCOPE',
          heading: docx.HeadingLevel.HEADING_1,
        }),
        new docx.Paragraph({
          text: auditBackground,
        }),
        new docx.Paragraph({
          text: auditScope,
        }),
        new docx.Paragraph({
          text: auditObjectives,
        }),
        new docx.Paragraph({
          text: 'RATING AND CONCLUSIONS',
          heading: docx.HeadingLevel.HEADING_1,
        }),
        new docx.Paragraph({
          text: `Rating = ${0}`,
        }),
        new docx.Paragraph({
          text:
            'In our opinion, the present system of controls being exercised in regard to the management of the Bank’s investment portfolio is satisfactory although one area of improvement was noted surrounding vendor internal controls reviews.',
        }),
        new docx.Paragraph({
          text: 'FINDINGS AND RECOMMENDATIONS',
          heading: docx.HeadingLevel.HEADING_1,
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: `Third-Party Internal Controls Review (Low):`,
              underline: {
                type: docx.UnderlineType.DOUBLE,
                color: '990011',
              },
            }),
            new docx.TextRun({
              text: `A vendor management “internal control review” over the bank’s investment software was not clearly identified. The Finance department uses the third-party COCC Investment Portfolio system for the Bank’s investment accounting software. The Operational Risk department is responsible for obtaining vendor information, performing an internal control review and requesting the appropriate bank management sign off on the review to ensure they are aware of their third-party risks. Per review of the internal controls review for COCC, this review did not specifically indicate internal controls related to the investment software. Per inquiry with management, Finance does not receive an internal control review over their investment software to review and sign off on.`,
            }),
          ],
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: `Recommendation:`,
              underline: {
                type: docx.UnderlineType.DOUBLE,
                color: '990011',
              },
            }),
            new docx.TextRun({
              text: auditRecommendations,
            }),
          ],
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: `Management Response:`,
              italics: true,
            }),
            new docx.TextRun({
              text: auditManagementResponse,
              italics: true,
            }),
          ],
        }),
        new docx.Paragraph({
          text: 'Overall Risk Score',
          heading: docx.HeadingLevel.HEADING_1,
        }),
        new docx.Paragraph({
          text: overallRiskScore,
        }),
        new docx.Paragraph({
          text: 'Overall Risk Rating',
          heading: docx.HeadingLevel.HEADING_1,
        }),
        new docx.Paragraph({
          text: overallRiskRating,
        }),
        // new docx.Paragraph({
        //   text: 'Test Audit Name', //TODO: Add audit name
        // }),
        // new docx.Paragraph({
        //   text: 'Test Company Address', //TODO: Add company address
        // }),
        // new docx.Paragraph({
        //   text: 'AUDIT TYPE: INTERNAL AUDIT\nISSUANCE DATE:  [INSERT DATE]', //TODO: Add issuance date
        // }),
        // new docx.TableOfContents('Summary', {
        //   hyperlink: true,
        //   headingStyleRange: '1-3',
        //   stylesWithLevels: [new docx.StyleLevel('MySpectacularStyle', 1)],
        // }),
        // new docx.Paragraph({
        //   text: 'AUDIT ISSUANCE LETTER',
        //   heading: docx.HeadingLevel.HEADING_1,
        //   pageBreakBefore: true,
        // }),
        // new docx.Paragraph({
        //   children: [
        //     new docx.TextRun({
        //       text: `Issuance Date:  [Insert Date}`, //TODO: ADD
        //       underline: {
        //         type: docx.UnderlineType.DOUBLE,
        //         color: '990011',
        //       },
        //     }),
        //   ],
        // }),
        // new docx.Paragraph({
        //   text: 'Report Distribution',
        //   heading: docx.HeadingLevel.HEADING_2,
        // }),
        // new docx.Paragraph({
        //   text: 'Action Item Owners',
        //   heading: docx.HeadingLevel.HEADING_3,
        //   border: {
        //     bottom: {
        //       color: 'auto',
        //       space: 1,
        //       value: 'single',
        //       size: 6,
        //     },
        //   },
        // }),
        // new docx.Paragraph({
        //   children: [
        //     //TODO:
        //     new docx.TextRun(
        //       'The Internal Audit, number [Insert Audit Number], is being released for general distribution as of this date.  The objective(s) and scope of this engagement is noted in the Audit Objective and Scope section of this report.  A summary of the audit procedures performed is noted in the Audit Details and Observations section of this report.  '
        //     ),
        //   ],
        // }),
        // new docx.Paragraph({
        //   children: [
        //     new docx.TextRun(
        //       'Responses have been obtained from the applicable owner for each recommendation developed from our examination.  All findings, recommendations, and management responses (in their entirety) have been incorporated in the Findings and Recommendations section of this report.'
        //     ),
        //   ],
        // }),
        // new docx.Paragraph({
        //   children: [
        //     //TODO:
        //     new docx.TextRun(
        //       'A follow up review of management’s implementation of actions in response to the recommendations will be performed [Insert Date].'
        //     ),
        //   ],
        // }),
        // new docx.Paragraph({
        //   children: [
        //     new docx.TextRun(
        //       'Internal Audit notes that sufficient and appropriate audit procedures have been conducted and evidence gathered to support the accuracy of the conclusions reached and contained in this report.  The conclusions were based on a comparison of the situations, as they existed at the time against audit criteria.  The conclusions are only applicable for the process examined.  The evidence gathered meets professional audit standards and is sufficient to provide senior management with proof of the conclusions derived from the internal audit.'
        //     ),
        //   ],
        // }),
      ],
    });

    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'Audit Report.docx');
    });
  };
});
