import React from 'react';
import { Client } from '../../../ui/dashboards';

import { PageWrapper } from '../styles';

const ClientDashboard = () => {
  return (
    <PageWrapper className='dashboard'>
      <Client />
    </PageWrapper>
  );
};

export default ClientDashboard;
