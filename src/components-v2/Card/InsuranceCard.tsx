import { Box, Typography } from '@mui/material';
import React from 'react';

interface InsuranceCardProps {
  title: string;
}
const InsuranceCard: React.FC<InsuranceCardProps> = ({ title }) => {
  return (
    <Box sx={{ py: 2 }}>
      <img src='' alt='' width='200px' height='32px' />
      <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
      <Typography>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
        voluptatem sed eum reprehenderit mollitia aut amet.
      </Typography>
      <a
        href='#fg'
        target='_blank'
        style={{
          padding: '10px',
          border: '1px solid blue',
          color: 'blue',
          display: 'inline-block',
        }}
      >
        To Details
      </a>
    </Box>
  );
};

export default InsuranceCard;
