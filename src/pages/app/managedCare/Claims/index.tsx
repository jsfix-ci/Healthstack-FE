import React from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import ClaimsDetails from './ClaimsDetail';
import Claims from './ClaimsList';

const AppClaims = () => {
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
        <Claims
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          handleSearch={getCollections}
          items={subwallettransactions}
        />
      )}

      {show === Views.DETAIL && <ClaimsDetails row={selectedCollection} backClick={navigate(Views.LIST)} />}
    </>
  );
};

export default AppClaims;
