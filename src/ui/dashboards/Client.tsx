import React from 'react';
import StatCard from '../../components/statscard/StatCard';
import { PageWrapper } from '../styled/styles';

const Client = () => {
  return (
    <div>
      <div>
        <h2>
          Hello <span>Anayo</span>
        </h2>
        <p>
          Welcome to your Client Module <span>@Your Company’s</span> Front Desk
        </p>
      </div>

      <div style={{ display: 'flex', width: '100%', marginTop: '30px' }}>
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
      </div>
    </div>
  );
};

export default Client;
