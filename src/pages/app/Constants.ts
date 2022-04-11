const Views = {
  CREATE: 'create',
  DETAIL: 'details',
  LIST: 'lists',
  EDIT: 'edit',
};

const Models = {
  APPOINTMENT: 'appointments',
  BAND: 'bands',
  CLIENT: 'client',
  COLLECTION: 'subwallettransactions',
  PAYMENT: 'bills',
  CLINICAL_DOCUMENT: 'clinicaldocument',
  DOCUMENT_TYPES: 'documentclass',
  EMPLOYEE: 'employee',
  LOCATION: 'location',
  LABORATORY_HELPER: 'labhelper',
  MEDICATION_HELPER: 'medicationhelper',
  ORDER: 'order',
  BILLS: 'bills',
  BILLING: 'billing',
  INVENTORY: 'inventory',
  PRODUCTENTRY: 'productentry',
  SERVICE: 'billing',
  INVOICE: 'invoice',
  SUBWALLET: 'subwallet',
  SUBWALLETTX: 'subwallettransactions',
  BILLCREATE: 'createbilldirect',
  CHANNEL: 'messaging',
  CONVERSATION_CONFIG: 'conversation-config',
  QUESTIONNAIRE: 'questionnaire',
  QUESTION: 'question',
  SUBMISSION: 'conversation',
  Revenue: 'revenue',
};

const DateFormats = {
  SHORT_DATE: 'dd-MM-yy',
  MONTH_DATE: 'MM-yyyy',
  // eslint-disable-next-line quotes
  API_DATE: "yyyy-MM-dd'T'HH:mm:ss",
  CONTROL_DATE_TIME: 'MM/dd/yyyy hh:mm:ss aa',
  CONTROL_DATE: 'MM/dd/yyyy',
};

const ClinicalDocuments = {
  CLINICAL_NOTE: 'Clinical Note',
  LAB_NOTE: 'Lab Result',
  DOCTOR_NOTE: 'Doctor Note',
  NURSING_NOTE: 'Nursing Note',
  VITAL_SIGNS: 'Vital Signs',
  PROGRESS_NOTE: 'Progress Note',
  PRESCRIPTION: 'Prescription',
  LAB_ORDER: 'Lab Order',
};

export { ClinicalDocuments, DateFormats, Models, Views };
