import { Avatar, Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Accordion, Button, Input } from '../../components';
import Select from '../../components/Inputs/Select';

const AddAdmin = () => {
  const [errors, setErrors] = useState({
    firstName: { message: '' },
    lastName: { message: '' },
    email: { message: '' },
    role: { message: '' },
  });
  return (
    <Box sx={{ py: 2 }}>
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          p: 2,
          width: '100%',
          background: '#f7f7f7',
          mt: 0.5,
          mb: 0.5,
          borderRadius: 2,
          cursor: 'pointer',
        }}
      >
        <Avatar src='' alt='' sx={{ width: '40px', height: '40px' }} />

        <Typography variant='body1' sx={{ ml: 2 }}>
          Jon Doe
        </Typography>
      </Stack>

      <Accordion title='Create Admin'>
        <form>
          <div>
            <Input
              name='firstName'
              label='First Name'
              placeholder='Enter your First Name'
            />
            {errors.firstName && (
              <p style={{ color: 'blue', fontSize: '16px' }}>
                {errors.firstName?.message}
              </p>
            )}
          </div>
          <div>
            <Input
              name='lastName'
              label='Last Name'
              placeholder='Enter your last Name'
            />
            {errors.lastName && (
              <p style={{ color: 'blue', fontSize: '16px' }}>
                {errors.lastName?.message}
              </p>
            )}
          </div>
          <div>
            <Input
              name='email'
              label='Email'
              placeholder='Enter your Email Address'
            />
            {errors.email && (
              <p style={{ color: 'blue', fontSize: '16px' }}>
                {errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <Select
              name='role'
              label='Role'
              placeholder='Enter your role'
              options={['Admin', 'Staff', 'Frontdesk']}
            />
            {errors.role && (
              <p style={{ color: 'blue', fontSize: '16px' }}>
                {errors.role?.message}
              </p>
            )}
          </div>

          <Button type='submit' label='Create' fullwidth='true' />
        </form>
      </Accordion>
      <Accordion title='Send Invite'>
        <form>
          <div>
            <Input
              name='email'
              label='Email'
              placeholder='Enter your Email Address'
            />
            {errors.email && (
              <p style={{ color: 'blue', fontSize: '16px' }}>
                {errors.email?.message}
              </p>
            )}
          </div>

          <Button type='submit' label='Send Invite' fullwidth='true' />
        </form>
      </Accordion>
    </Box>
  );
};

export default AddAdmin;
