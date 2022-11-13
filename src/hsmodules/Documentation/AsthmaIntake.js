import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {DocumentClassList} from "./DocumentClass";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {Box, getValue} from "@mui/system";
import {Button, Collapse, Grid, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Input from "../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import RadioButton from "../../components/inputs/basic/Radio";

export default function AsthmaIntake() {
  const {register, handleSubmit, setValue, getValues, watch} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [allergy, setAllergy] = useState("");
  const [reaction, setReaction] = useState("");
  const [allergine, setAllergine] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [dataset, setDataset] = useState();
  const {state} = useContext(ObjectContext);
  const [docStatus, setDocStatus] = useState("Draft");

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  const formValues = getValues();

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) =>
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
      // setSymptoms(draftDoc.documentdetail.Presenting_Complaints)
      setAllergies(draftDoc.documentdetail.Allergy_Skin_Test);
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
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

  const onSubmitTest = (data, e) => {
    e.preventDefault();

    console.log(data);
    console.log(formValues);
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //console.log(data)
    data.Allergy_Skin_Test = allergies;

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname = "Adult Asthma Questionnaire"; //"Lab Result"
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = docStatus === "Draft" ? "Draft" : "completed";
    //console.log(document)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    let confirm = window.confirm(
      `You are about to save this document ${document.documentname} ?`
    );
    if (confirm) {
      if (!!draftDoc && draftDoc.status === "Draft") {
        ClientServ.patch(draftDoc._id, document)
          .then(res => {
            //console.log(JSON.stringify(res))
            e.target.reset();
            setAllergies([]);
            /*  setMessage("Created Client successfully") */
            setSuccess(true);
            toast({
              message: "Adult Asthma Questionnaire updated succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
          })
          .catch(err => {
            toast({
              message: "Error updating Adult Asthma Questionnaire " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      } else {
        ClientServ.create(document)
          .then(res => {
            //console.log(JSON.stringify(res))
            e.target.reset();
            setAllergies([]);
            /*  setMessage("Created Client successfully") */
            setSuccess(true);
            toast({
              message: "Adult Asthma Questionnaire created succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
          })
          .catch(err => {
            toast({
              message: "Error creating Adult Asthma Questionnaire " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      }
    }
  };
  const handleChangePart = async e => {
    //console.log(e)
    //const (name, value) = e.target
    let {name, value} = e.target;
    console.log(name, value);
    await setDataset(prev => ({...prev, [name]: value}));
    //  console.log(dataset)
  };
  const handleChangeType = async e => {
    // await setAppointment_type(e.target.value)
    console.log(e);
  };
  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };

  const handleAllergy = async e => {
    //console.log(e)
    //const (name, value) = e.target
    const {name, value} = e.target;
    console.log(name, value);
    // [name]=value
    await setAllergy(prev => ({...prev, [name]: value}));
    console.log(allergy);
  };
  const handleAdd = () => {
    let allergy = {
      allergine: allergine,
      reaction: reaction,
    };
    setAllergies(prev => [...prev, allergy]);
    setAllergy({});
    setReaction("");
    setAllergine("");
  };

  //USE THIS TO SHOW OTHER RACES INPUT WHEN USER SELECT OTHERS// CAN BE IMPLEMENTED FOR SIMILAR RADIO INPUTS TOO
  const selectedRace = watch("Race", "Others");
  const selectedEducation = watch("Education", "Others (Specify)");
  const selectedCough = watch("Cough_other", "Others");
  const selectedWheez = watch("Wheeze_other", "Others");
  const selectedShortness = watch("Shortness_other", "Others");
  const selectedTightness = watch("Tightness_other", "Others");
  const selectedInhaler = watch("Other_Medication", "Others");

  return (
    <>
      <Box sx={{width: "100%"}}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>Adult Asthma Questionnaire</Typography>
          <IconButton>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(onSubmitTest)}>
          <Grid>
            <Input
              register={register("Name")}
              //name="Name"
              type="text"
              label="Name or Initials"
            />
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MuiCustomDatePicker label="Date" register={register("Date")} />
            </Grid>

            <Grid item xs={6}>
              <MuiCustomDatePicker
                label="Date of birth"
                register={register("DOB")}
              />
            </Grid>
          </Grid>

          <Box>
            <RadioButton
              register={register("Gender")}
              title="4. Gender"
              options={["Male", "Female"]}
            />
          </Box>

          <Box>
            <RadioButton
              register={register("Race")}
              title="5. Race"
              options={["African", "Caucasian", "Asian", "Indian", "Others"]}
            />

            <Collapse in={selectedRace === "Others"}>
              <Box>
                <Input
                  label="Other race"
                  register={register("Others_race")}
                  name="Others_race"
                  type="text"
                />
              </Box>
            </Collapse>
          </Box>

          <Box>
            <RadioButton
              register={register("Maritial Status")}
              title="6. Maritial Status"
              options={[
                "Single",
                "Married",
                "Widowed",
                "Divorced",
                "Seperated",
              ]}
            />
          </Box>

          <Box>
            <Input
              label="Occupation"
              name="Occupation"
              type="text"
              register={register("Occupation")}
            />
          </Box>

          <Box>
            <RadioButton
              register={register("Education")}
              title="8. Level of Education"
              options={[
                "Uneducated",
                "Primary School",
                "Secondary School",
                "Diploma /Degree",
                "Others (Specify)",
              ]}
            />

            <Collapse in={selectedEducation === "Others (Specify)"}>
              <Box>
                <Input
                  label="Other levl of Education"
                  register={register("others_education")}
                  name="others_education"
                  type="text"
                />
              </Box>
            </Collapse>
          </Box>

          <Button type="submit">Submit</Button>
        </form>
      </Box>

      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Adult Asthma Questionnaire</p>
        </div>
        <div className="card-content vscrollable remPad1">
          {/*   <label className="label is-size-7">
                  Client:  {order.orderInfo.orderObj.clientname}
                </label>
                <label className="label is-size-7">
                 Test:  {order.serviceInfo.name}
                </label> */}
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <form>
            {/* <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  // {...register("input_name")}
                  name="Date"
                  type="text"
                  placeholder="Date"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  //{...register("input_name")}
                  name="Name"
                  type="text"
                  placeholder="Name or Initials"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="DOB"
                  type="text"
                  placeholder="Date of Birth"
                />
              </p>
            </div>
            <div className="field">
              <label>4. Gender</label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Gender"
                  value="Male"
                  onChange={e => {
                    handleChangePart(e);
                  }}
                />
                <span> Male</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Gender"
                  value="Female"
                  onChange={e => handleChangePart(e)}
                />
                <span>Female</span>
              </label>
            </div>

            <div className="field">
              <label>5. Race</label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Race"
                  value="African"
                  onChange={e => {
                    handleChangePart(e);
                  }}
                />
                <span> African</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Race"
                  value="Caucasian"
                  onChange={e => handleChangePart(e)}
                />
                <span>Caucasian</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Race"
                  value="Indian"
                  onChange={e => handleChangePart(e)}
                />
                <span>Indian </span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Race"
                  value="Others"
                  onChange={e => handleChangePart(e)}
                />
                <span>Others </span>
              </label>
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Others_race"
                  type="text"
                  placeholder="Highest Level of Education"
                />
              </p>
            </div> */}

            {/* ******************* START FROM BELOW TO CONTINUE **************** */}

            {/* <div className="field">
              <label>6. Marital Status</label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Marital_Status"
                  value="Single"
                  onChange={e => {
                    handleChangePart(e);
                  }}
                />
                <span> Single</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Marital_Status"
                  value="Married"
                  onChange={e => handleChangePart(e)}
                />
                <span>Married</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Marital_Status"
                  value="Widowed"
                  onChange={e => handleChangePart(e)}
                />
                <span>Widowed </span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Marital_Status"
                  value="Divorced"
                  onChange={e => handleChangePart(e)}
                />
                <span>Divorced </span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Marital_Status"
                  value="Separated"
                  onChange={e => handleChangePart(e)}
                />
                <span>Separated </span>
              </label>
            </div>
            <div className="field">
              <p className="control ">
                <input className="input is-small" {...register("input_name")} />
              </p>
            </div>
            <div className="field ">
              <label>8. Highest Level of Education</label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Education"
                  value="Uneducated"
                  onChange={e => {
                    handleChangePart(e);
                  }}
                />
                <span> Uneducated</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Education"
                  value="Primary School"
                  onChange={e => handleChangePart(e)}
                />
                <span>Primary School</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Education"
                  value="Secondary School"
                  onChange={e => handleChangePart(e)}
                />
                <span>Secondary School </span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Education"
                  value="Post-Secondary School (Diploma /Degree)"
                  onChange={e => handleChangePart(e)}
                />
                <span>Post-Secondary School (Diploma /Degree) </span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Education"
                  value="Others"
                  onChange={e => handleChangePart(e)}
                />
                <span>Others (Specify) </span>
              </label>
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="others_education"
                  type="text"
                  placeholder="Highest Level of Education"
                />
              </p>
            </div> */}
            <Box sx={{width: "100%"}}>
              <Typography variant="subtitle1"><b>Symptoms</b></Typography>
              <Typography variant='subtitle2'>A. Cough</Typography>
              <Box>
                <RadioButton
                  register={register("Cough")}
                  title="9. Were you ever bothered, or are you currently bothered by a
                    cough?"
                  options={[
                    "Yes",
                    "No",
                    "Uncertain",
                  ]}
            />
              </Box>
              <Box>
                <Typography variant='subtitle1'>10. Has your cough been triggered by any of the following
                conditions?</Typography>
                <RadioButton
              register={register("Cough_exercise")}
              title="(a) Exercise"
              options={[
                "Yes",
                "No",
              ]}
            />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_coldair")}
                  title="(b) Breathing cold air"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_dust")}
                  title="(c) Breathing house dust"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_mould")}
                  title="(d) Being in a mouldy, musty or damp place"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_weather")}
                  title="(e) Change in weather"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_cats")}
                  title="(f) Being near cats"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_dogs")}
                  title="(g) Being near dogs"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_otheranimal")}
                  title="(h) Being near any other animal (specify)"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_sleep")}
                  title="(i) During sleep at night"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_aspirin")}
                  title="(j) Taking aspirin"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_other")}
                  title="(k) Any other thing"
                  options={[
                    "Yes",
                    "No",
                    "Others"
                  ]}
                />
                <Collapse in={selectedCough === "Others"}>
                  <Box>
                    <Input
                      label="Specify"
                      register={register("specify_cough_other")}
                      name="specify_cough_other"
                      type="text"
                    />
                  </Box>
            </Collapse>
              </Box>
            </Box>
            <Box sx={{width: "100%"}}>
              <Box>
                  <Typography variant='subtitle1'>B. Wheezing</Typography>
                  <Box>
                  <RadioButton
                    register={register("Wheeze")}
                    title="11. Has your chest ever sounded wheezy or whistling?"
                    options={[
                      "Yes",
                      "No",
                      "Uncertain",
                    ]}
                />
                </Box>
                <Box>
                  <Typography variant='subtitle1'>12. Have you ever had wheeze on exposure to any of the
                following?</Typography>
                <Box>
                  <RadioButton
                    register={register("Wheeze_exercise")}
                    title="(a) Exercise"
                    options={[
                      "Yes",
                      "No",
                      "Uncertain",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_coldair")}
                    title="(b) Breathing cold air"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_dust")}
                    title="(c) Breathing house dust"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_mould")}
                    title="(d) Being in a mouldy, musty or damp place"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_weather")}
                    title="(e) Change in weather"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_cats")}
                    title="(f) Being near cats"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_dogs")}
                    title="(g) Being near dogs"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_otheranimal")}
                    title="(h) Being near any other animal (specify)"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_sleep")}
                    title="(i) During sleep at night"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_aspirin")}
                    title="(j) Taking aspirin"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_other")}
                    title="((k) Any other thing"
                    options={[
                      "Yes",
                      "No",
                      "Other",
                    ]}
                />
                <Collapse in={selectedWheez === "Others"}>
              <Box>
                <Input
                  label="Specify"
                  register={register("Wheeze_other")}
                  name="specify_wheeze_other"
                  type="text"
                />
              </Box>
            </Collapse>
                </Box>
                </Box>
                <Box sx={{width: "100%"}}>
                    <Typography variant='subtitle1'>C. Shortness of breath</Typography>
                    <Box>
                      <RadioButton
                    register={register("Shortness")}
                    title="13. Have you ever been bothered by shortness of breath when
                hurrying on flat ground or walking up a slight hill?"
                    options={[
                      "Yes",
                      "No",
                      "Uncertain",
                    ]}
                />
                    </Box>
                    <Box>
                      <Typography variant='subtitle2'>14. Have you ever had shortness of breath with exposure to any
                of the following circumstances?</Typography>
                      <RadioButton
                    register={register("Shortness_exercise")}
                    title="(a) Exercise"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_coldair")}
                    title="(b) Breathing cold air"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_dust")}
                    title="(c) Breathing house dust"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_mould")}
                    title="(d) Being in a mouldy, musty or damp place"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_weather")}
                    title="(e) Change in weather"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_cats")}
                    title="(f) Being near cats"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_dogs")}
                    title="(g) Being near dogs"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_otheranimal")}
                    title="(h) Being near any other animal (specify)"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_sleep")}
                    title="(i) During sleep at night"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_aspirin")}
                    title="(j) Taking aspirin"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_other")}
                    title="(k) Any other thing"
                    options={[
                      "Yes",
                      "No",
                      "Others"
                    ]}
                />
                <Collapse in={selectedShortness === "Others"}>
              <Box>
                <Input
                  label="Specify"
                  register={register("specify_Shortness_other")}
                  name="specify_Shortness_other"
                  type="text"
                />
              </Box>
            </Collapse>
                    </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{width: "100%"}}>
              <Typography varaint='subtitle1'>D. Tightness in Chest</Typography>
                <Box>
                  <RadioButton
                  register={register("Tightness")}
                  title="15. Have you ever been bothered by a tightness in your chest
                when hurrying on flat ground or walking up a slight hill?"
                  options={[
                    "Yes",
                    "No",
                    "Uncertain",
                  ]}
                />
                </Box>
                <Box>
                  <Typography variant='subtitle2'>16. Have you ever had tightness in your chest with exposure to
                any of the following circumstances?</Typography>
                  <RadioButton
                  register={register("Tightness_exercise")}
                  title="(a) Exercise"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_coldair")}
                  title="(b) Breathing cold air"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_dust")}
                  title="(c) Breathing house dust"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_mould")}
                  title="(d) Being in a mouldy, musty or damp place"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_weather")}
                  title="(e) Change in weather"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_cats")}
                  title="(f) Being near cats"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_dogs")}
                  title="(g) Being near dogs"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_otheranimal")}
                  title="(h) Being near any other animal (specify)"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_sleep")}
                  title="(i) During sleep at night"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_aspirin")}
                  title="(j) Taking aspirin"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_other")}
                  title="(k) Any other thing"
                  options={[
                    "Yes",
                    "No",
                    "Other"
                  ]}
                />
                <Collapse in={selectedTightness === "Others"}>
              <Box>
                <Input
                  label="Specify"
                  register={register("specify_Tightness_other")}
                  name="specify_Tightness_other"
                  type="text"
                />
              </Box>
            </Collapse>
                </Box>
            </Box>
            <Box sx={{width: "100%"}}>
                  <Typography varaint='subtitle1'>Asthma History</Typography>
                  <Box>
                  <RadioButton
                  register={register("Asthma")}
                  title="17. Have you ever had asthma?"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <Typography variant='subtitle2'>17b. When was your asthma diagnosed? (Age in years)</Typography>
                    <Input
                  register={register("age_diagnosis")}
                  //name="Name"
                  type="text"
                  label="Specify"
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Asthma_Confirmed")}
                  title="17c. Was your asthma confirmed by a doctor?"
                  options={[
                    "Yes",
                    "No",
                    "Not Sure",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Visit_Doctor")}
                  title="17d. Have you ever needed to visit a doctor at least once a
                    year for your asthma?"
                  options={[
                    "Yes",
                    "No",
                    "Not sure",
                  ]}
                />
                </Box>
                <Box>
                  <Typography variant='subtitle1'>17e. During the last 12 months, how many times did you need
                    to visit a doctor for your asthma</Typography>
                   <Input
                  register={register("times_visit")}
                  //name="Name"
                  type="text"
                  label="Specify"
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Casualty")}
                  title="18. Have you ever needed to go to the Casualty Clinic
                    (Accident &Emergency Dept), doctor's office, because of an
                    asthma attack?"
                  options={[
                    "Yes",
                    "No",
                    "Not Sure",
                  ]}
                />
                </Box>
                <Box>
                  <Typography variant='subtitle1'>
                    18b If yes to question 18a above, How many times in the last 12months?
                  </Typography>
                 <Input
                  register={register("times_12months")}
                  //name="Name"
                  type="text"
                  label="Specify"
                />
                </Box>
                <Box>
                  <Typography variant='subtitle1'>18c Have you ever been hospitalized overnight because of an
                    asthmatic attack?</Typography>
                 <Input
                  register={register("Hospitalized")}
                  //name="Name"
                  type="text"
                  label="Specify"
                />
                </Box>
                <Box sx={{width: "100%"}}>
                  <Box>
                    <RadioButton
                    register={register("Herbal")}
                    title="19. Have you ever taken herbal /local medication for your
                    asthma before?"
                    options={[
                      "Yes",
                      "No",
                      "Not Sure",
                    ]}
                  />
                  </Box>

                </Box>
                <Box sx={{width: "100%"}}>
                  <Typography variant='subtitle1'>20. Have you ever taken any of the following medications?</Typography>
                  <RadioButton
                  register={register("Bronchodilator_inhaler")}
                  title="(a) Bronchodilator inhaler"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                <Box>
                  <RadioButton
                  register={register("Steroid_inhaler")}
                  title="(b) Steroid inhaler"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Bronchodilator_nebulised")}
                  title="(c) Bronchodilator nebulised"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                {/* <Collapse in={selectedTightness === "Others"}>
              <Box>
                <Input
                  label="Specify"
                  register={register("specify_Tightness_other")}
                  name="specify_Tightness_other"
                  type="text"
                />
              </Box>
            </Collapse> */}
                </Box>
                <Box>
                  <RadioButton
                  register={register("Oral_steroid")}
                  title="(d) Oral steroid"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Oral_bronchodilators")}
                  title="(e) Oral bronchodilators"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Other_Medication")}
                  title="(f) Others"
                  options={[
                    "Yes",
                    "No",
                    "Others",
                  ]}
                />
                <Collapse in={selectedInhaler === "Others"}>
              <Box>
                <Input
                  label="Specify"
                  register={register("specify_other_medication")}
                  name="specify_other_medication"
                  type="text"
                />
              </Box>
            </Collapse>
                </Box>
                </Box>
            </Box>
            {/* <h3>
              <b></b>
            </h3> */}
            {/* <div className="field">
              <label>
                9. Were you ever bothered, or are you currently bothered by a
                cough?
              </label>
              <div className="field">
                <label className=" is-small">
                  <input
                    type="radio"
                    {...register("input_name")}
                    name="Cough"
                    value="Yes"
                    onChange={e => {
                      handleChangePart(e);
                    }}
                  />
                  <span> Yes</span>
                </label>
                <label className=" is-small ml-2">
                  <input
                    type="radio"
                    {...register("input_name")}
                    name="Cough"
                    value="No"
                    onChange={e => handleChangePart(e)}
                  />
                  <span>No </span>
                </label>
                <label className=" is-small ml-2">
                  <input
                    type="radio"
                    {...register("input_name")}
                    name="Cough"
                    value="Uncertain"
                    onChange={e => handleChangePart(e)}
                  />
                  <span>Uncertain </span>
                </label>
              </div>
            </div>
            <div className="field">
              <label>
                {" "}
                10. Has your cough been triggered by any of the following
                conditions?
              </label>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (a) Exercise</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_exercise"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_exercise"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (b) Breathing cold air</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_coldair"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_coldair"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (c) Breathing house dust
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_dust"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_dust"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (d) Being in a mouldy, musty or damp place
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_mould"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_mould"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (e) Change in weather</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_weather"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_weather"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (f) Being near cats</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_cats"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_cats"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (g) Being near dogs</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_dogs"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_dogs"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (h) Being near any other animal (specify)
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_otheranimal"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_otheranimal"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (i) During sleep at night
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_sleep"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_sleep"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (j) Taking aspirin</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_aspirin"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_aspirin"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (k) Any other thing</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_other"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cough_other"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
                <p className="control ">
                  <input
                    className="input is-small"
                    {...register("input_name")}
                    name="specify_cough_other"
                    type="text"
                    placeholder="Specify"
                  />
                </p>
              </div>
            </div>
            <h4>B. Wheezing</h4>
            <div className="field">
              <label>
                11. Has your chest ever sounded wheezy or whistling?
              </label>
              <div className="field">
                <label className=" is-small">
                  <input
                    type="radio"
                    {...register("input_name")}
                    name="Wheeze"
                    value="Yes"
                    onChange={e => {
                      handleChangePart(e);
                    }}
                  />
                  <span> Yes</span>
                </label>
                <label className=" is-small ml-2">
                  <input
                    type="radio"
                    {...register("input_name")}
                    name="Wheeze"
                    value="No"
                    onChange={e => handleChangePart(e)}
                  />
                  <span>No</span>
                </label>
                <label className=" is-small ml-2">
                  <input
                    type="radio"
                    {...register("input_name")}
                    name="Wheeze"
                    value="Uncertain"
                    onChange={e => handleChangePart(e)}
                  />
                  <span>Uncertain </span>
                </label>
              </div>
            </div>
            <div className="field">
              <label>
                {" "}
                12. Have you ever had wheeze on exposure to any of the
                following?
              </label>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (a) Exercise</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_exercise"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_exercise"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (b) Breathing cold air</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_coldair"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_coldair"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (c) Breathing house dust
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_dust"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_dust"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (d) Being in a mouldy, musty or damp place
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_mould"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_mould"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (e) Change in weather</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_weather"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_weather"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (f) Being near cats</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_cats"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_cats"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (g) Being near dogs</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_dogs"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_dogs"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (h) Being near any other animal (specify)
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_otheranimal"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_otheranimal"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (i) During sleep at night
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_sleep"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_sleep"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (j) Taking aspirin</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_aspirin"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_aspirin"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (k) Any other thing</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_other"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Wheeze_other"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
                <p className="control ">
                  <input
                    className="input is-small"
                    {...register("input_name")}
                    name="specify_wheeze_other"
                    type="text"
                    placeholder="Specify"
                  />
                </p>
              </div>
            </div>
            <h4>C. Shortness of breath</h4>
            <div className="field">
              <label>
                13. Have you ever been bothered by shortness of breath when
                hurrying on flat ground or walking up a slight hill?
              </label>
              <div className="field">
                <label className=" is-small">
                  <input
                    type="radio"
                    {...register("input_name")}
                    name="Shortness"
                    value="Yes"
                    onChange={e => {
                      handleChangePart(e);
                    }}
                  />
                  <span> Yes</span>
                </label>
                <label className=" is-small ml-2">
                  <input
                    type="radio"
                    {...register("input_name")}
                    name="Shortness"
                    value="No"
                    onChange={e => handleChangePart(e)}
                  />
                  <span>No </span>
                </label>
                <label className=" is-small ml-2">
                  <input
                    type="radio"
                    {...register("input_name")}
                    name="Shortness"
                    value="Uncertain"
                    onChange={e => handleChangePart(e)}
                  />
                  <span>Uncertain </span>
                </label>
              </div>
            </div>
            <div className="field">
              <label>
                14. Have you ever had shortness of breath with exposure to any
                of the following circumstances?
              </label>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (a) Exercise</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <span> Yes</span>
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_exercise"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_exercise"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (b) Breathing cold air</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_coldair"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_coldair"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (c) Breathing house dust
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_dust"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_dust"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (d) Being in a mouldy, musty or damp place
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_mould"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_mould"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (e) Change in weather</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_weather"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_weather"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (f) Being near cats</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_cats"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_cats"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (g) Being near dogs</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_dogs"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_dogs"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (h) Being near any other animal (specify)
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_otheranimal"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_otheranimal"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (i) During sleep at night
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_sleep"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_sleep"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (j) Taking aspirin</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_aspirin"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_aspirin"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (k) Any other thing</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_other"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Shortness_other"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
                <p className="control ">
                  <input
                    className="input is-small"
                    {...register("input_name")}
                    name="specify_Shortness_other"
                    type="text"
                    placeholder="Specify"
                  />
                </p>
              </div>
            </div>
            <h4>D. Tightness in Chest</h4>
            <div className="field">
              <label>
                15. Have you ever been bothered by a tightness in your chest
                when hurrying on flat ground or walking up a slight hill?
              </label>
              <div className="field">
                <label className=" is-small">
                  <input
                    type="radio"
                    {...register("input_name")}
                    name="Tightness"
                    value="Yes"
                    onChange={e => {
                      handleChangePart(e);
                    }}
                  />
                  <span> Yes</span>
                </label>
                <label className=" is-small ml-2">
                  <input
                    type="radio"
                    {...register("input_name")}
                    name="Tightness"
                    value="No"
                    onChange={e => handleChangePart(e)}
                  />
                  <span>No </span>
                </label>
                <label className=" is-small ml-2">
                  <input
                    type="radio"
                    {...register("input_name")}
                    name="Tightness"
                    value="Uncertain"
                    onChange={e => handleChangePart(e)}
                  />
                  <span>Uncertain </span>
                </label>
              </div>
            </div>
            <div className="field">
              <label>
                16. Have you ever had tightness in your chest with exposure to
                any of the following circumstances?
              </label>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (a) Exercise</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_exercise"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_exercise"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (b) Breathing cold air</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_coldair"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_coldair"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (c) Breathing house dust
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_dust"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_dust"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (d) Being in a mouldy, musty or damp place
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_mould"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_mould"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (e) Change in weather</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_weather"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_weather"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (f) Being near cats</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_cats"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_cats"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (g) Being near dogs</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_dogs"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_dogs"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (h) Being near any other animal (specify)
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_otheranimal"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_otheranimal"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (i) During sleep at night
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_sleep"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_sleep"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (j) Taking aspirin</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_aspirin"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_aspirin"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (k) Any other thing</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_other"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tightness_other"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
                <p className="control ">
                  <input
                    className="input is-small"
                    {...register("input_name")}
                    name="specify_Tightness_other"
                    type="text"
                    placeholder="Specify"
                  />
                </p>
              </div>
            </div> */}

            {/* <h4>Asthma History</h4>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">
                    {" "}
                    17. Have you ever had asthma?
                  </label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Asthma"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Asthma"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">
                    {" "}
                    17b. When was your asthma diagnosed? (Age in years){" "}
                  </label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="age_diagnosis"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">
                    {" "}
                    17c. Was your asthma confirmed by a doctor?
                  </label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Asthma_Confirmed"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Asthma_Confirmed"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Asthma_Confirmed"
                      value="Not Sure"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>Not Sure </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">
                    {" "}
                    17d. Have you ever needed to visit a doctor at least once a
                    year for your asthma?
                  </label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Visit_Doctor"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Visit_Doctor"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Visit_Doctor"
                      value="Not Sure"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>Not Sure </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">
                    {" "}
                    17e. During the last 12 months, how many times did you need
                    to visit a doctor for your asthma?{" "}
                  </label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="times_visit"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">
                    {" "}
                    18. Have you ever needed to go to the Casualty Clinic
                    (Accident &Emergency Dept), doctor's office, because of an
                    asthma attack?
                  </label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Casualty"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Casualty"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Casualty"
                      value="Not Sure"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>Not Sure </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">
                    {" "}
                    18b If yes to question 18a above, How many times in the last
                    12months?{" "}
                  </label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="times_12months"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">
                    {" "}
                    18c Have you ever been hospitalized overnight because of an
                    asthmatic attack?
                  </label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Hospitalized"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Hospitalized"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Hospitalized"
                      value="Not Sure"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>Not Sure </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">
                    19. Have you ever taken herbal /local medication for your
                    asthma before?
                  </label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Herbal"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Herbal"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Herbal"
                      value="Not Sure"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>Not Sure </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="field">
              <label>
                20. Have you ever taken any of the following medications?
              </label>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (a) Bronchodilator inhaler
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Bronchodilator_inhaler"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Bronchodilator_inhaler"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (b) Steroid inhaler</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Steroid_inhaler"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Steroid_inhaler"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (c) Bronchodilator nebulised
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Bronchodilator_nebulised"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Bronchodilator_nebulised"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (d) Oral steroid</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Oral_steroid"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Oral_steroid"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      {" "}
                      (e) Oral bronchodilators
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Oral_bronchodilators"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Oral_bronchodilators"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> (f) Others</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Other_Medication"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Other_Medication"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
                <p className="control ">
                  <input
                    className="input is-small"
                    {...register("input_name")}
                    name="specify_other_medication"
                    type="text"
                    placeholder="Specify"
                  />
                </p>
              </div>
            </div> */}
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">
                    {" "}
                    21. During the last 12 months, how many times have you
                    needed steroids by mouth or injection, such as prednisone{" "}
                  </label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="age_diagnosis"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">
                    {" "}
                    22 Have you ever smoked cigarette? (Yes means more than 2
                    cigarette in a week for a year)
                  </label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Smoked"
                      value="No"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> No</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Smoked"
                      value="Yes (in the past)"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>Yes (in the past) </span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Smoked"
                      value="Yes (Currently) "
                      onChange={e => handleChangePart(e)}
                    />
                    <span>Yes (Currently) </span>
                  </label>
                </div>
              </div>
            </div>
            <h3>
              <b>23 Other Symptoms</b>
            </h3>
            <div className="field">
              <label>RESPIRATION</label>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> Chest pain</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Chest_pain"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Chest_pain"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> Haemoptysis</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Haemoptysis"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Haemoptysis"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> Sputum production</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Sputum"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Sputum"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label>CARDIOVASCULAR</label>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Dyspnoea on exertion</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Dyspnoea_on_exertion"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Dyspnoea_on_exertion"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Palpitation</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Palpitation"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Palpitation"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Orthopnoea</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Orthopnoea"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Orthopnoea"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">
                      Paroxysmal Nocturnal Dyspnoea
                    </label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Paroxysmal_Nocturnal_Dyspnoea"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Paroxysmal_Nocturnal_Dyspnoea"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Leg swelling</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Leg_swelling"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Leg_swelling"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label>GASTROINTESTINAL</label>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> Nausea</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Nausea"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Nausea"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Vomiting</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Vomiting"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Vomiting"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Abdominal pain</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Abdominal_pain"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Abdominal_pain"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Abdominal swelling</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Abdominal_swelling"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Abdominal_swelling"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Diarrhoea</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Diarrhoea"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Diarrhoea"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Constipation</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Constipation"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Constipation"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label>GENITOURINARY</label>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> Dysuria</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Dysuria"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Dysuria"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Urge incontinence</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Urge_incontinence"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Urge_incontinence"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> Terminal dribbling</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Terminal_dribbling"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Terminal_dribbling"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> Haematuria</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Haematuria"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Haematuria"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label>CENTRAL NERVOUS SYSTEM</label>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Headache</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Headache"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Headache"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Dizziness</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Dizziness"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Dizziness"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Seizures</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Seizures"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Seizures"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Tremors</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tremors"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Tremors"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label>ENDOCRINE</label>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Polyuria</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Polyuria"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Polyuria"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Polydipsia</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Polydipsia"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Polydipsia"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Polyphagia</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Polyphagia"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Polyphagia"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Weight loss</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Weight_loss"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>

                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Weight_loss"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Abnormal Weight gain</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Abnormal_Weight_gain"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Abnormal_Weight_gain"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Heat intolerance</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Heat_intolerance"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Heat_intolerance"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small">Cold intolerance</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cold_intolerance"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Cold_intolerance"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label>ENT</label>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> Ear ache</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Ear_ache"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Ear_ache"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> Ear Discharges</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Ear_Discharges"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Ear_Discharges"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> Snoring</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Snoring"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Snoring"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body ml-3">
                  <div className="field">
                    <label className="is-small"> Dysphagia</label>
                  </div>
                  <div className="field">
                    <label className=" is-small">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Dysphagia"
                        value="Yes"
                        onChange={e => {
                          handleChangePart(e);
                        }}
                      />
                      <span> Yes</span>
                    </label>
                    <label className=" is-small ml-2">
                      <input
                        type="radio"
                        {...register("input_name")}
                        name="Dysphagia"
                        value="No"
                        onChange={e => handleChangePart(e)}
                      />
                      <span>No </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <h3>
              <b>24 Physical Examination</b>
            </h3>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Height(cm)</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="height"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Weight (cm)</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="Weight"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Palour </label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Palour"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Palour"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Jaundice</label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Jaundice"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Jaundice"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Cyanosis</label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name=" Cyanosis"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name=" Cyanosis"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Pulse (beats/min)</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="height"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Blood Pressure (mmHg)</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="Blood_Pressure"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="is-small">
                Other Cardiovascular system findings
              </label>
            </div>
            <div className="field">
              <textarea
                className="textarea wt100 is-small"
                {...register("input_name")}
                name="Cardiovascular_findings"
                type="text"
                placeholder="Specify"
              />
            </div>

            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Respiratory rate</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="respiraatory_rate"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Oxygen Saturation</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="oxygen_saturation"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Wheeze</label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="wheeze_finding"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="wheeze_finding"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Crackles</label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="crackles"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="crackles"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="is-small">Other Respirtory findings</label>
            </div>
            <div className="field">
              <textarea
                className="textarea wt100 is-small"
                {...register("input_name")}
                name="respiratory_findings"
                type="text"
                placeholder="Specify"
              />
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Urticaria</label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="urticaria"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="urticaria"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Rash</label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="rash"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="rash"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Hypopigmentation</label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="hypopigmentation"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="hypopigmentation"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Hyperpigmentation</label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="hyperpigmentation"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="hyperpigmentation"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="is-small">Other skin findings</label>
            </div>
            <div className="field">
              <textarea
                className="textarea wt100 is-small"
                {...register("input_name")}
                name="skin_findings"
                type="text"
                placeholder="Specify"
              />
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Hepatomegaly</label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="hepatomegaly"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="hepatomegaly"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Splenomegaly</label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="splenomegaly"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="splenomegaly"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Ascites</label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="ascites"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="ascites"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="is-small">Other GIT findings</label>
            </div>
            <div className="field">
              <textarea
                className="textarea wt100 is-small"
                {...register("input_name")}
                name="GIT_findings"
                type="text"
                placeholder="Specify"
              />
            </div>
            <div className="field">
              <label className="is-small">
                Other Physical examination findings
              </label>
            </div>
            <div className="field">
              <textarea
                className="textarea wt100 is-small"
                {...register("input_name")}
                name="physical_exam_findings"
                type="text"
                placeholder="Specify"
              />
            </div>
            <h3>
              <b>Investigations</b>
            </h3>
            <h4>CBC</h4>
            <div className="field is-horizontal">
              <div className="field-body ml-6">
                {" "}
                <div className="field ml-2">
                  <h4>ABSOLUTE</h4>
                </div>
              </div>
              <div className="field-body ">
                {" "}
                <div className="field ml-2">
                  <h4>PERCENTAGE</h4>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> PCV</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="PCV_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="PCV_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> WBC</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="WBC_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="WBC_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">NEUTROPHIL</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="NEUTROPHIL_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="NEUTROPHIL_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">LYMPHOCYTE</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="LYMPHOCYTE_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="LYMPHOCYTE_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">EOSINOPHIL</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="EOSINOPHIL_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="EOSINOPHIL_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> BASOPHIL</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="BASOPHIL_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="BASOPHIL_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">MONOCYTE</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="MONOCYTE_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="MONOCYTE_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <h4>SPIROMETRY</h4>
            <div className="field is-horizontal">
              <div className="field-body ml-6">
                {" "}
                <div className="field ml-2">
                  <h4>VALUE</h4>
                </div>
              </div>
              <div className="field-body ">
                {" "}
                <div className="field ml-2">
                  <h4>PERCENTAGE PREDICTED</h4>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">FEV1</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FEV1_value"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FEV1_value"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">FVC</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FVC_value"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FVC_percentage_predicted"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">FEV1%</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FEV1_percent_value"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FEV1_precent_percentage_predicted"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">FEF25-75</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FEF25-75_value"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FEF25-75_percentage_predicted"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">PEFR</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="PEFR_value"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="PEFR_percentage_predicted"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <h4>ALLERGY SKIN TESTING</h4>
            <input
              className="input is-small is-hidden"
              {...register("input_name")}
              name="Allergy_Skin_Test"
              type="text"
              placeholder="Specify"
            />
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> ALLERGINE</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      value={allergine}
                      /* {...register("input_name")} */ onChange={e => {
                        setAllergine(e.target.value);
                      }}
                      name="allergine"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">REACTION</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      value={reaction}
                      /* {...register("input_name")} */ onChange={e => {
                        setReaction(e.target.value);
                      }}
                      name="reaction"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <div
                    className="button is-success is-small selectadd"
                    onClick={handleAdd}
                  >
                    Add
                  </div>
                </div>
              </div>
            </div>
            <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
              <thead>
                <tr>
                  <th>
                    <abbr title="Serial No">S/No</abbr>
                  </th>

                  <th>
                    <abbr title="Type"> ALLERGINE</abbr>
                  </th>
                  <th>
                    <abbr title="Destination">REACTION</abbr>
                  </th>
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {allergies.map((ProductEntry, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{ProductEntry.allergine}</td>
                    <td>{ProductEntry.reaction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">SERUM IGE LEVEL</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="IGE_Level"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">
                    FRACTION EXHALED NITRIC OXIDE (FeNO)
                  </label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FeNo"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>

            {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Education" type="text" placeholder="Hihest Level of Education" />           
                        </p> */}

            <div className="field">
              <label className=" is-small">
                <input
                  type="radio"
                  checked={docStatus === "Draft"}
                  name="status"
                  value="Draft"
                  onChange={e => {
                    handleChangeStatus(e);
                  }}
                />
                <span> Draft</span>
              </label>{" "}
              <br />
              <label className=" is-small">
                <input
                  type="radio"
                  checked={docStatus === "Final"}
                  name="status"
                  value="Final"
                  onChange={e => handleChangeStatus(e)}
                />
                <span> Final </span>
              </label>
            </div>

            <div className="field  is-grouped mt-2">
              <p className="control">
                <button type="submit" className="button is-success is-small">
                  Save
                </button>
              </p>
              <p className="control">
                <button className="button is-warning is-small" type="reset">
                  Cancel
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
