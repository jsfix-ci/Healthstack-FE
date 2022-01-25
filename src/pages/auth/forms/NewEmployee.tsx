import { Stack } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import DynamicInput from '../../../components/app/DynamicInput';
import { OnboardingEmployeeSchema } from '../../../components/app/ModelSchema';
import Button from '../../../components/buttons/Button';

function NewEmployee() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {OnboardingEmployeeSchema.map(({ inputType, key, name, options }) => (
          <DynamicInput
            key={key}
            inputType={inputType}
            name={key}
            label={name}
            options={options || []}
            control={control}
          />
        ))}
        <Button type="submit" label="Create Admin" fullwidth />
      </form>
    </Stack>
  );
}

export default NewEmployee;
