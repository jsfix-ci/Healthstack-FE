import React from 'react';

import AccordionBox from '../../../../components/accordion';
import CustomTable from '../../../../components/customtable';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PaymentSchema } from '../../schema/ModelSchema';
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

const Payments: React.FC<Props> = ({ onRowClicked, items, handleSearch }) => {
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
          <FilterMenu onSearch={handleSearch} />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {items.map((data, index) => (
          <AccordionBox title={data.title} key={index}>
            {data.children.map((child) => {
              return (
                <AccordionBox title={child.title}>
                  <CustomTable
                    title={child.description}
                    columns={PaymentSchema}
                    data={child.data}
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

export default Payments;
