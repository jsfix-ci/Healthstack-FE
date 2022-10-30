import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField } from '@mui/material';
import { TimePicker as CustomeTimePicker } from '@mui/x-date-pickers';
import React from 'react';

interface Props {
  label: string;
  value?: Date;
  onChange?: (_: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
}

const TimePicker: React.FC<Props> = ({ label, onChange, value, register }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CustomeTimePicker
        label={label}
        value={value}
        onChange={onChange}
        {...register}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default TimePicker;
