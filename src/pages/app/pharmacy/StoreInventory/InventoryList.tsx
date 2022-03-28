import React from 'react';
import DataTable from 'react-data-table-component';

import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { InventoryStoreSchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

const Inventory = ({ onRowClicked, items, onSearch }) => {
  return (
    <PageWrapper>
      <h2>Inventory</h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <FilterMenu schema={InventoryStoreSchema} onSearch={onSearch} />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title="Inventory"
          columns={InventoryStoreSchema}
          data={items}
          selectableRows
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={onRowClicked}
          style={{ overflow: 'hidden' }}
        />
      </div>
    </PageWrapper>
  );
};

export default Inventory;
