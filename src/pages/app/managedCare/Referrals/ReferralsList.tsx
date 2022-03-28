import React from 'react';
import DataTable from 'react-data-table-component';

import Input from '../../../../components/inputs/basic/Input';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { RevenueSchema } from '../../schema';
import { PageWrapper } from '../../styles';
import { columnHead, rowData } from './data';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (row: any, event: any) => void;
  handleSearch: (_event) => void;
}

const Referrals: React.FC<Props> = ({ onRowClicked, items, handleSearch }) => {
  return (
    <PageWrapper>
      <h2>Referrals</h2>

      <TableMenu>
        <div className="inner-table">
          <Input placeholder="Search here" label="Search here" />
          <FilterMenu onSearch={handleSearch} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Filer by</span>
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title="Referrals"
          columns={RevenueSchema}
          data={rowData}
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

export default Referrals;
