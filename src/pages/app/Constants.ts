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
  CLINICAL_DOCUMENT: 'clinicaldocument',
  EMPLOYEE: 'employee',
  LOCATION: 'location',
  LABORATORY_HELPER: 'labhelper',
  MEDICATION_HELPER: 'medicationhelper',
  ORDER: 'order',
  BILLS: 'bills',
  INVENTORY: 'inventory',
  PRODUCTENTRY: 'productentry',
  SERVICE: 'billing',
  INVOICE: 'invoice',
  SUBWALLET: 'subwallet',
  SUBWALLETTX: 'subwallettransactions',
  BILLCREATE: 'createbilldirect',
};

const DateFormats = {
  SHORT_DATE: 'dd-MM-yy',
  // eslint-disable-next-line quotes
  API_DATE: "yyyy-MM-dd'T'HH:mm:ss",
  CONTROL_DATE_TIME: 'MM/dd/yyyy hh:mm:ss aa',
};

export { DateFormats, Models, Views };
