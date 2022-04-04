import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import { ProductEntryQuery } from '../../pharmacy/ProductEntry/query';
import POSCreate from './POSCreate';
import ProductEntryDetails from './POSDetail';
import ProductEntryList from './POSList';
import POSModify from './POSModify';

const AppPOS = () => {
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

  const { list: productentry, submit: handleSubmit, setFindQuery } = useRepository(Models.PRODUCTENTRY, navigate);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setFindQuery(ProductEntryQuery(undefined, undefined, searchText || undefined));
  }, [searchText]);
  return (
    <>
      {show === Views.LIST && (
        <ProductEntryList
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          onSearch={setSearchText}
          items={productentry}
          handleCreate={navigate(Views.CREATE)}
        />
      )}
      {show === Views.CREATE && <POSCreate backClick={navigate(Views.LIST)} onSubmit={handleSubmit} />}
      {show === Views.DETAIL && <ProductEntryDetails row={selectedEmployee} backClick={navigate(Views.LIST)} />}
      {show === Views.EDIT && (
        <POSModify row={selectedEmployee} backClick={navigate(Views.LIST)} cancelEditClicked={navigate(Views.DETAIL)} />
      )}
    </>
  );
};

export default AppPOS;
