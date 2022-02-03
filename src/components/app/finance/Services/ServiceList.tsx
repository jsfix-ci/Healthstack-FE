import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { DebounceInput } from "react-debounce-input";
import { ToastContainer } from "react-toastify";
import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import AccordionBox from '../../../accordion';
import CollapsableGrid from '../../../datagrids/CollapsableGrid';
import Input from '../../../inputs/basic/Input';
import { PageWrapper } from '../../styles';
import { ServicesSchema } from '../../ModelSchema';
import { columnHead, rowData } from './data';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (
    row: { id: any; name: string; panel: string; amount: string },
    event: any
  ) => void;
  handleSearch: (_event) => void;
  dataTree: any[];
}


const Servicess: React.FC<Props> = ({ handleCreate, onRowClicked,handleSearch,dataTree }) => {
  return (
    <PageWrapper>
      <h2>Services </h2>

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
            placeholder="Search Services"
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
        {dataTree.map((data, index) => {
          return (
            <CollapsableGrid
              key={index}
              columnHead={ServicesSchema}
              description={data.title}
              title={data.categoryname}
              rowData={data.services}
              onRowClicked={onRowClicked}
            />
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default Servicess;
