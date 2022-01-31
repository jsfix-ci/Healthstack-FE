enum InputType {
  HIDDEN,
  TEXT,
  SELECT,
  DATE,
}

const BandSchema = [
  {
    name: "S/N",
    key: "_id",
    description: "Enter name of band",
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: "Name of Band",
    key: "name",
    description: "Enter name of band",
    selector: (row) => row.name,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: "Band Type",
    key: "bandType",
    description: "Enter name of band",
    selector: (row) => row.bandType,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
  },
  {
    name: "Description of Band",
    key: "description",
    description: "Enter description of band",
    selector: (row) => row.description,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
];

const PaymentDetailsSchema = [
  {
    name: "S/N",
    key: "_id",
    description: "",
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: "payment Options",
    key: "paymentmode",
    description: "Enter payment Option",
    selector: (row) => row.paymentmode,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
  },
  {
    name: "Amount",
    key: "amount",
    description: "Enter Amount",
    selector: (row) => row.amount,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: "Description",
    key: "description",
    description: "Enter description",
    selector: (row) => row.description,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
];

const PaymentSchema = [
  {
    name: "S/N",
    key: "_id",
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: "Name",
    key: "name",
    description: "Enter name of band",
    selector: (row) => row.orderInfo.orderObj.clientname,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: "Date",
    key: "date",
    description: "Enter date",
    selector: (row) => row.createdAt && row.createdAt.substring(0, 10),
    sortable: true,
    required: true,
    inputType: InputType.DATE,
  },
  {
    name: "Description of Band",
    key: "description",
    description: "Enter description of band",
    selector: (row) => row.orderInfo.orderObj.order,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: "Status",
    key: "billing_status",
    description: "Enter status",
    selector: (row) => row.billing_status,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: "Amount",
    key: "amount",
    description: "Enter amount",
    selector: (row) => row.serviceInfo.amount,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
];
const paymentOptions = ["Cash", "Wallet", "Bank Transfer", "Card", "Cheque"];

const typeOptions = [
  {
    value: "Full",
    label: "full",
  },
  {
    value: "Part",
    label: "Part",
  },
];

export { BandSchema, InputType, paymentOptions,PaymentDetailsSchema, typeOptions, PaymentSchema };
