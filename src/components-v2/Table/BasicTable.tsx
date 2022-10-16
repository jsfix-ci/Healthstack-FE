import React from 'react';
import DataTable from 'react-data-table-component';
import { CustomLoader } from '.';
import EmptyData from '../Empty/EmptyData';
const customStyles = {
  rows: {
    style: {
      minHeight: '64px', // override the row height
      '&:not(:last-of-type)': {
        borderBottomWidth: '0px',
      },
      padding: '16px',
      backgroundColor: '#fff',
      border: '1px solid #666s',
    },
  },
  headRow: {
    style: {
      borderBottomWidth: '0px',
      padding: '24px',
      backgroundColor: '#F4F4F4',
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
      fontSize: '16px',
      color: '#2e2e2e',
      fontWeight: 'medium',
    },
  },
};

interface BasicTableProps {
  columns: any[];
  data: any[];
}

const BasicTable: React.FC<BasicTableProps> = ({ columns, data }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={customStyles}
      fixedHeader={true}
      progressComponent={<CustomLoader />}
      noDataComponent={<EmptyData />}
    />
  );
};

export default BasicTable;
