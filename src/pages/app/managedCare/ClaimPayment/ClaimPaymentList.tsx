import React from 'react';

// import AccordionBox from '../../../../components/accordion';
import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PaymentSchema } from '../../schema';
import { PageWrapper } from '../../styles';
// import { columnHead, dataTree } from './data';

// interface Props {
//   handleCreate?: () => void;
//   onRowClicked?: (row: any, event: any) => void;
// }

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
        {/* {dataTree.map((data, index) => (
          <AccordionBox title={data.title} key={index}>
            {data.children.map((child, index) => {
              return ( */}
        {/* <AccordionBox key={index} title={child.title}> */}
        <CustomTable
          title="Claim Payments"
          columns={PaymentSchema}
          data={items}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={onRowClicked}
        />
        {/* </AccordionBox> */}
        {/* );
            })}
          </AccordionBox>
        ))} */}
      </div>
    </PageWrapper>
  );
};

export default ClaimPayments;
