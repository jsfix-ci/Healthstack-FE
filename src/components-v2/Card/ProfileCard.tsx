import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Button from '../Buttons/Button';
import Input from '../Inputs/Input';

interface ProfileCardProps {
  isDependant?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ isDependant = false }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDependant = (isDependant: boolean) => {
    if (isDependant) return { backgound: 'green', label: 'Dependant' };
    return { backgound: 'orange', label: 'Primary' };
  };
  return (
    <Box
      sx={{
        p: 2,
        background: 'white',
        borderRadius: '8px',
        width: { lg: '240px', xs: '100%' },
        height: '340px',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Avatar
          src=''
          alt='Profile Card'
          sx={{ width: '80px', height: '80px' }}
        />
      </Box>

      <Box
        sx={{
          background: handleDependant(isDependant).backgound,
          px: 2,
          py: 0.8,
          borderRadius: '20px',
          fontSize: '12px',
          position: 'absolute',
          top: 10,
          left: 10,
          color: 'white',
        }}
      >
        {handleDependant(isDependant).label}
      </Box>

      <IconButton
        sx={{
          fontSize: '12px',
          position: 'absolute',
          top: 10,
          right: 10,
          fontWeight: 'bold',
        }}
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? 'Save' : <i className='bi bi-pen'></i>}
      </IconButton>

      <Box sx={{ width: '100%' }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '16px',
            my: 1,
            textAlign: 'center',
          }}
        >
          Mr Jon Doe
        </Typography>
        <Stack
          direction={`${isEditing ? 'column' : 'row'}`}
          spacing={2}
          sx={{ my: 1 }}
        >
          <Box>
            <Typography sx={{ fontSize: '10px', fontWeight: 'bold', mb: 0.6 }}>
              D.O.B
            </Typography>
            {isEditing ? (
              <Input value='22/05/72' type='datetime-local' />
            ) : (
              <Chip label='22/05/72' />
            )}
          </Box>
          <Box>
            <Typography sx={{ fontSize: '10px', fontWeight: 'bold', mb: 0.6 }}>
              ID
            </Typography>
            {isEditing ? (
              <Input value='35DFE9902' />
            ) : (
              <Chip label='35DFE9902' />
            )}
          </Box>
        </Stack>

        <Box sx={{ mb: 1 }}>
          <Typography sx={{ fontSize: '10px', fontWeight: 'bold', mb: 0.6 }}>
            CIN
          </Typography>
          {isEditing ? <Input value='35DFE9902' /> : <Chip label='35DFE9902' />}
        </Box>
        <Box>
          <Typography sx={{ fontSize: '10px', fontWeight: 'bold', mb: 0.6 }}>
            Tel
          </Typography>
          {isEditing ? (
            <Input value='+23481930003' type='tel' />
          ) : (
            <Chip label='+23481930003' />
          )}
        </Box>

        {isEditing && (
          <Stack direction='row' justifyContent='space-between'>
            <Button background='#fcfcfc' color='#000'>
              Discard
            </Button>
            <Button>Save</Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default ProfileCard;
