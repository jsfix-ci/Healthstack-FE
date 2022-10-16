import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// const clientsList = [...Array(100)].map((_, index) => ({
//   id: faker.datatype.uuid(),
//   avartarUrl: faker.image.avatar(),
//   firstname: faker.name.firstName(),
//   middlename: faker.name.middleName(),
//   lastname: faker.name.lastName(),
//   dob: `${faker.date.birthdate({ min: 18, max: 65, mode: 'age' })}`,
//   gender: sample(['Male', 'Female']),
//   maritalstatus: sample(['Single', 'Married', 'Divorced']),
//   residentialaddress: faker.address.streetName(),
//   email: faker.internet.exampleEmail(),
//   phone: faker.phone.phoneNumber(),
//   town: faker.address.city(),
//   state: faker.address.state(),
//   country: faker.address.country(),
//   nextofkin: faker.name.findName(),
//   nextofkinphone: faker.phone.phoneNumber(),
//   company: faker.company.companyName(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'inactive']),
// }));

const clientsList = [...Array(100)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avartarUrl: faker.image.avatar(),
  firstname: faker.name.firstName(),
  middlename: faker.name.middleName(),
  lastname: faker.name.lastName(),
  dob: `${faker.date.birthdate({ min: 18, max: 65, mode: 'age' })}`,
  gender: sample(['Male', 'Female']),
  maritalstatus: sample(['Single', 'Married', 'Divorced']),
  residentialaddress: faker.address.streetName(),
  email: faker.internet.exampleEmail(),
  phone: faker.phone.phoneNumber(),
  town: faker.address.city(),
  state: faker.address.state(),
  country: faker.address.country(),
  nextofkin: faker.name.findName(),
  nextofkinphone: faker.phone.phoneNumber(),
  company: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'inactive']),
  names: [
    { firstname: faker.name.firstName() },
    { middlename: faker.name.middleName() },
    { lastname: faker.name.lastName() },
  ],
  biodata: [
    { dob: `${faker.date.birthdate({ min: 18, max: 65, mode: 'age' })}` },
    { gender: sample(['Male', 'Female']) },
    { maritalstatus: sample(['Single', 'Married', 'Divorced']) },
    { religion: sample(['Christianity', 'Islam', 'Rather not say']) },
    { medicalRecords: ['Record', 'Record 2'] },
    { profession: sample(['Private', 'Public', 'Others']) },
    { phone: faker.phone.phoneNumber() },
    { email: faker.internet.exampleEmail() },
  ],

  address: [
    { country: faker.address.country() },
    { state: faker.address.state() },
    { localgovernment: faker.address.state() },
    { town: faker.address.city() },
    { neighbourhood: faker.address.city() },
    { residentialaddress: faker.address.street() },
  ],
  otherDetails: [
    { medicaldata: ['Record', 'Record 2'] },
    { tags: ['Tag 1', 'Tag 2'] },
    { otherbiodata: faker.lorem.text() },
    { nextofkin: faker.name.findName() },
    { nonhospitalindetifiers: sample(['CD120', 'CD122', 'CD120', 'CD130']) },
    { paymentinformation: sample(['Paid', 'Out of cash']) },
    { assignttocareteam: sample(['Yes', 'No']) },
  ],

  nextofkins: [
    { nextofkin: faker.name.findName() },
    { nextofkinphone: faker.phone.number() },
    { nextofkinemail: faker.internet.exampleEmail() },
    {
      relationship: sample(['Parent(s)', 'Sibling(s)', 'Spouse', 'Friend(s)']),
    },
  ],
  nonHospitalIndetifiers: [
    { nin: 'NGA' + Math.round(Math.random() * 142553663673700) },
    {
      passportnumber: 'NGAPASS' + Math.round(Math.random() * 142553663673700),
    },
    {
      voterscardnumber: 'NGAVOTE' + Math.round(Math.random() * 142553663673700),
    },
    {
      driverslicensenumber:
        'NGADRIVE' + Math.round(Math.random() * 142553663673700),
    },
  ],

  paymentInformation: [
    { accountname: faker.name.findName() },
    { bank: faker.name.findName() },
    { accountnumber: `${Math.round(Math.random() * 14263673700)}` },
    {
      paymentmethod: sample(['Cash', 'Transfer']),
    },
  ],

  medicalData: [
    {
      bloodgroup: sample(['AA', 'AB', 'SS', 'AC', 'CS']),
    },
    {
      genotype: sample(['A+', 'A-', 'B+']),
    },
    {
      disabilities: sample(['Back', 'Eye sight']),
    },
    {
      allergies: sample(['Back', 'Eye sight']),
    },
    {
      comobidities: sample(['Back', 'Eye sight']),
    },
    { payment: faker.name.findName() },
    { details: faker.lorem.text() },
  ],

  // nextofkin: faker.name.findName(),
  // nextofkinphone: faker.phone.phoneNumber(),
  // company: faker.company.companyName(),
  // isVerified: faker.datatype.boolean(),
  // status: sample(['active', 'inactive']),
}));

