import { Box, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

interface Props {
  label: string;
  value?: Date;
  onChange?: (_?: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
}

const DateTime: React.FC<Props> = ({
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
        <DateTimePicker
          label={label}
          value={value}
          inputFormat='MM/dd/yyyy hh:mm:ss aa'
          // onChange={onChange}
          onChange={handleChange}
          {...register}
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

export default DateTime;
