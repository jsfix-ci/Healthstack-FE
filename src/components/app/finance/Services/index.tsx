import React, { useContext, useEffect, useState } from 'react';
import { useObjectState, UserContext } from '../../../../context/context';
import { toast } from 'react-toastify';
import ServiceCreate from './ServiceCreate';
import ServiceDetails from './ServiceDetail';
import Servicess from './ServiceList';
import ServiceModify from './ServiceModify';
import client from '../../../../feathers';

const AppServices = () => {
  const { resource, setResource } = useObjectState();
  let ServicesServ = client.service('billing');
  const { user } = useContext(UserContext);
  const [facilities, setFacilities] = useState([]);

  const getFacilities = () => {
    if (user.currentEmployee) {
      ServicesServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,

          $sort: {
            category: 1,
          },
        },
      }).then((res) => {
        const findServices = res;
        console.log(findServices);
        setFacilities(findServices.groupedOrder);
      });
    } else {
      if (user.stacker) {
        toast({
          message: 'You do not qualify to view this',
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
        return;
      }
    }
  };
  return (
    <>
      {resource.servicesResource.show === 'lists' && (
        <Servicess
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                show: 'details',
                selectedService: row,
              },
            }));
          }}
        />
      )}
      {resource.servicesResource.show === 'create' && (
        <ServiceCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {resource.servicesResource.show === 'details' && (
        <ServiceDetails
          row={resource.servicesResource.selectedService}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {resource.servicesResource.show === 'edit' && (
        <ServiceModify
          row={resource.servicesResource.selectedService}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'details',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppServices;
