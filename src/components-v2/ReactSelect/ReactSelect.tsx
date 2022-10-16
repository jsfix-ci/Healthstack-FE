import { Box, Typography } from '@mui/material';
import React from 'react';
import Select from 'react-select';

interface ReactSelectProps {
  name?: string;
  options: { value: string; label: string }[];
  isSearchable?: boolean;
  value?: any;
  placeholder?: string;
  title?: string;
}

const ReactSelect: React.FC<ReactSelectProps> = ({
  name,
  options,
  isSearchable = true,
  value,
  placeholder,
  title,
  ...props
}) => {
  return (
    <>
      <Box>
        <Typography>{title}</Typography>
        <Select
          name={name}
          options={options}
          isSearchable={isSearchable}
          value={value}
          placeholder={placeholder}
          defaultValue={options[0]}
          {...props}
        />
      </Box>
    </>
  );
};

export default ReactSelect;
