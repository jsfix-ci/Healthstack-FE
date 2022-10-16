import { Box, Portal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { bandList } from '../../../../utils/data';
import { BandSchema } from '../../../../utils/schema';
import BandDetail from './Detail';
import CreateBand from './CreateBand';
import Modal from '../../../../components-v2/Modal';
import Table from '../../../../components-v2/Table';
import { DashboardPageWrapper } from '../../../../core-ui/styles';
import FilterMenu from '../../../../components-v2/Menus/FilterMenu';
import { Button } from '../../../../components-v2';

const Bands = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [create, setCreate] = useState(false);
  const [bandId, setBandId] = useState('');
  let navigate = useNavigate();
  const handleCreateBand = () => {
    navigate('/app/admin/bands/create');
  };
  const handleRowClicked = (row: any, event: any) => {
    navigate(`/app/admin/bands/${row.id}`);
  };

  const onCreateAction = () => {
    setOpenModal(true);
    setCreate(true);
  };
  const onRowClickedAction = (row: any) => {
    setBandId(row.id);
    setCreate(false);
    setOpenModal(true);
  };

  console.log('BandId', bandId);
  return (
    <>
      <Portal>
        <Modal
          open={openModal}
          title='Band'
          setOpen={() => setOpenModal(false)}
        >
          {/* <BandDetails id={bandId} /> */}
          {create ? <CreateBand /> : <BandDetail id={bandId} />}
        </Modal>
      </Portal>
      <DashboardPageWrapper>
        <Typography variant='h2'>Bands</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { lg: 'row', sm: 'row', xs: 'column' },
            zIndex: 100,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              margin: { xs: '10px 0', lg: '24px 0' },
              width: { xs: '100%' },
              // flexDirection: { xs: 'column', lg: 'row' },
            }}
          >
            <TextField
              variant='outlined'
              size='small'
              sx={{
                width: { lg: '320px', xs: '70%' },
                // height: '40px',
                borderRadius: '4px',
                marginRight: '10px',
                mb: { xs: 1 },
              }}
            />
            <FilterMenu />
          </Box>

          <Button
            sx={{ width: { xs: '100%', lg: 'auto' } }}
            onClick={onCreateAction}
          >
            <i className='bi bi-plus-circle'> </i> Add Band
          </Button>
        </Box>

        <Box sx={{ height: `calc(100vh - 90px)`, overflowY: 'scroll' }}>
          <Table
            columns={BandSchema}
            data={bandList}
            onRowClicked={onRowClickedAction}
          />
        </Box>
      </DashboardPageWrapper>
    </>
  );
};

export default Bands;
