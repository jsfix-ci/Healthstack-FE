import React from 'react';

import AccordionBox from '../../../../components/accordion';
import CustomTable from '../../../../components/customtable';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PaymentLineSchema } from '../../schema/payment';
import { PageWrapper } from '../../styles';

const Payments = ({ onMakePayment, onSearch, items }) => {
  return (
    <PageWrapper>
      <h2>Payments</h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <FilterMenu onSearch={onSearch} />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {items.map((data) => (
          <AccordionBox title={data.clientname} key={data.client_id}>
            {data.bills.map((child) => {
              return (
                <AccordionBox key={child.catName} title={`${child.catName} with ${child.order.length} Unpaid bills`}>
                  <CustomTable
                    title={`${child.catName} with ${child.order.length} Unpaid bills`}
                    columns={PaymentLineSchema}
                    data={[...child.order]}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={(row) => onMakePayment([row])}
                  />
                </AccordionBox>
              );
            })}
          </AccordionBox>
        ))}
      </div>
    </PageWrapper>
  );
};
export default Payments;
