import { Stack } from '@mui/material';
import React from 'react';
import Button from '../../../components/buttons/Button';
import Input from '../../../components/inputs/basic/Input';
import CustomSelect from '../../../components/inputs/basic/Select';

import { useForm, Controller } from 'react-hook-form';
// https://react-hook-form.com/get-started

import {
  // countriesOptions,
  departmentOptions,
  statesOptions,
  unitsOptions,
} from '../../../utils/data';

// countriesOptions.map(count => (
//   console.log(count)
// ))

const NewEmployee = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      organizationEmail: ' ',
      email: ' ',
      phoneNumber: ' ',
      state: '',
      departments: '',
      units: ''
    },
  });
  // const [values, setValues] = useState({});

  // console.log(values);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
                    name="organizationEmail"
                    control={control}
                    render={({ field }) => <Input {...field} label="Organnisation Email" />}
          />

          <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <Input {...field} label="Email" />}
          />

          <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => <Input {...field} label="Phone number" />}
          />

        <Controller
                    name="state"
                    control={control}
                    render={({ field }) => <CustomSelect 
                              {...field}
                              options={ statesOptions } 
                              label="State" 
                    />}
          />

          <Controller
                    name="departments"
                    control={control}
                    render={({ field }) => <CustomSelect 
                              {...field}
                              label="Departments" 
                              options={ departmentOptions } 
                    />}
          />

          <Controller
                    name="units"
                    control={control}
                    render={({ field }) => <CustomSelect 
                              {...field}
                              label="Units" 
                              options={ [unitsOptions] } 
                    />}
          />



        <Button type="submit" label="Create Admin" fullwidth />
      </form>
    </Stack>
  );
};

export default NewEmployee;
