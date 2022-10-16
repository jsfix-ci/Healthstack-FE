import React from 'react';
import DataTable from 'react-data-table-component';
import EmptyData from '../Empty/EmptyData';
// import { customStyles } from './styles';

interface TableProps {
  title?: string;
  columns: any;
  data: any;
  pointerOnHover?: boolean;
  highlightOnHover?: boolean;
  striped?: boolean;
  selectable?: boolean;
  onRowClicked?: (row: any, event: any) => void;
  dense?: boolean;
  progressPending?: any;
  onSelectedRowsChange?: any;
}

export const CustomLoader = () => (
  <div style={{ padding: '24px' }}>
    <img src='/loading.gif' alt='progress ' width={400} />
  </div>
);
const customStyles = {
  rows: {
    style: {
      minHeight: '64px', // override the row height
      '&:not(:last-of-type)': {
        borderBottomWidth: '0px',
      },
      padding: '16px',
      backgroundColor: '##F8F8F8',
    },
  },
  headRow: {
    style: {
      borderBottomWidth: '0px',
      padding: '24px',
      backgroundColor: '#F8F8F8',
      fontSize: '16px',
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#33415C',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
      fontSize: '16px',
      color: '#979DAC',
      fontWeight: '400',
    },
  },
};

const Table: React.FC<TableProps> = ({
  title,
  columns,
  data,
  onRowClicked,
  pointerOnHover = true,
  highlightOnHover = true,
  striped = false,
  dense = false,
  progressPending,
  selectable = false,
  onSelectedRowsChange,
}) => {
  return (
    <DataTable
      title={title}
      columns={columns}
      data={data}
      customStyles={customStyles}
      pointerOnHover={pointerOnHover}
      highlightOnHover={highlightOnHover}
      striped={striped}
      onRowClicked={onRowClicked}
      fixedHeader={true}
      selectableRows={selectable}
      onSelectedRowsChange={onSelectedRowsChange}
      fixedHeaderScrollHeight='100%'
      responsive
      dense={dense}
      progressComponent={<CustomLoader />}
      noDataComponent={<EmptyData />}
    />
  );
};

export default Table;
