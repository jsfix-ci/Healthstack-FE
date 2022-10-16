import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio as RadioButton,
  RadioGroup,
} from '@mui/material';

interface RadioProps {
  name: string;
  title?: string;
  options: { value: string; label: any; disabled?: boolean }[];
  onChange?: (e: any) => void;
  defaultValue?: string;
  disabled?: boolean;
}

const Radio: React.FC<RadioProps> = ({
  name,
  title,
  disabled,
  options,
  onChange,
  defaultValue = '',
}) => {
  return (
    <FormControl
      disabled={disabled}
      component='fieldset'
      sx={{ width: '100%', mt: 1, mb: 1 }}
    >
      <FormLabel component='legend'>{title}</FormLabel>
      <RadioGroup row aria-label={name} name={name} onChange={onChange}>
        {options.map((option, i) => (
          <FormControlLabel
            key={i}
            value={option.value || option || ''}
            control={<RadioButton />}
            label={option.label || option || ''}
            disabled={option.disabled}
            defaultValue={defaultValue}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Radio;
