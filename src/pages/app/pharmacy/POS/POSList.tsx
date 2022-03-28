import React from 'react';
import DataTable from 'react-data-table-component';

import Button from '../../../../components/buttons/Button';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { ProductEntrySchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

const ProductEntryList = ({ handleCreate, onRowClicked, items, onSearch }) => {
  return (
    <PageWrapper>
      <h2>POS</h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <FilterMenu schema={ProductEntrySchema} onSearch={onSearch} />
        </div>

        <Button onClick={handleCreate}>
          <i className="bi bi-plus-circle"></i> Add new
        </Button>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title="POS"
          columns={ProductEntrySchema}
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

export default ProductEntryList;
