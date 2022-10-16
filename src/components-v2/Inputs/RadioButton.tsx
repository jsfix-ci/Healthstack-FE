import { Box, InputLabel, Typography } from '@mui/material';
import React from 'react';

interface RadioButtonProps {
  label: string | React.ReactNode;
  value?: any;
  name?: string;
  onChange: (e?: any) => void;
  //   defaultValue: any;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  name,
  onChange,
  //   defaultValue,
}) => {
  const isChecked = (checked: boolean) => {
    if (checked)
      return {
        boxShadow: '4px 4px 20px rgba(0,0,0,0.08)',
        background: 'rgba(0, 100, 204, 0.16)',
        border: '1px solid rgba(0, 100, 204, 0.16)',
      };
    return;
  };
  return (
    <InputLabel className='filter-switch-item' onChange={onChange}>
      <input
        type='radio'
        name={name}
        id='filter1-0'
        checked={value}
        // defaultValue={defaultValue}
        style={{
          display: 'none',
        }}
      />
      <Typography
        variant='body2'
        sx={{
          py: 0.8,
          px: 2,
          cursor: 'pointer',
          background: isChecked(value)?.background,
          borderRadius: '4px',
          boxShadow: isChecked(value)?.boxShadow,
          border: isChecked(value)?.border,
        }}
      >
        {label}
      </Typography>
    </InputLabel>
  );
};

export default RadioButton;
