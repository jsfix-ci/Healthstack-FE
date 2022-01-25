import {
  departmentOptions,
  statesOptions,
  unitsOptions,
} from '../../utils/data';

enum InputType {
  HIDDEN,
  TEXT,
  SELECT,
}

const BandSchema = [
  {
    name: 'S/N',
    key: '_id',
    description: 'Enter name of band',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Name of Band',
    key: 'name',
    description: 'Enter name of band',
    selector: (row) => row.name,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Band Type',
    key: 'bandType',
    description: 'Enter name of band',
    selector: (row) => row.bandType,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
  },
  {
    name: 'Description of Band',
    key: 'description',
    description: 'Enter description of band',
    selector: (row) => row.description,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
];

const OnboardingEmployeeSchema = [
  {
    name: 'S/N',
    key: '_id',
    description: 'Enter name of band',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Organization Email',
    key: 'organizationEmail',
    description: 'Email of  Organisation',
    selector: (row) => row.organizationEmail,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Employee Email',
    key: 'email',
    description: 'Email of  Employee',
    selector: (row) => row.email,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Country',
    key: 'country',
    description: 'Country',
    selector: (row) => row.country,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: ['Nigeria']
  },
  {
    name: 'State',
    key: 'state',
    description: 'State',
    selector: (row) => row.state,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: statesOptions,
  },
  {
    name: 'Department',
    key: 'department',
    description: 'Department',
    selector: (row) => row.department,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: departmentOptions,
  },
  {
    name: 'Unit',
    key: 'unit',
    description: 'Unit',
    selector: (row) => row.unit,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: unitsOptions,
  },
];

export { BandSchema, InputType, OnboardingEmployeeSchema };
