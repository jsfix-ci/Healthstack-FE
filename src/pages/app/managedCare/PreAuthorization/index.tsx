import React from 'react';

import useRepository from '../../../../components/hooks';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import PreAuthorzationDetails from './PreAuthorizationDetail';
import PreAuthorizations from './PreAuthorizationList';

const AppPreAuthorization = () => {
  const { resource, setResource } = useObjectState();

  const {
    collectionsResource: { show, selectedCollection },
  } = resource;

  const navigate = (show: string) => (selectedCollection?: any) =>
    setResource({
      ...resource,
      collectionsResource: {
        ...resource.collectionsResource,
        show,
        selectedCollection: selectedCollection || resource.collectionsResource.selectedCollection,
      },
    });

  const { list: subwallettransactions, find: getCollections } = useRepository<any>(Models.COLLECTION, navigate);

  return (
    <>
      {show === Views.LIST && (
        <PreAuthorizations
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          handleSearch={getCollections}
          items={subwallettransactions}
        />
      )}

      {show === Views.DETAIL && (
        <PreAuthorzationDetails
          row={selectedCollection}
          backClick={navigate(Views.LIST)}
          editBtnClicked={() => navigate(Views.EDIT)(selectedCollection)}
        />
      )}
    </>
  );
};

export default AppPreAuthorization;
