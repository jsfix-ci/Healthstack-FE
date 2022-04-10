import { Models } from '../Constants';
import { toShortDate } from '../DateUtils';
import { InputType } from './util';

export const PaymentsSummary = [
  { name: 'S/N', selector: (row) => row.sn },
  { name: 'Client Name', selector: (row) => row.clientname },
  { name: 'Bills', selector: (row) => row.bills.length },
  { name: 'Bill Items', selector: (row) => row.bills.map((obj) => obj.order).flat().length },
];

export const DispensorySummary = [
  { name: 'S/N', selector: (row) => row.sn },
  { name: 'Client Name', selector: (row) => row.clientname },
  { name: 'Bill Items', selector: (row) => row.bills.map((obj) => obj.order).flat().length },
];

export const DispensaryCreateSchema = [
  {
    name: 'ID',
    key: '_id',
    selector: (row) => row._id && row._id.substring(0, 7),
    description: 'ID',
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Medication',
    key: 'medication',
    description: 'Search for Medicine',
    selector: (row) => row.name,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.INVENTORY,
      labelSelector: (obj) => obj.name,
      valueSelector: (obj) => obj.storeId,
      extraFields: {
        instruction: 'instruction',
      },
    },
  },
  {
    name: 'Quantity',
    description: 'Enter quantity',
    key: 'quantity',
    selector: (row) => row.quantity,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'Amount',
    description: 'Enter Price',
    key: 'amount',
    selector: (row) => row.amount,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
];

export const DispensaryDetailSchema = [
  {
    name: 'S/N',
    key: '_id',
    selector: (row) => row.sn,
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Name',
    key: 'name',
    description: 'Enter name',
    selector: (row) => row.serviceInfo.name,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'quantity',
    key: 'quantity',
    description: 'Enter Quantity',
    selector: (row) => row.serviceInfo.quantity,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Unit',
    key: 'unit',
    description: 'Enter Unit',
    selector: (row) => row.serviceInfo.baseunit,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Selling Price',
    key: 'sellingprice',
    description: 'Enter selling price',
    selector: (row) => row.serviceInfo.price,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Amount',
    key: 'amount',
    description: 'Enter amount',
    selector: (row) => row.serviceInfo.amount,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
];

export const PaymentLineSchema = [
  {
    name: 'Description of Band',
    key: 'description',
    description: 'Enter description of band',
    selector: (row) => row.orderInfo.orderObj.order,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Status',
    key: 'billing_status',
    description: 'Enter status',
    selector: (row) => row.billing_status,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Amount',
    key: 'amount',
    description: 'Enter amount',
    selector: (row) => row.serviceInfo.amount,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Paid',
    key: 'paid',
    selector: (row) => row.paymentInfo?.amountpaid || 0,
    sortable: true,
    required: false,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Balance',
    key: 'balance',
    selector: (row) => row.paymentInfo?.balance || row.serviceInfo.amount,
    sortable: true,
    required: false,
    inputType: InputType.HIDDEN,
  },
];

export const PaymentWalletSchema = [
  {
    name: 'S/N',
    key: '_id',
    description: '',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'payment Options',
    key: 'paymentmode',
    description: 'Enter payment Option',
    selector: (row) => row.paymentmode,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_LIST,
    options: ['Cash', 'Wallet', 'Bank Transfer', 'Card', 'Cheque'],
  },
  {
    name: 'Amount',
    key: 'amount',
    description: 'Enter Amount',
    selector: (row) => row.amount,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'Description',
    key: 'description',
    description: 'Enter description',
    selector: (row) => row.description,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
];

export const InventoryStoreSchema = [
  {
    name: 'S/N',
    key: '_id',
    description: '',
    selector: (row) => row.sn,
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'product',
    key: 'product',
    description: 'Enter product',
    selector: (row) => row.name,

    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Quantity',
    key: 'quantity',
    description: 'Enter quantity',
    selector: (row) => row.quantity,

    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Base Unit',
    key: 'baseunit',
    description: 'Enter baseUnit',
    selector: (row) => row.baseunit,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Stock Value',
    key: 'stockValue',
    description: 'Enter Stock value',
    selector: (row) => row.stockvalue,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'cost Price',
    key: 'costprice',
    description: 'Enter cost price',
    selector: (row) => row.costprice,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Selling Price',
    key: 'sellingprice',
    description: 'Enter Selling Price',
    selector: (row) => row.sellingprice,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Re-Order level',
    key: 'Re-order',
    description: 'Enter Re-order Level',
    selector: (row) => row.reorder_level,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Expiry',
    key: 'Expiry',
    description: 'Enter Expiry',
    selector: (row) => (row.expiry ? 'Exist' : ''),
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
];

export const ProductBatchSchema = [
  {
    name: 'S/N',
    key: 'sn',
    description: 'S/N',
    selector: (row) => row.sn,
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Batch Number',
    key: 'batchNo',
    description: 'Batch Number',
    selector: (row) => row.batchNo,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Quantity',
    key: 'quantity',
    description: 'Quantity',
    sortable: true,
    required: true,
    inputType: InputType.NUMBER,
  },
  {
    name: 'Unit',
    key: 'baseunit',
    description: 'baseunit',
    sortable: true,
    required: true,
    inputType: InputType.READ_ONLY,
  },
  {
    name: 'Expiry Date',
    key: 'expirydate',
    description: 'Expiry Date',
    selector: (row) => toShortDate(row.expirydate),
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
];

export const ProductAuditSchema = [
  {
    name: 'S/N',
    key: 'sn',
    description: 'S/N',
    selector: (row) => row.sn,
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Type',
    key: 'type',
    description: 'Type',
    selector: (row) => row.type,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_LIST,
    options: ['Purchase Invoice', 'Initialization', 'Audit'],
  },
  {
    name: 'Supplier',
    key: 'supplier',
    description: 'Supplier',
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Date',
    key: 'date',
    description: 'date',
    sortable: true,
    required: true,
    inputType: InputType.DATE,
  },
  {
    name: 'DocumentNo',
    key: 'documentNo',
    description: 'DocumentNo',
    selector: (row) => toShortDate(row.expirydate),
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Total Amount',
    key: 'totalamount',
    description: 'Total Amount',
    selector: (row) => toShortDate(row.expirydate),
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Product',
    key: 'productId',
    description: 'Total Amount',
    selector: (row) => toShortDate(row.expirydate),
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
  },
  {
    name: 'Quantity',
    key: 'quantity',
    description: 'Quantity',
    selector: (row) => toShortDate(row.quantity),
    sortable: true,
    required: true,
    inputType: InputType.NUMBER,
  },
  {
    name: 'Cost Price',
    key: 'Cost Price',
    description: 'Cost Price',
    selector: (row) => toShortDate(row.costprice),
    sortable: true,
    required: true,
    inputType: InputType.NUMBER,
  },
];
