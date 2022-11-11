/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Route, useNavigate, Link, NavLink } from 'react-router-dom';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
import { formatDistanceToNowStrict, format, subDays, addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import LocationSearch from '../helpers/LocationSearch';
import EmployeeSearch from '../helpers/EmployeeSearch';
import BillServiceCreate from '../Finance/BillServiceCreate';
import 'react-datepicker/dist/react-datepicker.css';

import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import Switch from '../../components/switch';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import CalendarGrid from '../../components/calender';
import ModalBox from './modal/index';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import { Box, Grid, Typography } from '@mui/material';
import DebouncedInput from '../Appointment/ui-components/inputs/DebouncedInput';
import { McText } from './text';
import Input from '../../components/inputs/basic/Input/index';
import ToggleButton from '../../components/toggleButton';
import RadioButton from '../../components/inputs/basic/Radio';
import BasicDatePicker from '../../components/inputs/Date';
import BasicDateTimePicker from '../../components/inputs/DateTime';
import CustomSelect from '../../components/inputs/basic/Select';
import Textarea from '../../components/inputs/basic/Textarea';
import { MdCancel, MdAddCircle } from 'react-icons/md';
import PatientProfile from '../Client/PatientProfile';

// eslint-disable-next-line
const searchfacility = {};

export default function GeneralAppointments() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="section remPadTop">
      <PreAuthorizationList showModal={showModal} setShowModal={setShowModal} />
      {showModal && (
        <ModalBox open={showModal} setOpen={setShowModal}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <PatientProfile />
            </Grid>
            <Grid item xs={6}>
              <PreAuthorizationCreate
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </Grid>
          </Grid>
        </ModalBox>
      )}
    </section>
  );
}

