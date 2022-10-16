import { Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Button } from '../components-v2';
import RadioButton from '../components-v2/Inputs/RadioButton';
import Switch from '../components-v2/Inputs/Switch';
import FilterMenu from '../components-v2/Menus/FilterMenu';
import ScheduleCalendar from '../components-v2/Schedule';
import Table from '../components-v2/Table';
import { DashboardPageWrapper } from '../core-ui/styles';

interface ViewOneProps {
  title?: string;
  handleSearch?: () => void;
  handleCreate?: () => void;
  onRowClicked?: (row: any, event: any) => void;
  columns: any;
  data: any;
  tableTitle: string;
  hasCreate?: boolean;
  hasGridView?: boolean;
  printData?: any[];
}

const ViewOne: React.FC<ViewOneProps> = ({
  title,
  columns,
  data,
  onRowClicked,
  tableTitle,
  handleCreate,
  handleSearch,
  hasCreate = true,
  hasGridView = false,
  printData,
}) => {
  const [value, setValue] = useState({ list: true, grid: false });

  return (
    <DashboardPageWrapper>
      <Typography variant='h2'>{title}</Typography>
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
          {hasGridView && (
            <Switch>
              <RadioButton
                label={<i className='bi bi-list-ul' />}
                value={value.list}
                onChange={() => {
                  setValue({ list: true, grid: false });
                }}
              />
              <RadioButton
                label={<i className='bi bi-grid-1x2-fill' />}
                value={value.grid}
                onChange={() => {
                  setValue({ list: false, grid: true });
                }}
              />
            </Switch>
          )}

          {/* <DownloadButton printData={printData} /> */}
        </Box>
        {hasCreate && (
          <Button
            sx={{ width: { xs: '100%', lg: 'auto' } }}
            onClick={handleCreate}
          >
            <i className='bi bi-plus-circle'> </i> Add {title}
          </Button>
        )}
      </Box>

      <Box sx={{ height: `calc(100vh - 90px)`, overflowY: 'scroll' }}>
        {value.list ? (
          <Table columns={columns} data={data} onRowClicked={onRowClicked} />
        ) : (
          <ScheduleCalendar />
        )}
      </Box>
    </DashboardPageWrapper>
  );
};

export default ViewOne;
