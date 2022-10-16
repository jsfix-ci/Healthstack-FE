import { Box } from '@mui/material';
import React, { useState } from 'react';
import Calendar from 'react-calendar';

const MiniCalendar = () => {
  const [value, onChange] = useState(new Date());
  return (
    <Box>
      <Calendar onChange={onChange} value={value} />
    </Box>
  );
};

export default MiniCalendar;
