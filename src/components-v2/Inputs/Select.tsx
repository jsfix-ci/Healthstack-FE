import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Select as CustomSelect } from '@mui/material';
import React, { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: any[];
  name?: string;
  errorText?: string;
  onChange?: (e: any) => void;
  defaultValue?: string;
  readonly?: boolean;
  value?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  name,
  defaultValue,
  onChange,
  errorText,
  readonly,
  value,
  placeholder,
}) => {
  return (
    <FormControl
      disabled={readonly}
      style={{ width: '100%', margin: '0 0 0.75rem ' }}
    >
      <InputLabel id='demo-simple-select-autowidth-label'>{label}</InputLabel>
      <CustomSelect
        labelId='demo-simple-select-autowidth-label'
        id='demo-simple-select-autowidth'
        label={label}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        sx={{
          background: 'white',
          border: '1px solid #eee',
          // boxShadow: '4px 4px 20px rgba(0,0,0,0.06)',
        }}
      >
        <MenuItem value='' sx={{ width: '100%' }}>
          <em>None</em>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem
            value={option.value ? option.value : option}
            key={index}
            sx={{ width: '100%' }}
          >
            {option.label ? option.label : option}
          </MenuItem>
        ))}
      </CustomSelect>
      {errorText && <FormHelperText error>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
