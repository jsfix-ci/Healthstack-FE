import { Box, TextField } from '@mui/material';
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Input from '../basic/Input';

interface Props {
  label: string;
  // value?: Date;
  onChange?: (_?: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
}

const BasicDatePicker: React.FC<Props> = ({
  label,
  onChange,
  // value,
  register,
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54')
  );
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ my: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={label}
          value={value}
          inputFormat='MM/dd/yyyy'
          // onChange={onChange}
          onChange={handleChange}
          renderInput={params => (
            <TextField
              {...params}
              {...register}
              sx={{ width: '100%', background: 'white', height: '42px' }}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default BasicDatePicker;
