import React from 'react';

import useRepository from '../../../../components/hooks';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import LaboratoryDetails from './LaboratoryDetail';
import Laboratory from './LaboratoryList';

const AppLaboratory = () => {
  const { resource, setResource } = useObjectState();
  const {
    locationResource: { show, selectedLocation },
  } = resource;

  const navigate = (show: string) => (selectedLocation?: any) =>
    setResource({
      ...resource,
      locationResource: {
        ...resource.locationResource,
        show,
        selectedLocation: selectedLocation || resource.locationResource.selectedLocation,
      },
    });

  const { list: location, find: getLocation } = useRepository<any>(Models.LOCATION, navigate);

  return (
    <>
      {show === Views.LIST && (
        <Laboratory
          handleCreate={navigate(Views.CREATE)}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          handleSearch={getLocation}
          items={location}
        />
      )}

      {show === Views.DETAIL && (
        <LaboratoryDetails
          row={selectedLocation}
          backClick={navigate(Views.LIST)}
          editBtnClicked={() => navigate(Views.EDIT)(selectedLocation)}
        />
      )}
    </>
  );
};

export default AppLaboratory;
