import React from 'react';

import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { CollectionSchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

// interface Props {
//   handleCreate?: () => void;
//   handleSearch?: (_event) => void;
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
//   items?: [];
// }

const Claims = ({ handleSearch, onRowClicked, items }) => {
  return (
    <PageWrapper>
      <h2>Claims</h2>

      <TableMenu>
        <div className="inner-table">
          <Input placeholder="Search here" label="Search here" size="small" />
          <FilterMenu onSearch={handleSearch} />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <CustomTable
          title="Claims"
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

export default Claims;
