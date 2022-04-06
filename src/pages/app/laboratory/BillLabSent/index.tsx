import React from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import BillLabSentDetails from './BillLabSentDetail';
import BillLabSent from './BillLabSentList';

const AppBillLabSent = () => {
  const { resource, setResource } = useObjectState();
  const {
    billClientResource: { show, selectedBillClient },
  } = resource;

  const navigate = (show: string) => (selectedBillClient?: any) =>
    setResource({
      ...resource,
      billClientResource: {
        ...resource.billClientResource,
        show,
        selectedBillClient: selectedBillClient || resource.billClientResource.selectedBillClient,
      },
    });

  const {
    list: order,
    find: getOrders,
    // remove: handleDelete,
    // submit: handleSubmit,
  } = useRepository<any>(Models.ORDER, navigate);

  return (
    <>
      {show === Views.LIST && (
        <BillLabSent
          handleCreate={navigate(Views.CREATE)}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          handleSearch={getOrders}
          items={order}
        />
      )}

      {show === Views.DETAIL && (
        <BillLabSentDetails
          row={selectedBillClient}
          backClick={navigate(Views.LIST)}
          editBtnClicked={() => navigate(Views.EDIT)(selectedBillClient)}
        />
      )}
    </>
  );
};

export default AppBillLabSent;
