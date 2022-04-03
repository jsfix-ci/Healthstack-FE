import { Models } from '../Constants';
import { toDurationString, toShortDate } from '../DateUtils';
import { InputType } from './util';

// const BillServiceSchema2 = [
//   {
//     name: 'S/N',
//     key: '_id',2
//     selector: (row) => row._id && row._id.substring(0, 7),
//     sortable: true,
//     required: true,
//     inputType: InputType.HIDDEN,
//   },
//   {
//     name: 'Name',
//     key: 'orderInfo.orderObj.clientname',
//     description: 'Enter name of band',
//     selector: (row) => row.orderInfo.orderObj.clientname,
//     sortable: true,
//     required: true,
//     inputType: InputType.TEXT_AREA,
//   },
//   {
//     name: 'Date',
//     key: 'createdAt',
//     description: 'Enter date',
//     selector: (row) => row.createdAt && row.createdAt.substring(0, 10),
//     sortable: true,
//     required: true,
//     inputType: InputType.TEXT_AREA,
//   },
//   {
//     name: 'Description of Band',
//     key: 'orderInfo.orderObj.order',
//     description: 'Enter description of band',
//     selector: (row) => row.orderInfo.orderObj.order,
//     sortable: true,
//     required: false,
//     inputType: InputType.TEXT_AREA,
//   },
//   {
//     name: 'Status',
//     key: 'billing_status',
//     description: 'Enter status',
//     selector: (row) => row.billing_status,
//     sortable: true,
//     required: false,
//     inputType: InputType.TEXT_AREA,
//   },
//   {
//     name: 'Amount',
//     key: 'serviceInfo.amount',
//     description: 'Enter amount',
//     selector: (row) => row.serviceInfo.amount,
//     sortable: true,
//     required: false,
//     inputType: InputType.TEXT_AREA,
//   },
// ];
const BillCustomerSchema = [
  {
    name: 'ID',
    key: '_id',
    description: 'ID',
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Client',
    key: 'clientId',
    description: 'Search for  Client',
    selector: (row) => `${row.firstname} ${row.lastname}`,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.CLIENT,
      or: ['firstname', 'lastname', 'middlename', 'phone', 'clientTags', 'mrn', 'specificDetails'],
      labelSelector: (obj) =>
        `${obj.firstname} ${obj.lastname} ${toDurationString(obj.dob)} ${obj.gender} ${obj.profession} ${obj.phone} ${
          obj.email
        }`,
      valueSelector: (obj) => obj,
    },
  },
  {
    name: 'Billing Mode',
    description: 'Billing Mode',
    key: 'billing_mode',
    selector: (row) => row.appointment_type,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_LIST,
    options: ['Cash', 'Family', 'Hmo'],
  },
  {
    name: 'Date and Time',
    key: 'start_time',
    description: 'Time and Date',
    selector: (row) => row.start_time,
    sortable: true,
    required: true,
    inputType: InputType.DATE,
  },
  {
    name: 'Name of Location',
    key: 'invoice',
    description: 'Invoice',
    selector: (row) => row.name,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
    options: [],
  },
];

const BillServiceSchema = [
  {
    name: 'Service',
    key: 'inventoryId',
    description: 'Search for  Service',
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.BILLING,
      or: ['baseunit', 'category', 'facilityname'],
      labelSelector: (obj) => `${obj.name} ${obj.category}`,
      valueSelector: (obj) => obj,
    },
  },
  {
    name: 'Quantity',
    key: 'quantity',
    description: 'Quantity',
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Amount',
    key: 'amount',
    description: 'Amount',
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Date',
    selector: (obj) => toShortDate(obj.createdAt),
  },
  {
    name: 'Description',
    selector: (obj) => obj.serviceInfo.name,
  },
  {
    name: 'Status',
    selector: (obj) => obj.billing_status,
  },
  {
    name: 'Amount',
    selector: (obj) => obj.serviceInfo.amount,
  },
];

export { BillCustomerSchema, BillServiceSchema };
