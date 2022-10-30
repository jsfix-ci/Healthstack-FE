import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';

import Input from '../basic/Input';

interface Props {
  label: string;
  value?: Date;
  onChange?: (_: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
}

const BasicDatePicker: React.FC<Props> = ({
  label,
  onChange,
  value,
  register,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        inputFormat='DD/MM/YYYY'
        onChange={onChange}
        {...register}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
