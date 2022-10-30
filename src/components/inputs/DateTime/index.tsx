import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import React from 'react';

interface Props {
  label: string;
  value?: Date;
  onChange?: (_: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
}

const DateTime: React.FC<Props> = ({ label, onChange, value, register }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label={label}
        value={value}
        onChange={onChange}
        {...register}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DateTime;
