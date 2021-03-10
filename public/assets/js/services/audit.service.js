/**
 * Created by Precision on 03/01/2017.
 */

const borders = {
  top: {
    style: docx.BorderStyle.NIL,
    size: 0,
    color: '00000000',
  },
  bottom: {
    style: docx.BorderStyle.NIL,
    size: 0,
    color: '00000000',
  },
  left: {
    style: docx.BorderStyle.NIL,
    size: 0,
    color: '00000000',
  },
  right: {
    style: docx.BorderStyle.NIL,
    size: 0,
    color: '00000000',
  },
};

const margins = {
  top: 0,
  bottom: 300,
  left: 0,
  right: 0,
};

function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

function createSectionTitle(sectionName) {
  return new docx.Paragraph({
    text: sectionName,
    heading: docx.HeadingLevel.HEADING_2,
    alignment: docx.AlignmentType.CENTER,
    style: 'sectionHeader',
  });
}

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
    const now = new Date();

    toDataURL('/assets/img/summary_report_logo.jpg', function (imageData) {
      const document = new docx.Document({
        styles: {
          paragraphStyles: [
            {
              id: 'sectionHeader',
              quickFormat: true,
              run: {
                underline: {},
                bold: true,
              },
            },
            {
              id: 'underline',
              quickFormat: true,
              run: {
                underline: {},
              },
            },
          ],
        },
      });

      const image = docx.Media.addImage(document, imageData, 300, 80, {
        floating: {
          horizontalPosition: {
            relative: docx.HorizontalPositionRelativeFrom.LEFT_MARGIN,
            align: docx.HorizontalPositionAlign.LEFT,
            offset: 1014400,
          },
          verticalPosition: {
            relative: docx.VerticalPositionRelativeFrom.TOP_MARGIN,
            align: docx.VerticalPositionAlign.TOP,
            offset: 1014400,
          },
          margins: {
            top: 201440,
            bottom: 201440,
          },
        },
      });

      document.addSection({
        children: [
          new docx.Table({
            borders,
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    borders,
                    margins: {
                      bottom: 1500,
                    },
                    children: [new docx.Paragraph(image)],
                  }),
                ],
              }),
            ],
          }),
          new docx.Table({
            borders,
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    borders,
                    width: {
                      size: 2000,
                      type: docx.WidthType.DXA,
                    },
                    margins,
                    children: [new docx.Paragraph('To:')],
                  }),
                  new docx.TableCell({
                    borders,
                    margins,
                    children: [
                      new docx.Paragraph('Audit and Risk Committee'),
                      new docx.Paragraph('Donna Charette '),
                      new docx.Paragraph('Jeff Reinke'),
                    ],
                  }),
                ],
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    borders,
                    width: {
                      size: 2000,
                      type: docx.WidthType.DXA,
                    },
                    margins,
                    children: [new docx.Paragraph('From:')],
                  }),
                  new docx.TableCell({
                    borders,
                    margins,
                    children: [
                      new docx.Paragraph('Trisha Leary'),
                      new docx.Paragraph('Kelly Van Buren'),
                    ],
                  }),
                ],
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    borders,
                    margins,
                    width: {
                      size: 2000,
                      type: docx.WidthType.DXA,
                    },
                    children: [new docx.Paragraph('Date:')],
                  }),
                  new docx.TableCell({
                    borders,
                    margins,
                    children: [new docx.Paragraph(now.toDateString())],
                  }),
                ],
              }),
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    borders,
                    margins,
                    width: {
                      size: 2000,
                      type: docx.WidthType.DXA,
                    },
                    children: [new docx.Paragraph('Subject:          ')],
                  }),
                  new docx.TableCell({
                    borders,
                    margins,
                    children: [
                      new docx.Paragraph('Internal Audit - Investments '),
                    ],
                  }),
                ],
              }),
            ],
            width: {
              size: 50,
              type: docx.WidthType.PERCENTAGE,
            },
          }),
          createSectionTitle('BACKGROUND AND SCOPE'),
          new docx.Paragraph({
            text: auditBackground,
            alignment: docx.AlignmentType.LEFT,
            spacing: {
              before: 200,
            },
          }),
          new docx.Paragraph({
            text: auditScope,
            alignment: docx.AlignmentType.LEFT,
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          createSectionTitle('RATING AND CONCLUSIONS'),
          new docx.Paragraph({
            text: `Rating = ${0}`,
            alignment: docx.AlignmentType.LEFT,
            spacing: {
              before: 200,
            },
            style: 'underline',
          }),
          new docx.Paragraph({
            text: `In our opinion, the present system of controls being exercised in regard to the management of the Bank’s investment portfolio is satisfactory although one area of improvement was noted surrounding vendor internal controls reviews.`,
            alignment: docx.AlignmentType.LEFT,
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          createSectionTitle('FINDINGS AND RECOMMENDATIONS'),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Third-Party Internal Controls Review (Low): ',
                bold: true,
                italic: true,
                underline: {
                  type: docx.UnderlineType.SINGLE,
                  color: '000000',
                },
              }),
              new docx.TextRun({
                text: auditObjectives,
              }),
            ],
            alignment: docx.AlignmentType.LEFT,
            spacing: {
              before: 200,
            },
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Recommendation: ',
                bold: true,
                italic: true,
                underline: {
                  type: docx.UnderlineType.SINGLE,
                  color: '000000',
                },
              }),
              new docx.TextRun({
                text: auditRecommendations,
              }),
            ],
            alignment: docx.AlignmentType.LEFT,
            spacing: {
              before: 200,
            },
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: 'Management Response: ',
                bold: true,
                italics: true,
                underline: {
                  type: docx.UnderlineType.SINGLE,
                  color: '000000',
                },
              }),
              new docx.TextRun({
                text: auditManagementResponse,
                italics: true,
              }),
            ],
            alignment: docx.AlignmentType.LEFT,
            spacing: {
              before: 200,
              after: 300,
            },
          }),
          new docx.Table({
            borders,
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    borders,
                    width: {
                      size: 500,
                      type: docx.WidthType.DXA,
                    },
                    margins,
                    children: [new docx.Paragraph('cc')],
                  }),
                  new docx.TableCell({
                    borders,
                    margins,
                    children: [
                      new docx.Paragraph('Thomas Senecal'),
                      new docx.Paragraph('Brian Canina'),
                      new docx.Paragraph('Jackie Charron'),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      });

      docx.Packer.toBlob(document).then((blob) => {
        saveAs(blob, 'Audit Report.docx');
      });
    });
  };
});