export function PreAuthorizationCreate({ showModal, setShowModal }) {
  const { state, setState } = useContext(ObjectContext);
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [message, setMessage] = useState('');
  const [clientId, setClientId] = useState();
  const [locationId, setLocationId] = useState();
  const [practionerId, setPractionerId] = useState();
  const [type, setType] = useState();
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service('appointments');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  // const [appointment_reason,setAppointment_reason]= useState()
  const [appointment_status, setAppointment_status] = useState('');
  const [appointment_type, setAppointment_type] = useState('');
  const [billingModal, setBillingModal] = useState(false);

  const [chosen, setChosen] = useState();
  const [chosen1, setChosen1] = useState();
  const [chosen2, setChosen2] = useState();
  const appClass = ['On-site', 'Teleconsultation', 'Home Visit'];

  let appointee; //  =state.ClientModule.selectedClient
  /*  const getSearchfacility=(obj)=>{
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    } */
  const handleChangeType = async (e) => {
    await setAppointment_type(e.target.value);
  };

  const handleChangeStatus = async (e) => {
    await setAppointment_status(e.target.value);
  };

  const getSearchfacility = (obj) => {
    setClientId(obj._id);
    setChosen(obj);
    //handleRow(obj)
    if (!obj) {
      //"clear stuff"
      setClientId();
      setChosen();
    }

    /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };
  const getSearchfacility1 = (obj) => {
    setLocationId(obj._id);
    setChosen1(obj);

    if (!obj) {
      //"clear stuff"
      setLocationId();
      setChosen1();
    }
  };
  const getSearchfacility2 = (obj) => {
    setPractionerId(obj._id);
    setChosen2(obj);

    if (!obj) {
      //"clear stuff"
      setPractionerId();
      setChosen2();
    }
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage('');
    setError(false);
    setSuccess(false);
    setShowModal(false),
      setState((prevstate) => ({
        ...prevstate,
        AppointmentModule: {
          selectedAppointment: {},
          show: 'list',
        },
      }));

    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    data.locationId = locationId; //state.ClinicModule.selectedClinic._id
    data.practitionerId = practionerId;
    data.appointment_type = appointment_type;
    // data.appointment_reason=appointment_reason
    data.appointment_status = appointment_status;
    data.clientId = clientId;
    data.firstname = chosen.firstname;
    data.middlename = chosen.middlename;
    data.lastname = chosen.lastname;
    data.dob = chosen.dob;
    data.gender = chosen.gender;
    data.phone = chosen.phone;
    data.email = chosen.email;
    data.practitioner_name = chosen2.firstname + ' ' + chosen2.lastname;
    data.practitioner_profession = chosen2.profession;
    data.practitioner_department = chosen2.department;
    data.location_name = chosen1.name;
    data.location_type = chosen1.locationType;
    data.actions = [
      {
        action: appointment_status,
        actor: user.currentEmployee._id,
      },
    ];
    console.log(data);

    ClientServ.create(data)
      .then((res) => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        setAppointment_type('');
        setAppointment_status('');
        setClientId('');
        setLocationId('');
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        setSuccess1(true);
        setSuccess2(true);
        toast({
          message:
            'Appointment created succesfully, Kindly bill patient if required',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setSuccess1(false);
        setSuccess2(false);
        // showBilling()
      })
      .catch((err) => {
        toast({
          message: 'Error creating Appointment ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    getSearchfacility(state.ClientModule.selectedClient);

    /* appointee=state.ClientModule.selectedClient 
        console.log(appointee.firstname) */
    return () => {};
  }, [state.ClientModule.selectedClient]);

  /*   const showBilling = () =>{
        setBillingModal(true)
       //history.push('/app/finance/billservice')
        }
        const  handlecloseModal1 = () =>{
            setBillingModal(false)
            }


            const handleRow= async(Client)=>{
              //  await setSelectedClient(Client)
                const    newClientModule={
                    selectedClient:Client,
                    show :'detail'
                }
               await setState((prevstate)=>({...prevstate, ClientModule:newClientModule}))
            } */
  const CustomSelectData = [
    {
      label: 'Today',
      value: 'today',
    },
  ];

  return (
    <>
      <div className="card ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ModalHeader text={'Pre-authorization'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MdCancel
                onClick={() => {
                  setShowModal(false),
                    setState((prevstate) => ({
                      ...prevstate,
                      AppointmentModule: {
                        selectedAppointment: {},
                        show: 'list',
                      },
                    }));
                }}
                style={{
                  fontSize: '2rem',
                  color: 'crimson',
                  cursor: 'pointer',
                  float: 'right',
                }}
              />
            </Grid>
          </Grid>

          {/* <McText
            txt={'Patient Information'}
            color={'#0064CC'}
            type={'p'}
            bold={'700'}
            size={'18px'}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Input name="patientname" label="Patient Name" type="text" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <RadioButton
                name="gender"
                title="Gender"
                options={[
                  {
                    label: 'Male',
                    value: 'male',
                  },
                  {
                    label: 'Female',
                    value: 'female',
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input name="address" label="Address" type="text" />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Input
                name="healthCareProvider"
                label="Health Care Provider"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input name="preAuthId" label="Pre-auth ID" type="text" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input name="claimId" label="Claim ID" type="text" />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <BasicDateTimePicker
                name="dateOfRequest"
                label="Date of Request"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <RadioButton
                name="emergency"
                title="Emergency"
                options={[
                  {
                    label: 'Yes',
                    value: 'yes',
                  },
                  {
                    label: 'No',
                    value: 'no',
                  },
                ]}
              />
            </Grid>
          </Grid> */}

          <Grid container spacing={2} my={2}>
            <Grid item xs={12} sm={6}>
              <McText
                txt={'Clinical Information'}
                color={'#0064CC'}
                type={'p'}
                bold={'700'}
                size={'18px'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <button
                style={{
                  float: 'right',
                  backgroundColor: '#ECF3FF',
                  color: '#0064CC',
                  border: 'none',
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                <MdAddCircle
                  style={{
                    marginRight: '5px',
                  }}
                />
                Add complaints
              </button>
            </Grid>
          </Grid>

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="complaints"
                label="Complaints"
                options={CustomSelectData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="duration"
                label="Duration"
                options={CustomSelectData}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} my={2}>
            <Grid item xs={12} sm={12}>
              <McText
                txt={'Clinic Findings'}
                color={'#0064CC'}
                type={'p'}
                bold={'700'}
                size={'18px'}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="provisionalDiagnosis"
                label="Provisional Diagnosis"
                options={CustomSelectData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <button
                style={{
                  float: 'left',
                  backgroundColor: '#ECF3FF',
                  color: '#0064CC',
                  border: 'none',
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                <MdAddCircle
                  style={{
                    marginRight: '5px',
                  }}
                />
                Add Diagnosis
              </button>
            </Grid>
          </Grid>

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="plannedDiagnosis"
                label="Planned Procedure"
                options={CustomSelectData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <button
                style={{
                  float: 'left',
                  backgroundColor: '#ECF3FF',
                  color: '#0064CC',
                  border: 'none',
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                <MdAddCircle
                  style={{
                    marginRight: '5px',
                  }}
                />
                Add Procedure
              </button>
            </Grid>
          </Grid>

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="plannedService"
                label="Planned Service"
                options={CustomSelectData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <button
                style={{
                  float: 'left',
                  backgroundColor: '#ECF3FF',
                  color: '#0064CC',
                  border: 'none',
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                <MdAddCircle
                  style={{
                    marginRight: '5px',
                  }}
                />
                Add Service
              </button>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Textarea
                placeholder="Type your message here"
                name="reason"
                type="text"
                label="Reason for Request"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={6}>
              <Input
                name="physicianName"
                label="Physician's Name"
                type="text"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Button
                type="submit"
                style={{
                  backgroundColor: '#0364FF',
                  width: '100%',
                  cursor: 'pointer',
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

export function PreAuthorizationList({ showModal, setShowModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const ClientServ = client.service('appointments');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('list');

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedAppointment: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    //console.log(state)
    const newClient = {
      selectedClient: {},
      show: 'create',
    };
    await setState((prevstate) => ({ ...prevstate, ClientModule: newClient }));
    setShowModal(true);
  };

  const handleRow = async (Client) => {
    setShowModal(true);
    await setSelectedAppointment(Client);
    const newClientModule = {
      selectedAppointment: Client,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
  };
  //console.log(state.employeeLocation)

  const handleSearch = (val) => {
    const field = 'firstname';
    //  console.log(val)

    let query = {
      $or: [
        {
          firstname: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          lastname: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          middlename: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          phone: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          appointment_type: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          appointment_status: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          appointment_reason: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          location_type: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          location_name: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          practitioner_department: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          practitioner_profession: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          practitioner_name: {
            $regex: val,
            $options: 'i',
          },
        },
      ],
      facility: user.currentEmployee.facilityDetail._id, // || "",
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    };
    if (state.employeeLocation.locationType !== 'Front Desk') {
      query.locationId = state.employeeLocation.locationId;
    }

    ClientServ.find({ query: query })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(' Client  fetched successfully');
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage('Error fetching Client, probable network issues ' + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    console.log(user);
    if (user.currentEmployee) {
      let stuff = {
        facility: user.currentEmployee.facilityDetail._id,
        // locationId:state.employeeLocation.locationId,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
      // if (state.employeeLocation.locationType !== "Front Desk") {
      //   stuff.locationId = state.employeeLocation.locationId;
      // }

      const findClient = await ClientServ.find({ query: stuff });

      await setFacilities(findClient.data);
      console.log(findClient.data);
    } else {
      if (user.stacker) {
        const findClient = await ClientServ.find({
          query: {
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findClient.data);
      }
    }
  };

  useEffect(() => {
    if (user) {
      handleCalendarClose();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
    }
    ClientServ.on('created', (obj) => handleCalendarClose());
    ClientServ.on('updated', (obj) => handleCalendarClose());
    ClientServ.on('patched', (obj) => handleCalendarClose());
    ClientServ.on('removed', (obj) => handleCalendarClose());
    const newClient = {
      selectedClient: {},
      show: 'create',
    };
    setState((prevstate) => ({ ...prevstate, ClientModule: newClient }));
    return () => {};
  }, []);
  const handleCalendarClose = async () => {
    let query = {
      start_time: {
        $gt: subDays(startDate, 1),
        $lt: addDays(startDate, 1),
      },
      facility: user.currentEmployee.facilityDetail._id,

      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    };
    // if (state.employeeLocation.locationType !== "Front Desk") {
    //   query.locationId = state.employeeLocation.locationId;
    // }

    const findClient = await ClientServ.find({ query: query });

    await setFacilities(findClient.data);
  };

  const handleDate = async (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    if (!!startDate) {
      handleCalendarClose();
    } else {
      getFacilities();
    }

    return () => {};
  }, [startDate]);
  //todo: pagination and vertical scroll bar

  const onRowClicked = () => {};

  const mapFacilities = () => {
    let mapped = [];
    facilities.map((facility, i) => {
      mapped.push({
        title: facility?.firstname + ' ' + facility?.lastname,
        start: format(new Date(facility?.start_time), 'yyyy-MM-ddTHH:mm'),
        end: facility?.end_time,
        id: i,
      });
    });
    return mapped;
  };
  const activeStyle = {
    backgroundColor: '#0064CC29',
    border: 'none',
    padding: '0 .8rem',
  };

  const dummyData = [
    {
      date: '10/11/2021',
      patient_name: 'John Doe',
      policy_id: '09JDLDJ',
      provider: 'Health Stack Africa',
      hia: 'Name of HIA',
      status: 'approved',
      reason: 'Reason for the request',
      emergency: '',
    },
    {
      date: '10/12/2022',
      patient_name: 'Albert Einstein',
      policy_id: 'KGJG9049',
      provider: 'Marigold Surulere',
      hia: 'Name of HIA',
      status: 'pending',
      reason: 'Reason for the request',
      emergency: '',
    },
    {
      date: '10/05/2021',
      patient_name: 'Donald Trump',
      policy_id: '9950DKKD',
      provider: 'Test Pharmacy',
      hia: 'Name of HIA',
      status: 'declined',
      reason: 'Reason for the request',
      emergency: '',
    },

    {
      date: '10/7/2022',
      patient_name: 'David Guitar',
      policy_id: '958500D',
      provider: 'This-That Clinic',
      hia: 'Name of HIA',
      status: 'ongoing',
      reason: 'Reason for the request',
      emergency: '',
    },
  ];

  const returnCell = (status) => {
    // if (status === "approved") {
    //   return <span style={{color: "green"}}>{status}</span>;
    // }
    // else if
    switch (status.toLowerCase()) {
      case 'approved':
        return <span style={{ color: '#17935C' }}>{status}</span>;

      case 'ongoing':
        return <span style={{ color: '#0364FF' }}>{status}</span>;

      case 'declined':
        return <span style={{ color: '#ED0423' }}>{status}</span>;

      case 'pending':
        return <span style={{ color: '#EF9645' }}>{status}</span>;

      default:
        break;
    }
  };

  const preAuthSchema = [
    {
      name: 'Date/Time',
      key: 'sn',
      description: 'Enter name of Disease',
      selector: (row, i) => row.date,
      sortable: true,
      required: true,
      inputType: 'HIDDEN',
    },
    {
      name: "Patient's Name",
      key: 'clientname',
      description: 'Enter client name',
      selector: (row) => row.patient_name,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Policy ID',
      key: 'bills',
      description: 'Enter bills',
      selector: (row) => row.policy_id,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Provider',
      key: 'sn',
      description: 'Enter name of Disease',
      selector: (row, i) => row.provider,
      sortable: true,
      required: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'HIA',
      key: 'clientname',
      description: 'Enter client name',
      selector: (row) => row.hia,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Status',
      key: 'bills',
      description: 'Enter bills',
      selector: 'status',
      cell: (row) => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Emergency',
      key: 'bills',
      description: 'Enter bills',
      selector: (row) => row.emergency,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.status === 'approved',
      style: {
        color: 'red',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row) => row.status === 'ongoing',
      style: {
        color: 'rgba(0,0,0,.54)',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row) => row.status === 'pending',
      style: {
        color: 'pink',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row) => row.status === 'declined',
      style: {
        color: 'purple',
        backgroundColor: 'green',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ];

  return (
    <>
      {user ? (
        <>
          <div className="level">
            <PageWrapper
              style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}
            >
              <TableMenu>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {handleSearch && (
                    <div className="inner-table">
                      <FilterMenu onSearch={handleSearch} />
                    </div>
                  )}
                  <h2 style={{ margin: '0 10px', fontSize: '0.95rem' }}>
                    Pre-Authorization
                  </h2>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Filter By Date"
                    isClearable
                  />
                  {/* <SwitchButton /> */}
                  <Switch>
                    <button
                      value={value}
                      onClick={() => {
                        setValue('list');
                      }}
                      style={value === 'list' ? activeStyle : {}}
                    >
                      <BsList style={{ fontSize: '1rem' }} />
                    </button>
                    <button
                      value={value}
                      onClick={() => {
                        setValue('grid');
                      }}
                      style={value === 'grid' ? activeStyle : {}}
                    >
                      <BsFillGridFill style={{ fontSize: '1rem' }} />
                    </button>
                  </Switch>
                </div>

                {handleCreateNew && (
                  <Button
                    style={{ fontSize: '14px', fontWeight: '600' }}
                    label="Add new "
                    onClick={handleCreateNew}
                  />
                )}
              </TableMenu>
              <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
                {value === 'list' ? (
                  <CustomTable
                    title={''}
                    columns={preAuthSchema}
                    data={dummyData}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={handleRow}
                    progressPending={loading}
                    //conditionalRowStyles={conditionalRowStyles}
                  />
                ) : (
                  <CalendarGrid appointments={mapFacilities()} />
                )}
              </div>
            </PageWrapper>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
