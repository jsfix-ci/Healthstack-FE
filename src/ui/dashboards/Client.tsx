import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppointmentGrid from '../../components/appointmentgrid';
import AppointmentCard from '../../components/cards/AppointmentCard';
import PieChart from '../../components/chart/PieChart';
import { Link } from '../../components/menuitem/style';
import StatCard from '../../components/statscard/StatCard';
import StatusBatch from '../../components/statusbatch';
import { StyledTab, StyledTabs } from '../../components/tabs';
import {
  DashboardBox,
  DashboardContainer,
  StartCardWapper,
} from '../styled/global';

interface DashboardProps {
  username?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Client: React.FC<DashboardProps> = ({ username = 'Anayo' }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <div>
        <h2>
          Hello <span>{username}</span>👋
        </h2>
        <p>
          Welcome to your Client Module <span>@Your Company’s</span> Front Desk
        </p>
      </div>

      <StartCardWapper>
        <StatCard
          count={14}
          name={'Appointments'}
          icon={'bi bi-calendar'}
          range={'month'}
        />
        <StatCard
          count={14}
          name={'New Clients'}
          icon={'bi bi-calendar'}
          range={'month'}
        />
        <StatCard
          count={14}
          name={'Total Number of Clients'}
          icon={'bi bi-calendar'}
          range={'month'}
        />
      </StartCardWapper>

      <DashboardContainer>
        <DashboardBox>
          <header>
            <div className='top-header'>
              <h2>Appointment</h2>
              <NavLink to='app/clients/appointments'>View All</NavLink>
            </div>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <StyledTabs value={value} onChange={handleChange}>
                <StyledTab label='This Month' {...a11yProps(0)} />
                <StyledTab label='This Week' {...a11yProps(1)} />
                <StyledTab label='Today' {...a11yProps(2)} />
              </StyledTabs>
            </Box>
          </header>

          <TabPanel value={value} index={0}>
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />{' '}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AppointmentCard />
          </TabPanel>
        </DashboardBox>
        <DashboardBox className='lg'>
          <header>
            <div className='top-header'>
              <h2>Overview of Appointment</h2>
            </div>

            <div style={{ display: 'flex' }}>
              <StatusBatch status='cancelled' />
              <StatusBatch label='Confirmed' status='confirmed' />
              <StatusBatch label='Attended' status='attended' />
              <StatusBatch label='Absent' status='absent' />
              <StatusBatch label='Rescheduled' status='rescheduled' />
            </div>
          </header>

          <AppointmentGrid />
          <PieChart />
        </DashboardBox>
      </DashboardContainer>
    </div>
  );
};

export default Client;
