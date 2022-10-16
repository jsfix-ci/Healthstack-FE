import { Box } from '@mui/material';
import React from 'react';
import AppRoutes from '../../routes/routes';
import { LayoutWrapper } from '../styles';

function Layout() {
  return (
    <LayoutWrapper>
      <Box className='layout__content'>
        <Box className='layout__content-main'>
          <AppRoutes />
        </Box>
      </Box>
    </LayoutWrapper>
  );
}

export default Layout;
