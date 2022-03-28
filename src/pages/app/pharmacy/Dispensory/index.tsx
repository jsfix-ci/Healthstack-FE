import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DispensaryDetails from './DispensaryDetail';
import Dispensary from './DispensaryList';
import { DispenseQuery } from './query';

const AppDispensary = () => {
  const { resource, setResource } = useObjectState();
  const {
    dispensaryResource: { show, selectedDispensary },
  } = resource;

  const navigate = (show: string) => (selectedDispensary?: any) =>
    setResource({
      ...resource,
      dispensaryResource: {
        ...resource.appointmentResource,
        show,
        selectedDispensary: selectedDispensary || resource.dispensaryResource.selectedDispensary,
      },
    });

  const { groupedData: dispensary, submit: handleSubmit, setFindQuery } = useRepository(Models.BILLS, navigate);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFindQuery(DispenseQuery(undefined, searchText || undefined));
  }, [searchText]);
  return (
    <>
      {show === Views.LIST && (
        <Dispensary onRowClicked={(row) => navigate(Views.DETAIL)(row)} onSearch={setSearchText} items={dispensary} />
      )}

      {show === Views.DETAIL && (
        <DispensaryDetails onSubmit={handleSubmit} row={selectedDispensary} backClick={navigate(Views.LIST)} />
      )}
    </>
  );
};

export default AppDispensary;
