import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { DebounceInput } from "react-debounce-input";
import { ToastContainer } from "react-toastify";
import { TableMenu } from '../../../../styles/global';
import AccordionBox from '../../../accordion';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import { PageWrapper } from '../../styles';
import { PaymentSchema } from "../../ModelSchema";

interface Props {
  handleCreate?: () => void;
  handleSearch: (_event) => void;
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
  dataTree: any[];
}



const Payments: React.FC<Props> = ({ handleCreate, onRowClicked,handleSearch,dataTree }) => {
  return (
    <PageWrapper>
      <h2>Payments</h2>

      <TableMenu>
        <div className='inner-table'>
          <Input
            placeholder='Search here'
            label='Search here'
            onChange={handleSearch}
          />
          <DebounceInput
            className='input is-small '
            type='text'
            placeholder='Search Payments'
            minLength={1}
            debounceTimeout={400}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Filer by</span>
            <i className='bi bi-chevron-down' />
          </div>
        </div>
      </TableMenu>

      <div style={{ width: "100%", height: "600px", overflow: "auto" }}>
        {dataTree.map((data, index) => (
          <AccordionBox title={data.clientname} key={index}>
            {data.bills.map((child, index) => {
              console.log(child.order.length);
              
              return (
                <AccordionBox
                  key={index}
                  title={`${child.catName} with ${child.order.length} Unpaid bills`}
                >
                  <DataTable
                    title={`${child.catName} with ${child.order.length} Unpaid bills`}
                    columns={PaymentSchema}
                    data={child.order}
                    selectableRows
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
