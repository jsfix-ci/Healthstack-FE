import React from 'react';

import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PaymentSchema } from '../../schema';
import { PageWrapper } from '../../styles';

const ClaimPayments = ({ onRowClicked, items }) => {
  return (
    <PageWrapper>
      <h2>ClaimPayments</h2>

      <TableMenu>
        <div className="inner-table">
          <Input placeholder="Search here" label="Search here" size="small" />
          <FilterMenu />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <CustomTable
          title="Claim Payments"
          columns={PaymentSchema}
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

export default ClaimPayments;
