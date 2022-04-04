import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import InventoryDetails from './InventoryDetail';
import Inventory from './InventoryList';
import { StoreInventoryQuery } from './query';

const AppInventory = () => {
  const { resource, setResource } = useObjectState();
  const {
    employeeResource: { show, selectedEmployee },
  } = resource;

  const navigate = (show: string) => (selectedEmployee?: any) =>
    setResource({
      ...resource,
      employeeResource: {
        ...resource.appointmentResource,
        show,
        selectedEmployee: selectedEmployee || resource.employeeResource.selectedEmployee,
      },
    });

  const { list: inventory, submit: handleSubmit, setFindQuery } = useRepository(Models.INVENTORY, navigate);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setFindQuery(StoreInventoryQuery(undefined, undefined, searchText || undefined));
  }, [searchText]);
  return (
    <>
      {show === Views.LIST && (
        <Inventory onRowClicked={(row) => navigate(Views.DETAIL)(row)} onSearch={setSearchText} items={inventory} />
      )}

      {show === Views.DETAIL && (
        <InventoryDetails onSubmit={handleSubmit} row={selectedEmployee} backClick={navigate(Views.LIST)} />
      )}
    </>
  );
};

export default AppInventory;
