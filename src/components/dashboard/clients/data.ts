import { TableColumn } from 'react-data-table-component';
export interface AppointmentDataRow {
  id: string;
  dtime: string;
  fname: string;
  lname: string;
  classification: string;
  location: string;
  type: string;
  status: string;
  reason: string;
  practitioner: string;
}

export interface ClientDataRow {
  id: any;
  fname: string;
  lname: string;
  mname: string;
  age: any;
  gender: string;
  phone: string;
  email: string;
  maritalStatus: string;
  religion: string;
  medicalRecord: string;
  profession: string;
  country: string;
  state: string;
  LGA: string;
  townCity: string;
  neighborhood: string;
  streetAddress: string;
  tags: string;
  otherBioData: string;
  nextOfKin: string;
  nonHospitalIndetifiers: string;
  paymentInformation: string;
  assignToCareTeam: boolean;
  nextOfKinFullName: string;
  nextOfKinPhone: string;
  nextOfKinEmail: string;
  nextOfKinRelationship: string;
  nationalID: string;
  internationPassportNumber: string;
  votersCardNumber: string;
  driversLicenseNumber: string;
  bloodGroup: string;
  genotype: string;
  disabilities: string;
  allergies: string;
  coMobidities: string;
  specificDetails: string;
}

export const columnsClient: TableColumn<ClientDataRow>[] = [
  {
    name: 'S/N',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'First Name',
    selector: row => row.fname,
    sortable: true,
  },
  {
    name: 'Midlle Name',
    selector: row => row.mname,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.lname,
    sortable: true,
  },
  {
    name: 'Age',
    selector: row => row.age,
    sortable: true,
  },
  {
    name: 'Gender',
    selector: row => row.gender,
    sortable: true,
  },
  {
    name: 'Phone',
    selector: row => row.phone,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.phone,
    sortable: true,
  },
  {
    name: 'Marital Status',
    selector: row => row.maritalStatus,
    sortable: true,
  },
  {
    name: 'Religion',
    selector: row => row.religion,
    sortable: true,
  },
  {
    name: 'Medical Records',
    selector: row => row.medicalRecord,
    sortable: true,
  },
  {
    name: 'Profession',
    selector: row => row.profession,
    sortable: true,
  },
];

