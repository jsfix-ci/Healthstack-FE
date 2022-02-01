import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { DebounceInput } from 'react-debounce-input';
import AccordionBox from '../../../accordion';
import { ToastContainer } from 'react-toastify';
import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import CollapsableGrid from '../../../datagrids/CollapsableGrid';
import Input from '../../../inputs/basic/Input';
import { PageWrapper } from '../../styles';
import { BillServiceSchema } from '../../ModelSchema';

interface Props {
  handleCreate?: () => void;
  handleSearch: (_event) => void;
  dataTree: any[];
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
}

export interface DataProps {
  id: any;
  date: string;
  description: string;
  status: string;
  amount: string;
}

// export const rowData = [
//   {
//     id: 1,
//     date: '2022-01-20 19:45',
//     description: 'lorem',
//     status: 'unpaid',
//     amount: '5000',
//   },
//   {
//     id: 2,
//     date: '2022-01-20 19:45',
//     description: 'lorem',
//     status: 'unpaid',
//     amount: '5000',
//   },
//   {
//     id: 3,
//     date: '2022-01-20 19:45',
//     description: 'lorem',
//     status: 'unpaid',
//     amount: '5000',
//   },
// ];

// const dataTree = [
//   {
//     title: 'Ada Chris',
//     description: 'Prescription of one unpaid bill(s)',
//     data: rowData,
//   },
//   {
//     title: 'John Doela Pat',
//     description: 'Prescription of one unpaid bill(s)',
//     data: rowData,
//   },
//   {
//     title: 'Simpa E Dania',
//     description: 'Prescription of one unpaid bill(s)',
//     data: rowData,
//   },
// ];

// export const columnHead: TableColumn<DataProps>[] = [
//   {
//     name: 'S/N',
//     selector: (row) => row.id,
//     sortable: true,
//   },
//   {
//     name: 'Date',
//     selector: (row) => row.date,
//     sortable: true,
//   },
//   {
//     name: 'Description',
//     selector: (row) => row.description,
//     sortable: true,
//   },
//   {
//     name: 'Status',
//     selector: (row) => row.status,
//     sortable: true,
//   },
//   {
//     name: 'Amount',
//     selector: (row) => row.amount,
//     sortable: true,
//   },
// ];

const Bills: React.FC<Props> = ({ handleCreate, onRowClicked, handleSearch,dataTree }) => {
  return (
    <PageWrapper>
      <h2>Bill Services</h2>

      <TableMenu>
        <div className="inner-table">
          <Input
            placeholder="Search here"
            label="Search here"
            onChange={handleSearch}
          />
          <DebounceInput
            className="input is-small "
            type="text"
            placeholder="Search "
            minLength={1}
            debounceTimeout={400}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Filer by</span>
            <i className="bi bi-chevron-down" />
          </div>
        </div>

        <Button label="Add new" onClick={handleCreate} />
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
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
                    columns={BillServiceSchema}
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

export default Bills;
