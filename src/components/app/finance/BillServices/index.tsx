import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useObjectState, UserContext } from '../../../../context/context';
import client from '../../../../feathers';
import BillCreate from './BillCreate';
import BillDetails from './BillDetail';
import Bills from './BillList';
import BillModify from './BillModify';

const AppBills = () => {
  let BillCreateServ = client.service('createbilldirect');
  let ClientServ = client.service('client');
  let BillServ = client.service('bills');
  const { resource, setResource } = useObjectState();
  const { user } = useContext(UserContext);
  const [facilities, setFacilities] = useState([]);
  const [patient, setPatient] = useState('');
  const [source, setSource] = useState('');
  const [success1, setSuccess1] = useState(false);
  const [paymentmode, setPaymentMode] = useState("")
  const [paymentOptions, setPaymentOptions]=useState([])
  const [productItem, setProductItem] = useState([]);
 const [totalamount, setTotalamount] = useState(0);
 
  const [billMode, setBillMode]=useState("")
  const [date,setDate] = useState("")
  const [calcamount,setCalcAmount] = useState(0)
  const [documentNo,setDocumentNo] = useState("")
  var random = require('random-string-generator');
  const invoiceNo= random(6,'uppernumeric')
 

const getSearchFacility1 =  (person) => {
  if (!person) {
   
    setPatient('');
    setSource('');
    return;
  }
  setPatient(person);
  setSource(person.firstname + ' ' + person.lastname);
};

const handleChangeMode= async(value)=>{
  // console.log("value",value)
   await setPaymentMode(value)
    console.log(value)
   let billm= paymentOptions.filter(el=>el.name===value)
   await setBillMode(billm[0])
    console.log(billm)
    // at startup
    // check payment mode options from patient financial info
    // load that to select options
    // default to HMO-->company-->family-->cash
    //when chosen
    //append payment mode to order
    //check service contract for pricing info
    // calculate pricing 
    // pricing


}
 const createObj = (pay, name, cover, type) => {
   let details:any = {};
   details = { ...pay };
   details.type = type;

   return {
     name,
     value: cover,
     detail: details,
     type,
   };
 };
//  useEffect(() => {
//    setProductItem([]);
//    setTotalamount(0);
//    const paymentoptions = [];
//    // const info = client.paymentinfo
//    let billme;
//    let obj;
//    if (!!patient) {
//      // console.log(patient)

//      patient.paymentinfo.forEach((pay, i) => {
//        if (pay.active) {
//          switch (pay.paymentmode) {
//            case 'Cash':
//              // code block
//              obj = createObj(pay, 'Cash', 'Cash', 'Cash');

//              paymentoptions.push(obj);
//              setPaymentMode('Cash');
//              billme = obj;
//              // console.log("billme",billme)
//              break;
//            case 'Family':
//              // code block
//              obj = createObj(
//                pay,
//                'Family Cover',
//                'familyCover',
//                'Family Cover'
//              );
//              paymentoptions.push(obj);
//              setPaymentMode('Family Cover');
//              billme = obj;
//              // console.log("billme",billme)
//              break;
//            case 'Company':
//              // code block
//              let name =
//                'Company: ' + pay.organizationName + '(' + pay.plan + ')';

//              obj = createObj(pay, name, 'CompanyCover', 'Company Cover');
//              paymentoptions.push(obj);
//              setPaymentMode(
//                'Company: ' + pay.organizationName + '(' + pay.plan + ')'
//              );
//              billme = obj;
//              // console.log("billme",billme)
//              break;
//            case 'HMO':
//              // code block
//              console.log(pay);
//              let sname = 'HMO: ' + pay.organizationName + '(' + pay.plan + ')';

//              obj = createObj(pay, sname, 'HMOCover', 'HMO Cover');
//              paymentoptions.push(obj);
//              setPaymentMode(
//                'HMO: ' + pay.organizationName + '(' + pay.plan + ')'
//              );
//              billme = obj;
//              //  console.log("billme",billme)
//              break;
//            default:
//            // code block
//          }
//        }
//      });

//      setPaymentOptions(paymentoptions);
//      setBillMode(billme);
//    }
//    //console.log(paymentoptions)
//    // console.log(billMode)
//    return () => {};
//  }, [source]); 

 const getFacilities = () => {
   
   BillServ.find({
     query: {
       $or: [
         {
           'participantInfo.paymentmode.type': 'Cash',
         },
         {
           'participantInfo.paymentmode.type': 'Family Cover',
         },
       ],

       'participantInfo.billingFacility': user.employeeData[0].facility,
       billing_status: 'Unpaid',
       $limit: 100,
       $sort: {
         createdAt: -1,
       },
     },
   })
   .then((res)=>{
     let findProductEntry = res
      console.log( findProductEntry.groupedOrder);
      setFacilities(findProductEntry.groupedOrder);
   })
  
  ;
  
 };   

  const handleSearch = (val) => {
    const field = 'name';
    BillServ.find({
      query: {
        'participantInfo.paymentmode.detail.principalName': {
          $regex: val,
          $options: 'i',
        },

        $or: [
          {
            'participantInfo.paymentmode.type': 'Cash',
          },
          {
            'participantInfo.paymentmode.type': 'Family Cover',
          },
        ],

        'participantInfo.billingFacility':
          user.currentEmployee.facilityDetail._id,
        billing_status: 'Unpaid',
        $limit: 30,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        setFacilities(res.groupedOrder);
        toast(' ProductEntry  fetched successfully');
      })
      .catch((err) => {
        toast(
          'Error fetching ProductEntry, probable network issues ' + err
        );
      });
  };


  
 useEffect(() => {
   let isMounted = true
   let today = new Date().toLocaleString()
   if(isMounted)setDate(today)
   if(isMounted)setDocumentNo(invoiceNo)
   return () =>{
    isMounted = false
 
   }
    
  }, []);
  
  useEffect(() => {
    getSearchFacility1(resource.billServicesResource.selectedBillService);
    
    console.log(resource.billServicesResource.selectedBillService);
    
    return () => {};
  }, [resource.billServicesResource.selectedBillService]);
  
  useEffect(() => {
    let isMounted = true
    if (!BillServ) {
      BillServ = client.service('bills');
      BillServ.on('created', (obj) => getFacilities());
      BillServ.on('updated', (obj) => getFacilities());
      BillServ.on('patched', (obj) => getFacilities());
      BillServ.on('removed', (obj) => getFacilities());
    }
    if(isMounted){user && getFacilities()};
    return () => {
      BillServ = null;
      isMounted = false
    };
  }, [user]);

  return (
    <>
      {resource.billServicesResource.show === 'lists' && (
        <Bills
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              billServicesResource: {
                show: 'details',
                selectedBillService: row,
              },
            }));
          }}
          dataTree={facilities}
          handleSearch={handleSearch}
        />
      )}
      {resource.billServicesResource.show === 'create' && (
        <BillCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'lists',
              },
            }))
          }
          getSearchFacility={getSearchFacility1}
          date={date}
          success={success1}
          invoice={documentNo}
        />
      )}
      {resource.billServicesResource.show === 'details' && (
        <BillDetails
          row={resource.billServicesResource.selectedBillService}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {resource.billServicesResource.show === 'edit' && (
        <BillModify
          row={resource.billServicesResource.selectedBillService}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'details',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppBills;
