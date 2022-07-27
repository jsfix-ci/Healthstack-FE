import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from '../../components/menuitem/style';
import StatCard from '../../components/statscard/StatCard';
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
            <h2>Appointment</h2>
            <Link to='view-all'>View All</Link>
          </header>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <StyledTabs value={value} onChange={handleChange}>
              <StyledTab label='Item One' {...a11yProps(0)} />
              <StyledTab label='Item Two' {...a11yProps(1)} />
              <StyledTab label='Item Three' {...a11yProps(2)} />
            </StyledTabs>
          </Box>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </DashboardBox>
        <DashboardBox className='lg'>
          <header>
            <h2>Overview of Appointment</h2>
          </header>
        </DashboardBox>
      </DashboardContainer>
    </div>
  );
};

export default Client;
