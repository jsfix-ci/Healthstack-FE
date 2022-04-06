import React from 'react';

import useRepository from '../../../../components/hooks';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import PaymentDetails from './PaymentDetail';
import Payments from './PaymentList';
const AppPaymentsLab = () => {
  const { resource, setResource } = useObjectState();
  const {
    paymentsResource: { show, selectedPayment },
  } = resource;

  const navigate = (show: string) => (selectedPayment?: any) =>
    setResource({
      ...resource,
      paymentsResource: {
        ...resource.paymentsResource,
        show,
        selectedPayment: selectedPayment || resource.paymentsResource.selectedPayment,
      },
    });

  const {
    list: bills,
    find: getBills,
    // remove: handleDelete,
    // submit: handleSubmit,
  } = useRepository<any>(Models.PAYMENT, navigate);

  return (
    <>
      {show === Views.LIST && (
        <Payments
          handleCreate={navigate(Views.CREATE)}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          handleSearch={getBills}
          items={bills}
        />
      )}

      {show === Views.DETAIL && (
        <PaymentDetails
          row={selectedPayment}
          backClick={navigate(Views.LIST)}
          editBtnClicked={() => navigate(Views.EDIT)(selectedPayment)}
        />
      )}
    </>
  );
};

export default AppPaymentsLab;
