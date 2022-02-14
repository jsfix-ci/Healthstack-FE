import { Portal } from '@mui/base';
import { Menu, MenuItem } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

import { ObjectContext } from '../../../../context/context';
import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import useRepository from '../../../hooks';
import Input from '../../../inputs/basic/Input';
import CustomSelect from '../../../inputs/basic/Select';
import ModalBox from '../../../modal';
import { DateFormats, Models } from '../../Constants';
import { toDurationString, toShortDate } from '../../DateUtils';
import {
  DetailsWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  PageWrapper,
} from '../../styles';
import { columnsAppointment } from '../data';
import DocumentViewer from './components/DocumentViewer';
import PatientProfile from './components/PatientProfile';
import { columnLab, labData, recentData } from './data';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const tabs = [
  'Last Visit',
  'Drug Tolerance',
  'Medications',
  'History',
  'Problem List',
  'Task',
];
const documents = [
  'Clinical Note',
  'Lab Result',
  'Doctor Note',
  'Nursing Note',
  'Vital Signs',
  'Progress Note',
];

const Attend: React.FC<Props> = ({ row, backClick }) => {
  const [value, setValue] = useState({});
  const [state, setState] = useState('all');
  const [values, setValues] = useState({});
  const [tab, setTab] = useState('0');
  const { find: findClinicalDocument } = useRepository(
    Models.CLINICAL_DOCUMENT
  );
  const {
    resource: {
      clientResource: { selectedClient },
    },
  } = useContext(ObjectContext);
  const [clinicalDocuments, setClinicalDocuments] = useState([]);

  const loadDocuments = (documentName?: string) => {
    findClinicalDocument({
      query: {
        documentname:
          typeof documentName === 'string'
            ? {
              $regex: documentName,
              $options: 'i',
            }
            : undefined,
        client: selectedClient['_id'],
        $limit: 50,
        $sort: {
          name: 1,
        },
      },
    })
      .then((res: any) => {
        setClinicalDocuments(res.data);
        toast(' Clinical documents fetched successfully');
      })
      .catch((err) => {
        toast(
          'Error Cliical fetching documents, probable network issues ' + err
        );
      });
  };

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openBtn = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleCreate = () => {};

  const handleClose = () => {
    setOpen(false);
  };

  const LabOrder = () => {
    return (
      <PageWrapper>
        <TableMenu>
          <div className="inner-table">
            <Input placeholder="Search here" label="Search here" />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>Filer by</span>
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>

          <Button label="Add new" onClick={() => setOpen(true)} />
        </TableMenu>
        <DataTable
          title="Lab Orders"
          columns={columnLab}
          data={labData}
          selectableRows
          pointerOnHover
          highlightOnHover
          striped
          style={{ overflow: 'hidden' }}
        />
        <Portal>
          <ModalBox open={open} onClose={handleClose}>
            <FullDetailsWrapper>
              <h2>Add Lab Order</h2>
              <GridWrapper style={{ alignItems: 'center' }}>
                <Input
                  label="Add Test"
                  name="addTest"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <CustomSelect
                  label="Select Type"
                  name="selectType"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    })
                  }
                  options={['In-house', 'External']}
                />
                <button
                  style={{
                    borderRadius: '32px',
                    background: '#f3f3f3',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                  }}
                  type="submit"
                  onClick={() => setOpen(false)}
                >
                  +
                </button>
              </GridWrapper>
            </FullDetailsWrapper>
          </ModalBox>
        </Portal>
      </PageWrapper>
    );
  };
  const Prescription = () => {
    return (
      <PageWrapper>
        <TableMenu>
          <div className="inner-table">
            <Input placeholder="Search here" label="Search here" />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>Filer by</span>
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>

          <Button label="Add new" onClick={() => setOpen(true)} />
        </TableMenu>
        <DataTable
          title="Prescription"
          columns={columnLab}
          data={labData}
          selectableRows
          pointerOnHover
          highlightOnHover
          striped
          style={{ overflow: 'hidden' }}
        />
        <Portal>
          <ModalBox open={open} onClose={handleClose}>
            <FullDetailsWrapper>
              <h2>Create Prescription</h2>
              <GridWrapper style={{ alignItems: 'center' }}>
                <Input
                  label="Search Order"
                  name="search"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <Input
                  label="Note"
                  name="note"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <CustomSelect
                  label="Select Type"
                  name="selectType"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    })
                  }
                  options={['In-house', 'External']}
                />
                <button
                  style={{
                    borderRadius: '32px',
                    background: '#f3f3f3',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                  }}
                  type="submit"
                  onClick={() => setOpen(false)}
                >
                  +
                </button>
              </GridWrapper>
            </FullDetailsWrapper>
          </ModalBox>
        </Portal>
      </PageWrapper>
    );
  };
  const NewDocument = () => {
    return <div>Prescription</div>;
  };

  useEffect(() => {
    loadDocuments();
  }, []);
  return (
    <PageWrapper>
      <GrayWrapper>
        <PatientProfile />
        <GrayWrapper
          className="grid"
          style={{
            paddingBottom: '6rem',
          }}
        >
          <FullDetailsWrapper>
            <div>
              <h2>Specific Information:</h2>
            </div>
            <div>
              <h2>Allergies:</h2>
            </div>
            <div>
              <h2>Moridities:</h2>
            </div>
            <div>
              <h2>Disabilities:</h2>
            </div>
            <>
              {tabs.map((tab, index) => (
                <DetailsWrapper title={tab}>{tab}</DetailsWrapper>
              ))}
            </>
          </FullDetailsWrapper>

          <FullDetailsWrapper>
            <GridWrapper className="four-columns">
              <Button
                label={'History'}
                color="#fefffb"
                background="#04ed6d"
                showicon={true}
                onClick={() => setState('all')}
              />
              <Button
                label="Lab Orders"
                background="#fdfdfd"
                color="#333"
                onClick={() => setState('lab')}
              />
              <Button
                label={'Prescription'}
                background={'#ECF3FF'}
                color="#0364FF"
                showicon={true}
                onClick={() => setState('prescription')}
              />
              <div>
                <Button
                  label={'New Document'}
                  background="#FFE9E9"
                  color="#ED0423"
                  showicon={true}
                  onClick={handleClick}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  aria-haspopup="true"
                  aria-expanded={openBtn ? 'true' : undefined}
                  open={openBtn}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  sx={{ boxShadow: '10px 10px 0 rgba(0,0,0,0.08)' }}
                >
                  {documents.map((doc, i) => (
                    <MenuItem onClick={() => setOpen(true)} key={i}>
                      {doc}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </GridWrapper>
            {state === 'all' && (
              <div>
                {clinicalDocuments.map((documentation, index) => {
                  const {
                    createdAt,
                    documentname,
                    createdByname,
                    location,
                    facilityname,
                    status,
                  } = documentation;
                  const time = toDurationString(createdAt);
                  const day = toShortDate(createdAt);
                  const description = `${time} on ${day}: ${documentname} by ${createdByname}  ${location}, ${facilityname}  ${status}`;
                  return (
                    <DetailsWrapper title={description} key={index}>
                      <DocumentViewer document={documentation} />
                      {/* <DataTable
                        title={description}
                        columns={columnLab}
                        data={recentData[0].data}
                        selectableRows
                        pointerOnHover
                        highlightOnHover
                        striped
                      /> */}
                    </DetailsWrapper>
                  );
                })}
              </div>
            )}

            {state === 'lab' && <LabOrder />}
            {state === 'prescription' && <Prescription />}
          </FullDetailsWrapper>
        </GrayWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default Attend;
