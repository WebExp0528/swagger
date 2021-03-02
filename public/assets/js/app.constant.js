'use strict';

/**
 * Config constant
 */
app.constant('APP_MEDIAQUERY', {
  desktopXL: 1200,
  desktop: 992,
  tablet: 768,
  mobile: 480,
});

app.constant('JS_REQUIRES', {
  //*** Scripts
  scripts: {
    //*** Javascript Plugins

    'modernizr': ['libs/components-modernizr/modernizr.js'],
    'moment': ['libs/moment/min/moment.min.js'],
    'spin': 'libs/spin.js/spin.js',

    //*** jQuery Plugins

    'perfect-scrollbar-plugin': [
      'libs/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js',
      'libs/perfect-scrollbar/css/perfect-scrollbar.min.css',
    ],
    'ladda': [
      'libs/ladda/dist/ladda.min.js',
      'libs/ladda/dist/ladda-themeless.min.css',
    ],
    'sweet-alert': [
      'libs/sweetalert/lib/sweet-alert.min.js',
      'libs/sweetalert/lib/sweet-alert.css',
    ],
    'chartjs': 'libs/chartjs/Chart.min.js',
    'jquery-sparkline':
      'libs/jquery.sparkline.build/dist/jquery.sparkline.min.js',
    'ckeditor-plugin': 'libs/ckeditor/ckeditor.js',
    'jquery-nestable-plugin': ['libs/jquery-nestable/jquery.nestable.js'],
    'touchspin-plugin': [
      'libs/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
      'libs/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css',
    ],
    'spectrum-plugin': [
      'libs/spectrum/spectrum.js',
      'libs/spectrum/spectrum.css',
    ],
    'highcharts': ['libs/highcharts-ng/dist/highcharts-ng.js'],
    'ngrtPopover': ['libs/angular-rt-popup/dist/angular-rt-popup.min.js'],

    /*
     *  Angular Application Controllers
     */
    'LoginCtrl': 'assets/js/controllers/login.signin.ctrl.js',
    'ContactusCtrl': 'assets/js/controllers/contactusCtrl.js',
    'GlossaryCtrl': 'assets/js/controllers/glossaryCtrl.js',
    'DashboardCtrl': 'assets/js/controllers/dashboard.ctrl.js',
    'DashActionFormCtrl': 'assets/js/controllers/dashboard.action.form.ctrl.js',
    'DashActionUpdateCtrl':
      'assets/js/controllers/dashboard.action.update.ctrl.js',
    'DashAttestationUpdateCtrl':
      'assets/js/controllers/dashboard.attestation.update.ctrl.js',
    'DashRCSAUpdateCtrl': 'assets/js/controllers/dashboard.rcsa.update.ctrl.js',
    'DashITRiskAssessmentUpdateCtrl':
      'assets/js/controllers/dashboard.itriskassessment.update.ctrl.js',
    'DashSOXTPUpdateCtrl':
      'assets/js/controllers/dashboard.soxtp.update.ctrl.js',
    'DashSOXRCMUpdateCtrl':
      'assets/js/controllers/dashboard.soxrcm.update.ctrl.js',
    'DashSOXPRAUpdateCtrl':
      'assets/js/controllers/dashboard.soxpra.update.ctrl.js',

    //Operational Risk related Controllers
    'OprIncidentCtrl':
      'assets/js/controllers/operationrisk/oprisk.incident.ctrl.js',
    'OprIncidentFormCtrl':
      'assets/js/controllers/operationrisk/oprisk.incident.form.ctrl.js',
    'OprIncidentUpdateCtrl':
      'assets/js/controllers/operationrisk/oprisk.incident.update.ctrl.js',
    'OprActionFormCtrl':
      'assets/js/controllers/operationrisk/oprisk.action.form.ctrl.js',
    'OprActionUpdateCtrl':
      'assets/js/controllers/operationrisk/oprisk.action.update.ctrl.js',
    'OprAssessmentCtrl':
      'assets/js/controllers/operationrisk/oprisk.assessment.ctrl.js',
    'OprAssessmentFormCtrl':
      'assets/js/controllers/operationrisk/oprisk.assessment.form.ctrl.js',
    'OprAssessmentUpdateCtrl':
      'assets/js/controllers/operationrisk/oprisk.assessment.update.ctrl.js',

    //IT Risk related Controllers
    'ITRiskIncCtrl': 'assets/js/controllers/itrisk/itrisk.incident.ctrl.js',
    'ITRiskIncFormCtrl':
      'assets/js/controllers/itrisk/itrisk.incident.form.ctrl.js',
    'ITRiskIncUpdateCtrl':
      'assets/js/controllers/itrisk/itrisk.incident.update.ctrl.js',
    'ITRiskActionFormCtrl':
      'assets/js/controllers/itrisk/itrisk.action.form.ctrl.js',
    'ITRiskActionUpdateCtrl':
      'assets/js/controllers/itrisk/itrisk.action.update.ctrl.js',
    'ITRiskAssCtrl': 'assets/js/controllers/itrisk/itrisk.assessment.ctrl.js',
    'ITRiskAssFormCtrl':
      'assets/js/controllers/itrisk/itrisk.assessment.form.ctrl.js',
    'ITRiskAssUpdateCtrl':
      'assets/js/controllers/itrisk/itrisk.assessment.update.ctrl.js',

    //Risk related Controllers
    'RiskProfileCtrl': 'assets/js/controllers/risk/risk.profile.ctrl.js',
    'RiskProfileFormCtrl':
      'assets/js/controllers/risk/risk.profile.form.ctrl.js',
    'RiskProfileUpdateCtrl':
      'assets/js/controllers/risk/risk.profile.update.ctrl.js',
    'RiskProfileActionFormCtrl':
      'assets/js/controllers/risk/risk.action.form.ctrl.js',
    'RiskProfileActionUpdateCtrl':
      'assets/js/controllers/risk/risk.action.update.ctrl.js',
    'RiskAssessmentCtrl': 'assets/js/controllers/risk/risk.assessment.ctrl.js',
    'RiskAssessmentFormCtrl':
      'assets/js/controllers/risk/risk.assessment.form.ctrl.js',
    'RiskAssessmentUpdateCtrl':
      'assets/js/controllers/risk/risk.assessment.update.ctrl.js',
    'RiskAssessmentCreateCtrl':
      'assets/js/controllers/risk/risk.assessment.create.ctrl.js',
    'RiskISO27000AssessmentCtrl':
      'assets/js/controllers/risk/risk.assessment.iso27000.ctrl.js',
    'RiskISO27000AssessmentCreateCtrl':
      'assets/js/controllers/risk/risk.assessment.iso27000.create.ctrl.js',
    'RiskNYDFSAssessmentCtrl':
      'assets/js/controllers/risk/risk.assessment.nydfs.ctrl.js',
    'RiskNYDFSAssessmentCreateCtrl':
      'assets/js/controllers/risk/risk.assessment.nydfs.create.ctrl.js',
    'RiskGDPRAssessmentCtrl':
      'assets/js/controllers/risk/risk.assessment.gdpr.ctrl.js',
    'RiskGDPRAssessmentCreateCtrl':
      'assets/js/controllers/risk/risk.assessment.gdpr.create.ctrl.js',
    'RiskRCMCtrl': 'assets/js/controllers/risk/risk.rcm.ctrl.js',
    'RiskControlTestDataFormCtrl':
      'assets/js/controllers/risk/risk.controltestdata.form.ctrl.js',
    'RiskControlTestDataUpdateCtrl':
      'assets/js/controllers/risk/risk.controltestdata.update.ctrl.js',

    //Compliance Controllers
    'SOXTPCtrl': 'assets/js/controllers/compliance/soxtp.ctrl.js',
    'SOXTPFormCtrl': 'assets/js/controllers/compliance/soxtp.form.ctrl.js',
    'SOXTPUpdateCtrl': 'assets/js/controllers/compliance/soxtp.update.ctrl.js',
    'SOXTPCreateCtrl': 'assets/js/controllers/compliance/soxtp.create.ctrl.js',
    'SOXRCMCtrl': 'assets/js/controllers/compliance/soxrcm.ctrl.js',
    'SOXRCMFormCtrl': 'assets/js/controllers/compliance/soxrcm.form.ctrl.js',
    'SOXRCMUpdateCtrl':
      'assets/js/controllers/compliance/soxrcm.update.ctrl.js',
    'SOXRCMCreateCtrl':
      'assets/js/controllers/compliance/soxrcm.create.ctrl.js',
    'SOXPRACtrl': 'assets/js/controllers/compliance/soxpra.ctrl.js',
    'SOXPRAFormCtrl': 'assets/js/controllers/compliance/soxpra.form.ctrl.js',
    'SOXPRAUpdateCtrl':
      'assets/js/controllers/compliance/soxpra.update.ctrl.js',
    'AMLKYCTPCtrl': 'assets/js/controllers/compliance/amlkyctp.ctrl.js',
    'AMLKYCTPFormCtrl':
      'assets/js/controllers/compliance/amlkyctp.form.ctrl.js',
    'AMLKYCTPUpdateCtrl':
      'assets/js/controllers/compliance/amlkyctp.update.ctrl.js',
    'AMLKYCTPCreateCtrl':
      'assets/js/controllers/compliance/amlkyctp.create.ctrl.js',
    'VOLCKERTPCtrl': 'assets/js/controllers/compliance/volckertp.ctrl.js',
    'VOLCKERTPFormCtrl':
      'assets/js/controllers/compliance/volckertp.form.ctrl.js',
    'VOLCKERTPUpdateCtrl':
      'assets/js/controllers/compliance/volckertp.update.ctrl.js',
    'VOLCKERTPCreateCtrl':
      'assets/js/controllers/compliance/volckertp.create.ctrl.js',
    'VolckerAssessmentCtrl':
      'assets/js/controllers/compliance/volckertp.create_assessment.ctrl.js',
    'PCIDSSCtrl': 'assets/js/controllers/compliance/pcidss.ctrl.js',
    'PCIDSSFormCtrl': 'assets/js/controllers/compliance/pcidss.form.ctrl.js',
    'PCIDSSUpdateCtrl':
      'assets/js/controllers/compliance/pcidss.update.ctrl.js',
    'PCIDSSCreateCtrl':
      'assets/js/controllers/compliance/pcidss.create.ctrl.js',
    'SOCTPCtrl': 'assets/js/controllers/compliance/soctp.ctrl.js',
    'SOCTPFormCtrl': 'assets/js/controllers/compliance/soctp.form.ctrl.js',
    'SOCTPUpdateCtrl': 'assets/js/controllers/compliance/soctp.update.ctrl.js',
    'SOCTPCreateCtrl': 'assets/js/controllers/compliance/soctp.create.ctrl.js',
    'NYDFSAssessmentCtrl': 'assets/js/controllers/compliance/nydfs.ctrl.js',
    'NYDFSAssessmentFormCtrl':
      'assets/js/controllers/compliance/nydfs.form.ctrl.js',
    'NYDFSAssessmentUpdateCtrl':
      'assets/js/controllers/compliance/nydfs.update.ctrl.js',
    'NYDFSAssessmentCreateCtrl':
      'assets/js/controllers/compliance/nydfs.create.ctrl.js',
    'GDPRAssessmentCtrl': 'assets/js/controllers/compliance/gdpr.ctrl.js',
    'GDPRAssessmentFormCtrl':
      'assets/js/controllers/compliance/gdpr.form.ctrl.js',
    'GDPRAssessmentUpdateCtrl':
      'assets/js/controllers/compliance/gdpr.update.ctrl.js',
    'GDPRAssessmentCreateCtrl':
      'assets/js/controllers/compliance/gdpr.create.ctrl.js',
    'NYDFSControlTestDataFormCtrl':
      'assets/js/controllers/compliance/nydfs.controltestdata.form.ctrl.js',
    'NYDFSControlTestDataUpdateCtrl':
      'assets/js/controllers/compliance/nydfs.controltestdata.update.ctrl.js',
    'GDPRControlTestDataFormCtrl':
      'assets/js/controllers/compliance/gdpr.controltestdata.form.ctrl.js',
    'GDPRControlTestDataUpdateCtrl':
      'assets/js/controllers/compliance/gdpr.controltestdata.update.ctrl.js',
    'GDPRPreAssessmentCtrl': 'assets/js/controllers/compliance/gdprpre.ctrl.js',
    'GDPRPreAssessmentFormCtrl':
      'assets/js/controllers/compliance/gdprpre.form.ctrl.js',
    'GDPRPreAssessmentUpdateCtrl':
      'assets/js/controllers/compliance/gdprpre.update.ctrl.js',
    'GDPRPreAssessmentCreateCtrl':
      'assets/js/controllers/compliance/gdprpre.create.ctrl.js',

    //Vendor Risk related Controllers
    'VendorriskStinfoCtrl':
      'assets/js/controllers/vendorrisk/vendorrisk.stinfo.ctrl.js',
    'VendorriskStinfoFormCtrl':
      'assets/js/controllers/vendorrisk/vendorrisk.stinfo.form.ctrl.js',
    'VendorAssessmentCtrl':
      'assets/js/controllers/vendorrisk/vendorrisk.assess.create.ctrl.js',
    'VendorAssessmentReportCtrl':
      'assets/js/controllers/vendorrisk/vendorrisk.assessment.report.ctrl.js',
    'VendorStinfoUpdateCtrl':
      'assets/js/controllers/vendorrisk/vendorrisk.stinfo.update.ctrl.js',
    'VendScoreCardCtrl':
      'assets/js/controllers/vendorrisk/vendorrisk.scorecard.ctrl.js',

    //Control Test Data Controllers
    'ControlTestDataMainCtrl':
      'assets/js/controllers/controltestdata/controltestdata.main.ctrl.js',
    'ControlTestDataAddCtrl':
      'assets/js/controllers/controltestdata/controltestdata.add.ctrl.js',
    'ControlTestDataUpdateCtrl':
      'assets/js/controllers/controltestdata/controltestdata.update.ctrl.js',

    //Audit Controllers
    'AuditMainCtrl': 'assets/js/controllers/audit/audit.main.ctrl.js',
    'AuditAdd_AuditCtrl': 'assets/js/controllers/audit/audit.add_audit.ctrl.js',
    'AuditUpdate_AuditCtrl':
      'assets/js/controllers/audit/audit.update_audit.ctrl.js',
    'AuditAdd_TopicCtrl': 'assets/js/controllers/audit/audit.add_topic.ctrl.js',
    'AuditUpdate_TopicCtrl':
      'assets/js/controllers/audit/audit.update_topic.ctrl.js',
    'AuditAdd_FindingCtrl':
      'assets/js/controllers/audit/audit.add_finding.ctrl.js',
    'AuditUpdate_FindingCtrl':
      'assets/js/controllers/audit/audit.update_finding.ctrl.js',
    'AuditAdd_ActionCtrl':
      'assets/js/controllers/audit/audit.add_action.ctrl.js',
    'AuditUpdate_ActionCtrl':
      'assets/js/controllers/audit/audit.update_action.ctrl.js',
    'AuditAdd_TaskCtrl': 'assets/js/controllers/audit/audit.add_task.ctrl.js',
    'AuditUpdate_TaskCtrl':
      'assets/js/controllers/audit/audit.update_task.ctrl.js',

    //Business Process Management (BPM) Controllers
    'BpmMainCtrl': 'assets/js/controllers/bpm/bpm.main.ctrl.js',
    'BpmAdd_ProcessCtrl': 'assets/js/controllers/bpm/bpm.add_process.ctrl.js',
    'BpmUpdate_ProcessCtrl':
      'assets/js/controllers/bpm/bpm.update_process.ctrl.js',
    'BpmAdd_SubprocessCtrl':
      'assets/js/controllers/bpm/bpm.add_subprocess.ctrl.js',
    'BpmUpdate_SubprocessCtrl':
      'assets/js/controllers/bpm/bpm.update_subprocess.ctrl.js',
    'BpmAdd_ActivityCtrl': 'assets/js/controllers/bpm/bpm.add_activity.ctrl.js',
    'BpmUpdate_ActivityCtrl':
      'assets/js/controllers/bpm/bpm.update_activity.ctrl.js',
    'BpmAdd_AttestationCtrl':
      'assets/js/controllers/bpm/bpm.add_attestation.ctrl.js',
    'BpmUpdate_AttestationCtrl':
      'assets/js/controllers/bpm/bpm.update_attestation.ctrl.js',

    //Control related Controllers
    'RepoCtrl': 'assets/js/controllers/control/repo.ctrl.js',
    'RepoFormCtrl': 'assets/js/controllers/control/repo.form.ctrl.js',
    'RepoUpdateCtrl': 'assets/js/controllers/control/repo.update.ctrl.js',
    'TestPlanCtrl': 'assets/js/controllers/control/testplan.ctrl.js',
    'TestPlanFormCtrl': 'assets/js/controllers/control/testplan.form.ctrl.js',
    'TestPlanUpdateCtrl':
      'assets/js/controllers/control/testplan.update.ctrl.js',
    'TestResultCtrl': 'assets/js/controllers/control/testresult.ctrl.js',
    'TestResultFormCtrl':
      'assets/js/controllers/control/testresult.form.ctrl.js',
    'TestResultUpdateCtrl':
      'assets/js/controllers/control/testresult.update.ctrl.js',
    'ControlDashboardCtrl': 'assets/js/controllers/control/dashboard.ctrl.js',
    'ControlMapCtrl': 'assets/js/controllers/control/mapping.ctrl.js',

    //Data Inventory Controllers
    'AssetInventoryMainCtrl':
      'assets/js/controllers/datainventory/assetinventory.main.ctrl.js',
    'AssetInventoryAddCtrl':
      'assets/js/controllers/datainventory/assetinventory.add.ctrl.js',
    'AssetInventoryUpdateCtrl':
      'assets/js/controllers/datainventory/assetinventory.update.ctrl.js',
    'DataModelsMainCtrl':
      'assets/js/controllers/datainventory/datamodels.main.ctrl.js',
    'DataModelsAddCtrl':
      'assets/js/controllers/datainventory/datamodels.add.ctrl.js',
    'DataModelsUpdateCtrl':
      'assets/js/controllers/datainventory/datamodels.update.ctrl.js',
    'DataMappingMainCtrl':
      'assets/js/controllers/datainventory/datamapping.main.ctrl.js',
    'DataMappingAddCtrl':
      'assets/js/controllers/datainventory/datamapping.add.ctrl.js',
    'DataMappingUpdateCtrl':
      'assets/js/controllers/datainventory/datamapping.update.ctrl.js',
    'MetadataMainCtrl':
      'assets/js/controllers/datainventory/metadata.main.ctrl.js',
    'MetadataAddCtrl':
      'assets/js/controllers/datainventory/metadata.add.ctrl.js',
    'MetadataUpdateCtrl':
      'assets/js/controllers/datainventory/metadata.update.ctrl.js',

    //Policy related Controllers
    'PolicyCtrl': 'assets/js/controllers/policy/policy.ctrl.js',
    'PolicyFormCtrl': 'assets/js/controllers/policy/policy.form.ctrl.js',
    'PolicyUpdateCtrl': 'assets/js/controllers/policy/policy.update.ctrl.js',
    'PolicyDocsCtrl': 'assets/js/controllers/policy/policydocs.ctrl.js',
    'PolicyDocsFormCtrl':
      'assets/js/controllers/policy/policydocs.form.ctrl.js',
    'PolicyDocsUpdateCtrl':
      'assets/js/controllers/policy/policydocs.update.ctrl.js',
    'PolicyApproverCtrl':
      'assets/js/controllers/policy/policyapprover.form.ctrl.js',
    'PolicyApproverUpdateCtrl':
      'assets/js/controllers/policy/policyapprover.update.ctrl.js',
    'PolicyDocsApproverCtrl':
      'assets/js/controllers/policy/policydocsapprover.form.ctrl.js',
    'PolicyDocsApproverUpdateCtrl':
      'assets/js/controllers/policy/policydocsapprover.update.ctrl.js',
    // Mitigate related Controllers
    'RemediationsCtrl': 'assets/js/controllers/mitigate/remediations.ctrl.js',
    'FindingsCtrl': 'assets/js/controllers/mitigate/findings.ctrl.js',

    //Measure related Controllers
    'PenetrationCtrl': 'assets/js/controllers/measure/penetration.ctrl.js',
    'PenetrationFormCtrl':
      'assets/js/controllers/measure/penetration.form.ctrl.js',
    'PenetrationUpdateCtrl':
      'assets/js/controllers/measure/penetration.update.ctrl.js',
    'VulnerabilityCtrl': 'assets/js/controllers/measure/vulnerability.ctrl.js',
    'VulnerabilityFormCtrl':
      'assets/js/controllers/measure/vulnerability.form.ctrl.js',
    'VulnerabilityUpdateCtrl':
      'assets/js/controllers/measure/vulnerability.update.ctrl.js',

    //Vendor Link Pages Controller
    'VendorLoginCtrl': 'assets/js/controllers/vendor/signin.ctrl.js',
    'VendorAssessCtrl': 'assets/js/controllers/vendor/assessment.ctrl.js',

    //*** Filters
    'htmlToPlaintext': 'assets/js/filters/htmlToPlaintext.js',
    'uniqueIds': 'assets/js/filters/uniqueIds.js',

    //****// Admin start
    // Dashboard Controller
    'adminDashboardCtrl':
      'assets/js/controllers/admin/Dashboard/dashboard.main.ctrl.js',
    // Template Management Controller
    'tmpUpldsCtrl':
      'assets/js/controllers/admin/TemplateMmt/templateMgmt.main.ctrl.js',
    'tmpUpldsFormCtrl':
      'assets/js/controllers/admin/TemplateMmt/templateMgmt.form.ctrl.js',
    //Misc Control Data Upload
    'adminCtrlDataUpload':
      'assets/js/controllers/admin/Misc/CtrlDataUpload.ctrl.js',

    'RolesMainCtrl': 'assets/js/controllers/admin/roles/role.main.ctrl.js',
    'RolesAddCtrl': 'assets/js/controllers/admin/roles/role.add.ctrl.js',
    'RolesUpdateCtrl': 'assets/js/controllers/admin/roles/role.update.ctrl.js',

    'UsersMainCtrl': 'assets/js/controllers/admin/users/user.main.ctrl.js',
    'UsersAddCtrl': 'assets/js/controllers/admin/users/user.add.ctrl.js',
    'UsersUpdateCtrl': 'assets/js/controllers/admin/users/user.update.ctrl.js',

    'OwaspMainCtrl': 'assets/js/controllers/admin/owasp/owasp.main.ctrl.js',
    'OwaspAddCtrl': 'assets/js/controllers/admin/owasp/owasp.add.ctrl.js',
    'OwaspUpdateCtrl': 'assets/js/controllers/admin/owasp/owasp.update.ctrl.js',

    'PreAssessmentMgmCtrl':
      'assets/js/controllers/admin/gdprpre/preassessment.main.ctrl.js',
    'PreAssessmentMgmAddCtrl':
      'assets/js/controllers/admin/gdprpre/preassessment.add.ctrl.js',
    'PreAssessmentMgmUpdateCtrl':
      'assets/js/controllers/admin/gdprpre/preassessment.update.ctrl.js',
    'CategoryMgmCtrl':
      'assets/js/controllers/admin/gdprpre/category.main.ctrl.js',
    'CategoryMgmAddCtrl':
      'assets/js/controllers/admin/gdprpre/category.add.ctrl.js',
    'CategoryMgmUpdateCtrl':
      'assets/js/controllers/admin/gdprpre/category.update.ctrl.js',
    'ControlMgmCtrl':
      'assets/js/controllers/admin/gdprpre/control.main.ctrl.js',
    'ControlMgmAddCtrl':
      'assets/js/controllers/admin/gdprpre/control.add.ctrl.js',
    'ControlMgmUpdateCtrl':
      'assets/js/controllers/admin/gdprpre/control.update.ctrl.js',
    'ResponseMgmCtrl':
      'assets/js/controllers/admin/gdprpre/response.main.ctrl.js',
    'ResponseMgmAddCtrl':
      'assets/js/controllers/admin/gdprpre/response.add.ctrl.js',
    'ResponseMgmUpdateCtrl':
      'assets/js/controllers/admin/gdprpre/response.update.ctrl.js',

    'RiskScoreMainCtrl':
      'assets/js/controllers/admin/riskscore/riskscore.main.ctrl.js',
    'RiskScoreAddCtrl':
      'assets/js/controllers/admin/riskscore/riskscore.add.ctrl.js',
    'RiskScoreUpdateCtrl':
      'assets/js/controllers/admin/riskscore/riskscore.update.ctrl.js',

    'VendorMainCtrl': 'assets/js/controllers/admin/vendor/vendor.main.ctrl.js',
    'VendorAddCtrl': 'assets/js/controllers/admin/vendor/vendor.add.ctrl.js',
    'VendorUpdateCtrl':
      'assets/js/controllers/admin/vendor/vendor.update.ctrl.js',

    'DeptMainCtrl': 'assets/js/controllers/admin/dept/dept.main.ctrl.js',
    'DeptAddCtrl': 'assets/js/controllers/admin/dept/dept.add.ctrl.js',
    'DeptUpdateCtrl': 'assets/js/controllers/admin/dept/dept.update.ctrl.js',

    'VendorriskAdminStinfoCtrl':
      'assets/js/controllers/admin/vendorrisk/vendorrisk.stinfo.ctrl.js',
    'VendorriskAdminStinfoUpdateCtrl':
      'assets/js/controllers/admin/vendorrisk/vendorrisk.stinfo.update.ctrl.js',

    // Assessment Generator related Controllers
    'AssessmentGenCtrl':
      'assets/js/controllers/admin/assessment/assessment.ctrl.js',
    'AssessmentGenCreateCtrl':
      'assets/js/controllers/admin/assessment/assessment.create.ctrl.js',

    'ApproverMainCtrl':
      'assets/js/controllers/admin/approver/approver.main.ctrl.js',
    'JournalingMainCtrl':
      'assets/js/controllers/admin/journaling/journaling.main.ctrl.js',
    'ApproverAddCtrl':
      'assets/js/controllers/admin/approver/approver.add.ctrl.js',
    'ApproverUpdateCtrl':
      'assets/js/controllers/admin/approver/approver.update.ctrl.js',

    'DynListMgmCtrl':
      'assets/js/controllers/admin/dynlist/dynlist.main.ctrl.js',
    'DynListMgmAddCtrl':
      'assets/js/controllers/admin/dynlist/dynlist.add.ctrl.js',
    'DynListMgmUpdateCtrl':
      'assets/js/controllers/admin/dynlist/dynlist.update.ctrl.js',

    'ArtifactMgmCtrl':
      'assets/js/controllers/admin/artifact/artifact.main.ctrl.js',
  },

  /*
   *  AngularJS Modules
   */
  modules: [
    {
      name: 'angularMoment',
      files: ['libs/angular-moment/angular-moment.min.js'],
    },
    {
      name: 'toaster',
      files: [
        'libs/angularjs-toaster/toaster.js',
        'libs/angularjs-toaster/toaster.css',
      ],
    },
    {
      name: 'angularBootstrapNavTree',
      files: [
        'libs/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
        'libs/angular-bootstrap-nav-tree/dist/abn_tree.css',
      ],
    },
    {
      name: 'angular-ladda',
      files: ['libs/angular-ladda/dist/angular-ladda.min.js'],
    },
    {
      name: 'ngTable',
      files: [
        'libs/ng-table/dist/ng-table.min.js',
        'libs/ng-table/dist/ng-table.min.css',
      ],
    },
    {
      name: 'ui.select',
      files: [
        'libs/angular-ui-select/dist/select.min.js',
        'libs/angular-ui-select/dist/select.min.css',
        'libs/select2/dist/css/select2.min.css',
        'libs/select2-bootstrap-css/select2-bootstrap.min.css',
        'libs/selectize/dist/css/selectize.bootstrap3.css',
      ],
    },
    {
      name: 'ui.mask',
      files: ['libs/angular-ui-utils/mask.min.js'],
    },
    {
      name: 'ngImgCrop',
      files: [
        'libs/ngImgCrop/compile/minified/ng-img-crop.js',
        'libs/ngImgCrop/compile/minified/ng-img-crop.css',
      ],
    },
    {
      name: 'angularFileUpload',
      files: ['libs/angular-file-upload/angular-file-upload.min.js'],
    },
    {
      name: 'ngAside',
      files: [
        'libs/angular-aside/dist/js/angular-aside.min.js',
        'libs/angular-aside/dist/css/angular-aside.min.css',
      ],
    },
    {
      name: 'truncate',
      files: ['libs/angular-truncate/src/truncate.js'],
    },
    {
      name: 'oitozero.ngSweetAlert',
      files: ['libs/angular-sweetalert-promised/SweetAlert.min.js'],
    },
    {
      name: 'monospaced.elastic',
      files: ['libs/angular-elastic/elastic.js'],
    },
    {
      name: 'ngMap',
      files: ['libs/ngmap/build/scripts/ng-map.min.js'],
    },
    {
      name: 'tc.chartjs',
      files: ['libs/tc-angular-chartjs/dist/tc-angular-chartjs.min.js'],
    },
    {
      name: 'flow',
      files: ['libs/ng-flow/dist/ng-flow-standalone.min.js'],
    },
    {
      name: 'uiSwitch',
      files: [
        'libs/angular-ui-switch/angular-ui-switch.min.js',
        'libs/angular-ui-switch/angular-ui-switch.min.css',
      ],
    },
    {
      name: 'ckeditor',
      files: ['libs/angular-ckeditor/angular-ckeditor.min.js'],
    },
    {
      name: 'mwl.calendar',
      files: [
        'libs/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js',
        'libs/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css',
        'assets/js/config/config-calendar.js',
      ],
    },
    {
      name: 'ng-nestable',
      files: ['libs/ng-nestable/src/angular-nestable.js'],
    },
    {
      name: 'vAccordion',
      files: [
        'libs/v-accordion/dist/v-accordion.min.js',
        'libs/v-accordion/dist/v-accordion.min.css',
      ],
    },
    {
      name: 'xeditable',
      files: [
        'libs/angular-xeditable/dist/js/xeditable.min.js',
        'libs/angular-xeditable/dist/css/xeditable.css',
        'assets/js/config/config-xeditable.js',
      ],
    },
    {
      name: 'checklist-model',
      files: ['libs/checklist-model/checklist-model.js'],
    },
    {
      name: 'angular-notification-icons',
      files: [
        'libs/angular-notification-icons/dist/angular-notification-icons.min.js',
        'libs/angular-notification-icons/dist/angular-notification-icons.min.css',
      ],
    },
    {
      name: 'angularSpectrumColorpicker',
      files: [
        'libs/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js',
      ],
    },
  ],
});
