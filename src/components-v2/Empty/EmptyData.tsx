import { Box } from '@mui/material';
import React from 'react';

interface EmptyDataProps {
  sx?: {};
  children?: React.ReactNode;
}
const EmptyData: React.FC<EmptyDataProps> = ({ sx, children }) => {
  return (
    <Box sx={{ textAlign: 'center', ...sx }}>
      <img src='/empty.gif' alt='Empty State' width={340} />
      <h5>There are no records available.</h5>

      {children}
    </Box>
  );
};

export default EmptyData;
