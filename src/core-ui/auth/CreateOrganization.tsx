import React from 'react';
import { Stack, Box } from '@mui/material';
import DynamicInput from '../../components/Inputs/DynamicInput';
interface CreateOrganizationProps {
  control?: any;
  schema: any[];
  errors?: any;
}

const CreateOrganization: React.FC<CreateOrganizationProps> = ({
  control,
  schema,
  errors,
}) => {
  return (
    <Stack sx={{ width: '100%' }}>
      <Box sx={{ mt: 3 }}>
        {schema.map((data, i) => (
          <DynamicInput
            key={i}
            {...data}
            defaultValue=''
            label={data.description}
            name={data.key}
            control={control}
            errors={errors}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default CreateOrganization;
