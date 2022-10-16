import { Box, FormHelperText } from '@mui/material';
import React from 'react';

import { InputBox, InputField, InputLabel } from '../styles';

interface InputProps {
  label?: string;
  inputId?: string;
  errors?: boolean;
  errorText?: string;
  onChange?: (e: any) => void;
  onKeyDown?: () => void;
  helperText?: string;
  name?: string;
  type?: string;
  defaultValue?: string;
  value?: any;
  placeholder?: string;
  size?: 'small' | 'medium';
  disabled?: boolean;
  inputRef?: any;
  sx?: {};
}

const Input: React.FC<InputProps> = ({
  label,
  errorText,
  type = 'text',
  name,
  defaultValue = '',
  onChange,
  onKeyDown,
  placeholder,
  sx,
  value,
  // size = 'medium',
  disabled = false,
}) => (
  <Box>
    <InputBox>
      <InputField
        className='form__input'
        onChange={onChange}
        type={type}
        defaultValue={defaultValue}
        onKeyDown={onKeyDown}
        // placeholder={placeholder}
        disabled={disabled}
        style={sx}
        value={value}
      />
      <InputLabel className='form__label' htmlFor={name}>
        {label}
      </InputLabel>
    </InputBox>
    {errorText && <FormHelperText error>{errorText}</FormHelperText>}
  </Box>
);

export default Input;