export const dataClient = [
  {
    id: 1,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 2,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 3,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 4,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 5,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 6,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 7,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 8,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 9,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 10,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 11,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 12,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 13,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 14,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 15,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 16,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 17,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
  {
    id: 18,
    fname: 'Ozumba-Mbadikwe',
    lname: 'Adebukola',
    mname: 'Reekado',
    age: 40,
    gender: 'Male',
    phone: '080 808 13341',
    email: 'bukola@healthstacaf...',
    maritalStatus: 'Single',
    religion: 'Christianity',
    medicalRecord: '',
    profession: 'Un-employed',
    country: 'Nigeria',
    state: 'Lagos',
    LGA: 'Lagos S/W',
    townCity: 'Ikeja',
    neighborhood: 'Surulere',
    streetAddress: '5B Lawanson ',
    tags: '',
    otherBioData: '',
    nextOfKin: 'Ozumba-Mbadikwe Tosin',
    nonHospitalIndetifiers: '',
    paymentInformation: 'paid',
    assignToCareTeam: true,
    nextOfKinFullName: 'Ozumba-Mbadikwe Tosin',
    nextOfKinPhone: '080 808 13341',
    nextOfKinEmail: 'ozumba@mail.com',
    nextOfKinRelationship: 'Father',
    nationalID: '1233',
    internationPassportNumber: 'ASD72T35R3',
    votersCardNumber: '12234455',
    driversLicenseNumber: '122idjndjn',
    bloodGroup: 'AA',
    genotype: 'A+',
    disabilities: 'none',
    allergies: 'none',
    coMobidities: 'none',
    specificDetails: 'none',
  },
];

export const columnsAppointment: TableColumn<AppointmentDataRow>[] = [
  {
    name: 'S/N',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'Date/Time',
    selector: row => row.dtime,
    sortable: true,
  },
  {
    name: 'First Name',
    selector: row => row.fname,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.lname,
    sortable: true,
  },
  {
    name: 'Classification',
    selector: row => row.classification,
    sortable: true,
  },
  {
    name: 'Location',
    selector: row => row.location,
    sortable: true,
  },
  {
    name: 'Type',
    selector: row => row.type,
    sortable: true,
  },
  {
    name: 'Status',
    selector: row => row.status,
    sortable: true,
  },
  {
    name: 'Reason',
    selector: row => row.reason,
    sortable: true,
  },
  {
    name: 'Practitioner',
    selector: row => row.practitioner,
    sortable: true,
  },
];

export const dataAppointments = [
  {
    id: '1',
    dtime: '27-10-21 09:43:00',
    fname: 'John',
    lname: 'Doe',
    classification: 'On-site',
    location: 'Oupatient Clinic',
    type: 'New',
    status: 'Scheduled',
    reason: 'Headache',
    practitioner: 'Simpa Diana',
  },
  {
    id: '2',
    dtime: '27-10-21 09:43:00',
    fname: 'Wale',
    lname: 'Adeniji',
    classification: 'On-site',
    location: 'Oupatient Clinic',
    type: 'New',
    status: 'Scheduled',
    reason: 'Headache',
    practitioner: 'Simpa Diana',
  },
  {
    id: '3',
    dtime: '27-10-21 09:43:00',
    fname: 'Jon',
    lname: 'Smith',
    classification: 'On-site',
    location: 'Oupatient Clinic',
    type: 'New',
    status: 'Scheduled',
    reason: 'Headache',
    practitioner: 'Simpa Diana',
  },
  {
    id: '4',
    dtime: '27-10-21 09:43:00',
    fname: 'Wale',
    lname: 'Adeniji',
    classification: 'On-site',
    location: 'Oupatient Clinic',
    type: 'New',
    status: 'Scheduled',
    reason: 'Headache',
    practitioner: 'Simpa Diana',
  },
  {
    id: '5',
    dtime: '27-10-21 09:43:00',
    fname: 'Wale',
    lname: 'Adeniji',
    classification: 'On-site',
    location: 'Oupatient Clinic',
    type: 'New',
    status: 'Scheduled',
    reason: 'Headache',
    practitioner: 'Simpa Diana',
  },
  {
    id: '6',
    dtime: '27-10-21 09:43:00',
    fname: 'Wale',
    lname: 'Adeniji',
    classification: 'On-site',
    location: 'Oupatient Clinic',
    type: 'New',
    status: 'Scheduled',
    reason: 'Headache',
    practitioner: 'Simpa Diana',
  },
  {
    id: '7',
    dtime: '27-10-21 09:43:00',
    fname: 'Wale',
    lname: 'Adeniji',
    classification: 'On-site',
    location: 'Oupatient Clinic',
    type: 'New',
    status: 'Scheduled',
    reason: 'Headache',
    practitioner: 'Simpa Diana',
  },
  {
    id: '8',
    dtime: '27-10-21 09:43:00',
    fname: 'Wale',
    lname: 'Adeniji',
    classification: 'On-site',
    location: 'Oupatient Clinic',
    type: 'New',
    status: 'Scheduled',
    reason: 'Headache',
    practitioner: 'Simpa Diana',
  },
  {
    id: '9',
    dtime: '27-10-21 09:43:00',
    fname: 'Wale',
    lname: 'Adeniji',
    classification: 'On-site',
    location: 'Oupatient Clinic',
    type: 'New',
    status: 'Scheduled',
    reason: 'Headache',
    practitioner: 'Simpa Diana',
  },
  {
    id: '10',
    dtime: '27-10-21 09:43:00',
    fname: 'Wale',
    lname: 'Adeniji',
    classification: 'On-site',
    location: 'Oupatient Clinic',
    type: 'New',
    status: 'Scheduled',
    reason: 'Headache',
    practitioner: 'Simpa Diana',
  },
];