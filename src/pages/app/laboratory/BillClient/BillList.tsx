import React from 'react';

// import { TableColumn } from 'react-data-table-component';
import Button from '../../../../components/buttons/Button';
import CollapsableGrid from '../../../../components/datagrids/CollapsableGrid';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { BillServiceCreateSchema } from '../../schema';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  handleSearch?: (_event) => void;
  onRowClicked?: (
    row: {
      id: any;
      date: any;
      status: string;
      description: string;
      amount: string;
    },
    event: any
  ) => void;
  items: any;
}

const BillClient: React.FC<Props> = ({ handleCreate, onRowClicked, items, handleSearch }) => {
  return (
    <PageWrapper>
      <h2>Bill Client </h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <FilterMenu onSearch={handleSearch} />
        </div>

        <Button onClick={handleCreate}>
          <i className="bi bi-plus-circle"></i> Add new
        </Button>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {items.map((data, index) => (
          <CollapsableGrid
            key={index}
            columnHead={BillServiceCreateSchema}
            description={data.description}
            title={data.title}
            rowData={data.data}
            onRowClicked={onRowClicked}
          />
        ))}
      </div>
    </PageWrapper>
  );
};

export default BillClient;
