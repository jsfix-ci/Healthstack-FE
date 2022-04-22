import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import { serviceQuery } from './query';
import ServiceCreate from './ServiceCreate';
import ServiceDetails from './ServiceDetail';
import Services from './ServiceList';

const AppServices = () => {
  const { resource, setResource } = useObjectState();
  const {
    servicesResource: { show, selectedService },
  } = resource;

  const handleNavigation = (show: string) => (selectedService?: any) =>
    setResource({
      ...resource,
      servicesResource: {
        ...resource.servicesResource,
        show,
        selectedService:
          selectedService || resource.servicesResource.selectedService,
      },
    });
  const {
    groupedList: service,
    submit: handleSubmit,
    setFindQuery,
  } = useRepository(Models.BILLING, handleNavigation);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setFindQuery(serviceQuery(undefined, searchText || undefined));
  }, [searchText]);
  return (
    <>
      {show === Views.LIST && (
        <Services
          handleCreate={handleNavigation(Views.CREATE)}
          onRowClicked={(row) => handleNavigation(Views.DETAIL)(row)}
          onSearch={setSearchText}
          progressPending={false}
          items={service}
        />
      )}
      {show === Views.CREATE && (
        <ServiceCreate
          backClick={handleNavigation(Views.LIST)}
          onSubmit={handleSubmit}
        />
      )}
      {show === Views.DETAIL && (
        <ServiceDetails
          row={selectedService}
          backClick={handleNavigation(Views.LIST)}
          editBtnClicked={() => handleNavigation(Views.EDIT)(selectedService)}
        />
      )}
    </>
  );
};

export default AppServices;
