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
 

const getSearchFacility1 =  (person) => {
  if (!person) {
   
    setPatient('');
    setSource('');
    return;
  }
  setPatient(person);
  setSource(person.firstname + ' ' + person.lastname);
};

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
   
    if (success1) {
      setSuccess1(false);
    }
  }, [success1]);
  useEffect(() => {
    getSearchFacility1(resource.billServicesResource.selectedBillService);

    return () => {};
  }, [resource.billServicesResource.selectedBillService]);
  
  useEffect(() => {
   
    if (!BillServ) {
      BillServ = client.service('bills');
      BillServ.on('created', (obj) => getFacilities());
      BillServ.on('updated', (obj) => getFacilities());
      BillServ.on('patched', (obj) => getFacilities());
      BillServ.on('removed', (obj) => getFacilities());
    }
    user && getFacilities();
    return () => {
      BillServ = null;
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
          success={success1}
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
