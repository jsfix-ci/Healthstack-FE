import React from 'react';
import DataTable from 'react-data-table-component';

import EmptyData from '../empty';
// import { customStyles } from './styles';

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

interface Props {
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

const CustomLoader = () => (
  <div style={{ padding: '24px' }}>
    <img src='/loading.gif' width={400} />
  </div>
);

const CustomTable: React.FC<Props> = ({
  title,
  columns,
  data,
  onRowClicked,
  pointerOnHover = true,
  highlightOnHover = true,
  striped = true,
  dense = false,
  progressPending,
  selectable = false,
  onSelectedRowsChange,
}) => {
  return (
    <DataTable
      title={title}
      columns={columns.filter(obj => obj.selector && obj.inputType)}
      data={data.map((obj, i) => ({ ...obj, sn: i + 1 }))} //TODO: only add sn if it's in the schema, to improve performance here
      pointerOnHover={pointerOnHover}
      highlightOnHover={highlightOnHover}
      striped={striped}
      customStyles={customStyles}
      onRowClicked={onRowClicked}
      fixedHeader={true}
      selectableRows={selectable}
      onSelectedRowsChange={onSelectedRowsChange}
      fixedHeaderScrollHeight='100%'
      responsive
      dense={dense}
      style={{
        width: '100%',
      }}
      progressComponent={<CustomLoader />}
      progressPending={progressPending}
      noDataComponent={<EmptyData />}
    />
  );
};

export default CustomTable;
