import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import ProductEntryCreate from './ProductEntryCreate';
import ProductEntryDetails from './ProductEntryDetail';
import ProductEntryList from './ProductEntryList';
import { ProductEntryQuery } from './query';

const AppProductEntry = () => {
  const { resource, setResource } = useObjectState();
  const {
    employeeResource: { show, selectedEmployee },
  } = resource;

  const navigate = (show: string) => (selectedEmployee?: any) =>
    setResource({
      ...resource,
      employeeResource: {
        ...resource.employeeResource,
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
      {show === Views.CREATE && <ProductEntryCreate backClick={navigate(Views.LIST)} onSubmit={handleSubmit} />}
      {show === Views.DETAIL && <ProductEntryDetails row={selectedEmployee} backClick={navigate(Views.LIST)} />}=
    </>
  );
};

export default AppProductEntry;
