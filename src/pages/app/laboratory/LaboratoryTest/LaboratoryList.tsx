import React from 'react';

import CustomTable from '../../../../components/customtable';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { LocationSchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  handleSearch?: (_event) => void;
  onRowClicked?: (row: any, event: any) => void;
  items: any;
}

const Laboratory: React.FC<Props> = ({ onRowClicked, handleSearch, items }) => {
  return (
    <PageWrapper>
      <h2>Laboratory</h2>
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
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <CustomTable
          title="Laboratory"
          columns={LocationSchema}
          data={items}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={onRowClicked}
        />
      </div>
    </PageWrapper>
  );
};

export default Laboratory;
