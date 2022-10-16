import React from 'react';
import DataTable from 'react-data-table-component';
import { CustomLoader } from '.';
import { billList } from '../../utils/data';
import { billSchema } from '../../utils/schema';
import EmptyData from '../Empty/EmptyData';
const customStyles = {
  rows: {
    style: {
      minHeight: '64px', // override the row height
      '&:not(:last-of-type)': {
        borderBottomWidth: '0px',
      },
      padding: '16px',
      backgroundColor: '#ECF3FF',
    },
  },
  headRow: {
    style: {
      borderBottomWidth: '0px',
      padding: '24px',
      backgroundColor: '#03045E',
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#fff',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
      fontSize: '16px',
      color: '#0E214C',
      fontWeight: 'medium',
    },
  },
};

const ClientTable = () => {
  return (
    <DataTable
      columns={billSchema}
      data={billList}
      customStyles={customStyles}
      fixedHeader={true}
      progressComponent={<CustomLoader />}
      noDataComponent={<EmptyData />}
    />
  );
};

export default ClientTable;
