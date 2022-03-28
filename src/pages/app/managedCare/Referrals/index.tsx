import React from 'react';

import useRepository from '../../../../components/hooks';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import ReferralsDetails from './ReferralsDetail';
import Referrals from './ReferralsList';
const AppReferrals = () => {
  const { resource, setResource } = useObjectState();
  const {
    revenuesResource: { show, selectedRevenue },
  } = resource;

  const navigate = (show: string) => (selectedRevenue?: any) =>
    setResource({
      ...resource,
      revenuesResource: {
        ...resource.revenuesResource,
        show,
        selectedRevenue: selectedRevenue || resource.revenuesResource.selectedRevenue,
      },
    });

  const {
    list: bands,
    find: getBands,
    remove: handleDelete,
    submit: handleSubmit,
  } = useRepository<any>(Models.BAND, navigate);

  return (
    <>
      {resource.revenuesResource.show === 'lists' && (
        <Referrals
        onRowClicked={(row) => navigate(Views.DETAIL)(row)}
        handleSearch={getCollections}
        items={subwallettransactions}
        handleCreate={navigate(Views.CREATE)}
        />
      )}

      {resource.revenuesResource.show === 'details' && (
        <ReferralsDetails
          row={resource.revenuesResource.selectedRevenue}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              revenuesResource: {
                ...prevState.revenuesResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              revenuesResource: {
                ...prevState.revenuesResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppReferrals;
