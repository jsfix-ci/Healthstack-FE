import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import RadioButton from './RadioButton';

const items = [
  {
    label: 'List',
    selected: true,
  },
  {
    label: 'Grid',
    selected: false,
  },
];

interface SwitchProps {
  children: React.ReactNode;
}

const Switch: React.FC<SwitchProps> = ({ children }) => {
  const [checked, setChecked] = useState<boolean>(true);

  console.log(checked);

  return (
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        p: 0,
        px: 0.6,
        background: '#f8f8f8',
        border: '1px solid blue',
        color: 'blue',
        ml: 1,
        height: '42px',
        borderRadius: '4px',
      }}
      className='filter-switch'
      spacing={1}
    >
      {children}
    </Stack>
  );
};

export default Switch;
