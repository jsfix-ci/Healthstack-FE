import { Box, FormGroup, Stack } from '@mui/material';
import React from 'react';
import DynamicInput from '../../components/Inputs/DynamicInput';
import { ModulesSchema } from '../../pages/app/schema/ModelSchema';

const SelectModule = () => {
  return (
    <Stack spacing={3} sx={{ width: '100%', mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {ModulesSchema.map((field, i) => (
          <FormGroup key={i}>
            <DynamicInput
              {...field}
              key={i}
              name={field.key}
              label={field.name}
              inputType={field.inputType}
              options={field.options || []}
            />
          </FormGroup>
        ))}
      </Box>
    </Stack>
  );
};

export default SelectModule;
