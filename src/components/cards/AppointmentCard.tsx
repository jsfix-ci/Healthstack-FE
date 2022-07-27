import { Avatar } from '@mui/material';
import React from 'react';
import { deepOrange } from '@mui/material/colors';

const AppointmentCard = () => {
  return (
    <div
      style={{
        padding: '10px',
        borderRadius: '16px',
        backgroundColor: '#fff',
        margin: '0 0 16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt='Avatar' src='' sx={{ bgcolor: deepOrange[500] }}>
          H
        </Avatar>

        <div>
          <h2
            style={{
              fontSize: '32px',
              lineHeight: '32px',
              color: '#0364FF',
              margin: '0',
              padding: '0',
            }}
          >
            Dr. Shawn Hampton
          </h2>
          <p>Emergency Appointment</p>
        </div>
      </div>

      <p>
        <i className='bi bi-clock'></i> Monday, September 22
      </p>
    </div>
  );
};

export default AppointmentCard;
