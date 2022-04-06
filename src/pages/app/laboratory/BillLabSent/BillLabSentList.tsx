import React from 'react';
// import { TableColumn } from 'react-data-table-component';
import { DebounceInput } from 'react-debounce-input';

import AccordionBox from '../../../../components/accordion';
import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { BillServiceCreateSchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  handleSearch?: (_event) => void;
  onRowClicked?: (row: any, event: any) => void;
  items: any;
}

const BillLabSent: React.FC<Props> = ({ onRowClicked, items, handleSearch }) => {
  return (
    <PageWrapper>
      <h2>Bill Lab Sent</h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <Input placeholder="Search here" label="Search here" size="small" />
          <DebounceInput
            className="input is-small "
            type="text"
            placeholder="Search Employees"
            minLength={1}
            debounceTimeout={400}
            onChange={() => {}}
          />

          <FilterMenu onSearch={handleSearch} />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {items.map((data, index) => (
          <AccordionBox title={data.title} key={index}>
            <CustomTable
              title={data.description}
              columns={BillServiceCreateSchema}
              data={data.data}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={onRowClicked}
            />
          </AccordionBox>
        ))}
      </div>
    </PageWrapper>
  );
};

export default BillLabSent;
