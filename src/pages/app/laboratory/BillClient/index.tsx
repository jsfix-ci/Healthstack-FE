import React from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import BillCreate from './BillCreate';
import BillDetails from './BillDetail';
import BillClient from './BillList';
import BillModify from './BillModify';

const AppBillClientLab = () => {
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
        <BillClient
          handleCreate={navigate(Views.CREATE)}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          handleSearch={getOrders}
          items={order}
        />
      )}
      {show === Views.CREATE && <BillCreate backClick={navigate(Views.LIST)} /*onSubmit={handleSubmit}*/ />}
      {show === Views.DETAIL && (
        <BillDetails
          row={selectedBillClient}
          backClick={navigate(Views.LIST)}
          editBtnClicked={() => navigate(Views.EDIT)(selectedBillClient)}
          // handleDelete={() => handleDelete(selectedBillClient)}
        />
      )}
      {show === Views.EDIT && (
        <BillModify
          row={selectedBillClient}
          backClick={navigate(Views.LIST)}
          cancelEditClicked={navigate(Views.DETAIL)}
          // onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AppBillClientLab;
