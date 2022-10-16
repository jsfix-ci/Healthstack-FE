import { faker } from '@faker-js/faker';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { Button } from '../styles';

const ProductCard = () => {
  return (
    <Box
      sx={{
        p: 2,
        width: { lg: '300px', xs: '100%' },
        borderRadius: 4,
        '&:hover': {
          backgroundColor: '#fcfcfc',
        },
      }}
    >
      <img
        src={faker.image.fashion()}
        alt=''
        style={{
          width: '100%',
          height: '200px',
          backgroundColor: 'black',
          borderRadius: '4px',
        }}
      />
      <Typography sx={{ textTransform: 'uppercase', fontSize: '18px' }}>
        Dabur
      </Typography>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ mt: 4, mb: 2 }}
      >
        <Typography variant='h3' sx={{ fontWeight: 'bold', fontSize: '22px' }}>
          ₦4900000.50
        </Typography>
        <Stack direction='row' alignItems='center'>
          {[...Array(5)].map((_, index) => (
            <Box
              className='bi bi-star'
              sx={{
                mr: 0.3,
              }}
              key={index}
            />
          ))}
          <Typography>(4.5)</Typography>
        </Stack>
      </Stack>
      <Typography>
        1258 bids, 359 watchers $5.95 for shipping, Eligible for Shipping to
        anywhere within Nigeria
      </Typography>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ mt: 2 }}
        spacing={2}
      >
        <Button background='#ECF3FF' color='blue' border='2px solid blue'>
          Add to Cart
        </Button>
        <Box className='bi bi-heart' />
      </Stack>
    </Box>
  );
};

export default ProductCard;
