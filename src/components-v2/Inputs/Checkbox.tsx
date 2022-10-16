import {
  Checkbox as CustomCheckbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import React from 'react';

interface CheckboxProps {
  label: string;
  name?: string;
  errorText?: string;
  disabled?: boolean;
  defaultValue?: string;
  options: any[];
  onChange?: (e: any) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  defaultValue = '',
  onChange,
  disabled,
  errorText,
  options,
}) => {
  return (
    <FormControl
      disabled={disabled}
      component='fieldset'
      sx={{ width: '1r00%', mt: 1, mb: 1 }}
    >
      <FormLabel component='legend'>{label}</FormLabel>
      <FormGroup>
        {options.map((option, i) => (
          <FormControlLabel
            key={i}
            defaultValue={defaultValue}
            control={
              <CustomCheckbox
                name={option.label || option}
                value={option.value || option || ''}
                onChange={onChange}
                disabled={disabled}
              />
            }
            label={option.label || option}
          />
        ))}
        <label>{errorText}</label>
      </FormGroup>
    </FormControl>
  );
};

export default Checkbox;
