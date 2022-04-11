import React from 'react';

import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { CollectionSchema } from '../../schema';
import { PageWrapper } from '../../styles';
// import { columnHead, rowData } from './data';

// interface Props {
//   handleSearch: (_event) => void;
//   onRowClicked?: (
//     row: {
//       id: any;
//       name: string;
//       client: string;
//       amount: string;
//       mode: string;
//     },
//     event: any
//   ) => void;
//   items: any[];
// }

const PreAuthorizations = ({ handleSearch, onRowClicked, items }) => {
  return (
    <PageWrapper>
      <h2>PreAuthorizations</h2>

      <TableMenu>
        <div className="inner-table">
          <Input placeholder="Search here" label="Search here" size="small" />
          <FilterMenu onSearch={handleSearch} />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <CustomTable
          title="PreAuthorizations"
          columns={CollectionSchema}
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

export default PreAuthorizations;
