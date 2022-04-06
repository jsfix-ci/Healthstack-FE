import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import ClaimPaymentDetails from './ClaimPaymentDetail';
import ClaimPayments from './ClaimPaymentList';

const AppClaimPayments = () => {
  const { resource, setResource } = useObjectState();
  const {
    hmoAuthorizationsResource: { show, selectedHMOAuthorization },
  } = resource;

  const navigate = (show: string) => (selectedHMOAuthorization?: any) =>
    setResource({
      ...resource,
      hmoAuthorizationsResource: {
        ...resource.hmoAuthorizationsResource,
        show,
        selectedHMOAuthorization:
          selectedHMOAuthorization || resource.hmoAuthorizationsResource.selectedHMOAuthorization,
      },
    });

  const { list: bills } = useRepository<any>(Models.PAYMENT, navigate);

  return (
    <>
      {show === Views.LIST && <ClaimPayments onRowClicked={(row) => navigate(Views.DETAIL)(row)} items={bills} />}

      {show === Views.DETAIL && <ClaimPaymentDetails row={selectedHMOAuthorization} backClick={navigate(Views.LIST)} />}
    </>
  );
};

export default AppClaimPayments;
