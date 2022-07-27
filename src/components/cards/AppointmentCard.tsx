import { Avatar } from '@mui/material';
import React from 'react';
import { deepOrange } from '@mui/material/colors';

const AppointmentCard = () => {
  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '16px',
        backgroundColor: '#fff',
        margin: '0 0 16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt='Avatar' src='' sx={{ bgcolor: deepOrange[500] }}>
          H
        </Avatar>

        <div style={{ marginLeft: '16px' }}>
          <h4
            style={{
              fontSize: '40px',
              lineHeight: '32px',
              color: '#0364FF',
              margin: '0',
              padding: '0',
            }}
          >
            Dr. Shawn Hampton
          </h4>
          <p
            style={{
              fontSize: '14px',
              lineHeight: '14px',
              margin: '0',
              padding: '0',
            }}
          >
            Emergency Appointment
          </p>
        </div>
      </div>

      <span style={{ padding: '10px', color: '#acacac' }}>
        <i className='bi bi-clock'></i>{' '}
        <small style={{ marginLeft: '4px' }}>Monday, September 22</small>
      </span>
    </div>
  );
};

export default AppointmentCard;
