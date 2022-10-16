import { Autocomplete as CustomAutocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import * as React from 'react';

interface Props {
  options: any;
  label: string;
  name?: string;
  value: any;
  onChange?: () => void;
}
const Autocomplete: React.FC<Props> = ({
  options,
  label,
  value,
  onChange,
  name,
}) => {
  return (
    <CustomAutocomplete
      freeSolo
      disablePortal
      options={options}
      value={value}
      onChange={onChange}
      sx={{ width: '100%' }}
      renderInput={params => (
        <TextField {...params} label={label} name={name} />
      )}
    />
  );
};

export default Autocomplete;
