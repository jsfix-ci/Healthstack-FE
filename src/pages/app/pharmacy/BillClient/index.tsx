import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import BillCreate from './BillCreate';
import BillDetails from './BillDetail';
import Bill from './BillList';
import BillModify from './BillModify';
import { BillClientQuery } from './query';

const AppBillClient = () => {
  const { resource, setResource } = useObjectState();

  const {
    billClientResource: { show, selectedBillClient },
  } = resource;

  const handleNavigation = (show: string) => (selectedBillClient?: any) =>
    setResource({
      ...resource,
      billClientResource: {
        ...resource.billClientResource,
        show,
        selectedBillClient: selectedBillClient || resource.billClientResource.selectedBillClient,
      },
    });

  const {
    groupedData: billclient,
    submit: handleSubmit,
    remove: handleDelete,
    setFindQuery,
  } = useRepository(Models.BILLS, handleNavigation);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setFindQuery(BillClientQuery(undefined, searchText || undefined));
  }, [searchText]);

  return (
    <>
      {show === Views.LIST && (
        <Bill
          handleCreate={handleNavigation(Views.CREATE)}
          onRowClicked={(row) => handleNavigation(Views.DETAIL)(row)}
          onSearch={setSearchText}
          items={billclient}
        />
      )}
      {show === Views.CREATE && <BillCreate backClick={handleNavigation(Views.LIST)} onSubmit={handleSubmit} />}
      {show === Views.DETAIL && (
        <BillDetails
          row={selectedBillClient}
          backClick={handleNavigation(Views.LIST)}
          editBtnClicked={() => handleNavigation(Views.EDIT)(selectedBillClient)}
          deleteBtnClicked={handleDelete}
        />
      )}
      {show === Views.EDIT && (
        <BillModify
          row={selectedBillClient}
          backClick={handleNavigation(Views.LIST)}
          cancelEditClicked={handleNavigation(Views.DETAIL)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AppBillClient;
