import React, { useState } from 'react';

import AccordionBox from '../../../../components/accordion';
import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PaymentLineSchema } from '../../schema/payment';
import { PageWrapper } from '../../styles';

const Payments = ({ onMakePayment, onSearch, items }) => {
  const [selectedPayments, setSelectedPayments] = useState([]);

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
          <Button label="Pay" onClick={() => onMakePayment(selectedPayments)} />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {items.map((data, index) => (
          <AccordionBox title={data.clientname} key={index}>
            {data.bills.map((child, index) => {
              return (
                <AccordionBox key={index} title={`${child.catName} with ${child.order.length} Unpaid bills`}>
                  <CustomTable
                    title={`${child.catName} with ${child.order.length} Unpaid bills`}
                    columns={PaymentLineSchema}
                    data={child.order}
                    pointerOnHover
                    highlightOnHover
                    striped
                    selectable
                    onSelectedRowsChange={({ selectedRows }) => setSelectedPayments(selectedRows)}
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
