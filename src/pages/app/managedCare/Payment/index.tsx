import React from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import PaymentDetails from './PaymentDetail';
import Payments from './PaymentList';
const AppPayments = () => {
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

  const { list: bills } = useRepository<any>(Models.PAYMENT, navigate);

  return (
    <>
      {show === Views.LIST && <Payments onRowClicked={(row) => navigate(Views.DETAIL)(row)} items={bills} />}

      {show === Views.DETAIL && <PaymentDetails row={selectedPayment} backClick={navigate(Views.LIST)} />}
    </>
  );
};

export default AppPayments;