const appointmentList = [...Array(100)].map((_, index) => ({
  id: faker.datatype.uuid(),
  firstname: faker.name.firstName(),
  middlename: faker.name.middleName(),
  lastname: faker.name.lastName(),
  practitionername: faker.name.lastName(),
  clientId: faker.datatype.uuid(),
  location: faker.address.country(),
  employee: faker.name.findName(),
  start_time: `${faker.date.birthdate({ min: 18, max: 65, mode: 'age' })}`,
  appointmentClass: sample(['On-site', 'Telemedicine', 'Home Visit']),
  appointment_type: sample(['New', 'Type B', 'Follow up', 'Annual Checkup']),
  appointment_status: sample([
    'Scheduled',
    'Confirmed',
    'Checked In',
    'Vitals Taken',
    'With Nurse',
    'With Doctor',
  ]),
  appointment_reason: faker.lorem.sentence(),
}));

const bandList = [...Array(100)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  bandType: sample(['Provider', 'Company', 'Patient', 'Plan']),
  description: faker.name.findName(),
}));

const employeeList = [...Array(100)].map((_, index) => ({
  id: faker.datatype.uuid(),
  firstname: faker.name.firstName(),
  middlename: faker.name.middleName(),
  lastname: faker.name.lastName(),
  profession: sample(['Private', 'Public', 'Others']),
  description: faker.name.findName(),
  email: faker.internet.exampleEmail(),
  phone: faker.phone.phoneNumber(),
  department: sample([
    'Admin',
    'Pharmacy',
    'Frontdesk',
    'Nursing',
    'Intensive Care',
  ]),
  deptunit: sample([
    'Admin',
    'Pharmacy',
    'Frontdesk',
    'Nursing',
    'Intensive Care',
  ]),
}));
const locationList = [...Array(100)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  locationType: sample(['Provider', 'Company', 'Patient', 'Plan']),
}));
const visitList = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  visithistory: faker.name.findName(),
}));
const drugList = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  drugtolerance: faker.name.findName(),
}));
const medicationList = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  medications: faker.name.findName(),
}));
const problemList = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  problemlist: faker.name.findName(),
}));
const taskList = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  tasks: faker.name.findName(),
}));

const billList = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  date: `${faker.date.birthdate({ min: 18, max: 65, mode: 'age' })}`,
  description: faker.name.findName(),
  status: sample(['Paid', 'Pending', 'Cancelled']),
  amount: sample(['20', '85', '250', '200', '100']),
}));

const prescriptionList = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  prescription: faker.name.findName(),
  date: `${faker.date.birthdate({ min: 18, max: 65, mode: 'age' })}`,
  duration: sample(['20', '85', '250', '200', '100']),
}));

const diagnosticList = [...Array(20)].map((_, index) => ({
  id: faker.datatype.uuid(),
  date: `${faker.date.birthdate({ min: 18, max: 65, mode: 'age' })}`,
  description: faker.name.findName(),
  status: sample(['Paid', 'Pending', 'Cancelled']),
  reqphysician: faker.name.findName(),
  reqfacility: faker.name.findName(),
  processfacility: faker.name.findName(),
}));

const clientAppointmentList = [...Array(100)].map((_, index) => ({
  id: faker.datatype.uuid(),
  date: `${faker.date.birthdate({ min: 18, max: 65, mode: 'age' })}`,
  type: sample(['Onsite', 'Video', 'Telemedicne', 'Chat']),
  facility: faker.address.country(),
  reason: faker.lorem.sentence(),
  status: sample([
    'Scheduled',
    'Confirmed',
    'Checked In',
    'Vitals Taken',
    'With Nurse',
    'With Doctor',
  ]),
  consultphysician: faker.name.findName(),
}));
const paymentList = [...Array(20)].map((_, index) => ({
  id: faker.datatype.uuid(),
  date: `${faker.date.birthdate({ min: 18, max: 65, mode: 'age' })}`,
  description: faker.name.findName(),
  status: sample(['Paid', 'Pending', 'Cancelled']),
}));

const reportList = [...Array(4)].map((_, index) => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  startDate: `${faker.date.birthdate({ min: 18, max: 65, mode: 'age' })}`,
  endDate: `${faker.date.birthdate({ min: 18, max: 65, mode: 'age' })}`,
  description: faker.name.findName(),
  days: sample(['10', '20', '30']),
  maximumDays: sample(['10', '20', '30']),
  info: faker.name.lastName(),
}));

const invoiceList = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  category: sample(['Prescription', 'Medication', 'Lab Test']),
  type: sample(['Full', 'Part']),
  description: faker.name.lastName(),
  amountDue: sample(['1000', '2500', '3100']),
  paidUp: sample(['1000', '2500', '3100']),
  amount: sample(['1000', '2500', '3100']),
}));
const labList = [...Array(6)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  result: sample(['023.45', '1000.02', '19,34']),
  range: sample(['20 - 400', '90 - 540', '19-34']),
  units: sample(['mmHg', 'mg/ml']),
  flag: sample(['High', 'Low']),
}));
export {
  clientsList,
  appointmentList,
  bandList,
  employeeList,
  locationList,
  visitList,
  drugList,
  medicationList,
  problemList,
  taskList,
  billList,
  prescriptionList,
  diagnosticList,
  clientAppointmentList,
  paymentList,
  reportList,
  invoiceList,
  labList,
};
