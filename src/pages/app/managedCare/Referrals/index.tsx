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

  const { list: subwallettransactions, find: getRevenue } = useRepository<any>(Models.COLLECTION, navigate);

  return (
    <>
      {show === Views.LIST && (
        <Referrals
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          handleSearch={getRevenue}
          items={subwallettransactions}
          handleCreate={navigate(Views.CREATE)}
        />
      )}

      {show === Views.DETAIL && <ReferralsDetails row={selectedRevenue} backClick={navigate(Views.LIST)} />}
    </>
  );
};

export default AppReferrals;
