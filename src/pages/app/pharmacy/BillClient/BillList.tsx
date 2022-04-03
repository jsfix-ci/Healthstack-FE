import React from 'react';

import AccordionBox from '../../../../components/accordion';
import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { BillServiceSchema } from '../../schema/pharmacy';
import { PageWrapper } from '../../styles';

const Bills = ({ handleCreate, onRowClicked, onSearch, items }) => {
  return (
    <PageWrapper>
      <h2>Bill Services</h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <FilterMenu schema={BillServiceSchema} onSearch={onSearch} />
        </div>

        <Button onClick={handleCreate}>
          <i className="bi bi-plus-circle"></i> Add new
        </Button>
      </TableMenu>
      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {items.map((data, index) => (
          <AccordionBox title={data.clientname} key={index}>
            {data.bills.map((child, index) => {
              return (
                <AccordionBox key={index} title={`${child.catName} with ${child.order.length} Unpaid bills`}>
                  <CustomTable
                    title={`${child.catName} with ${child.order.length} Unpaid bills`}
                    columns={BillServiceSchema}
                    data={child.order}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={onRowClicked}
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

export default Bills;
