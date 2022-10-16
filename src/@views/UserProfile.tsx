import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import Modal from '../components-v2/Modal';
import {
  drugList,
  medicationList,
  problemList,
  taskList,
  visitList,
} from '../utils/data';
import {
  drugSchema,
  historySchema,
  medicationSchema,
  problemSchema,
  taskSchema,
} from '../utils/schema';
import ViewOne from './ViewOne';

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState('Visit History');
  function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const modalContent = () => {
    if (modalDetails === 'Visit History')
      return { columns: historySchema, data: visitList };
    if (modalDetails === 'Drug Tolerance')
      return { columns: drugSchema, data: drugList };
    if (modalDetails === 'Medications')
      return { columns: medicationSchema, data: medicationList };
    if (modalDetails === 'Problem List')
      return { columns: problemSchema, data: problemList };
    if (modalDetails === 'Tasks')
      return { columns: taskSchema, data: taskList };
    return { columns: '', data: '' };
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ViewOne
          title={modalDetails}
          columns={modalContent().columns}
          data={modalContent().data}
          tableTitle={modalDetails}
          hasCreate={false}
        />
      </Modal>
      <Box
        sx={{
          height: '100vh',
          overflow: 'auto',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            background: '#fbfbfb',
            p: 3,
            borderRadius: 2,
          }}
        >
          <Stack direction='column' alignItems='center' justifyContent='center'>
            <Box>
              <Avatar
                src='h
        ttps://via.placeholder.com/150'
                alt='AT'
                sx={{ bgcolor: 'orange', width: '100px', height: '100px' }}
              />
              <Typography
                sx={{ fontSize: '20px', width: '100%', textAlign: 'center' }}
              >
                Jon Doe
              </Typography>
            </Box>
            <Button
              sx={{
                height: '40px',
                background: '#eee',
                color: '#000',
                width: '100%',
                mt: 1,
                mb: 1,
                borderRadius: '15px',
                p: 1.6,
                border: '0.4px solid #dfdfdf',
              }}
            >
              Bill Client
            </Button>
          </Stack>
          <Typography variant='body2'>
            Description: Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quam, optio, impedit
          </Typography>

          <Box sx={{ mt: 1, p: 0 }}>
            <Chip
              label='Cash'
              sx={{
                background: randomColor(),
                color: '#fff',
                mr: 0.4,
                mt: 0.3,
              }}
            />
            <Chip
              label='Axzard HMO'
              sx={{
                background: randomColor(),
                color: '#fff',
                mr: 0.4,
                mt: 0.3,
              }}
            />
            <Chip
              label='Male'
              sx={{
                background: randomColor(),
                color: '#fff',
                mr: 0.4,
                mt: 0.3,
              }}
            />
            <Chip
              label='24 yrs old'
              sx={{
                background: randomColor(),
                color: '#fff',
                mr: 0.4,
                mt: 0.3,
              }}
            />
            <Chip
              label='Christianity'
              sx={{
                background: randomColor(),
                color: '#fff',
                mr: 0.4,
                mt: 0.3,
              }}
            />
            <Chip
              label='AA'
              sx={{
                background: randomColor(),
                color: '#fff',
                mr: 0.4,
                mt: 0.3,
              }}
            />
            <Chip
              label='A+'
              sx={{
                background: randomColor(),
                color: '#fff',
                mr: 0.4,
                mt: 0.3,
              }}
            />
            <Chip
              label='(234) 823 567 8893'
              sx={{
                background: randomColor(),
                color: '#fff',
                mr: 0.4,
                mt: 0.3,
              }}
            />
            <Chip
              label='john@mail.com'
              sx={{
                background: randomColor(),
                color: '#fff',
                mr: 0.4,
                mt: 0.3,
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Box>
              <Typography variant='body2'>
                Client Tags:
                <Box sx={{ p: 0 }}>
                  <Chip
                    label='Cash payer'
                    sx={{
                      ml: 0.5,
                      background: randomColor(),
                      color: '#fff',
                      mr: 0.4,
                      mt: 0.2,
                    }}
                  />
                  <Chip
                    label='Cash payer'
                    sx={{
                      ml: 0.5,
                      background: randomColor(),
                      color: '#fff',
                      mr: 0.4,
                      mt: 0.2,
                    }}
                  />
                  <Chip
                    label='Cash payer'
                    sx={{
                      ml: 0.5,
                      background: randomColor(),
                      color: '#fff',
                      mr: 0.4,
                      mt: 0.2,
                    }}
                  />
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%',
            background: '#fbfbfb',
            p: 3,
            borderRadius: 2,
            mt: 3,
          }}
        >
          <Box sx={{ mt: 2 }}>
            <Typography variant='h4'>Specific Information</Typography>
            <Box sx={{ mt: 1.2 }}>
              <Chip label='Tag 1' sx={{}} />
              <Chip label='Tag 2' sx={{ ml: 0.5 }} />
              <Chip label='Tag 3' sx={{ ml: 0.5 }} />
              <Chip label='Tag 4' sx={{ ml: 0.5 }} />
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant='h4'>Allergies</Typography>
            <Box sx={{ mt: 1.2 }}>
              <Chip label='Tag 1' sx={{}} />
              <Chip label='Tag 2' sx={{ ml: 0.5 }} />
              <Chip label='Tag 3' sx={{ ml: 0.5 }} />
              <Chip label='Tag 4' sx={{ ml: 0.5 }} />
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant='h4'>Morbidities</Typography>
            <Box sx={{ mt: 1.2 }}>
              <Chip label='Tag 1' sx={{}} />
              <Chip label='Tag 2' sx={{ ml: 0.5 }} />
              <Chip label='Tag 3' sx={{ ml: 0.5 }} />
              <Chip label='Tag 4' sx={{ ml: 0.5 }} />
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant='h4'>Disabilities</Typography>
            <Box sx={{ mt: 1.2 }}>
              <Chip label='Tag 1' sx={{}} />
              <Chip label='Tag 2' sx={{ ml: 0.5 }} />
              <Chip label='Tag 3' sx={{ ml: 0.5 }} />
              <Chip label='Tag 4' sx={{ ml: 0.5 }} />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%',
            background: '#fbfbfb',
            p: 3,
            borderRadius: 2,
            mt: 3,
          }}
        >
          <Box
            sx={{
              width: '100%',
              p: 2,
              borderRadius: 1,
              mt: 0.6,
              cursor: 'pointer',
              '&:hover': {
                background: '#fff',
              },
            }}
            onClick={() => {
              setOpen(true);
              setModalDetails('Visit History');
            }}
          >
            Visit History
          </Box>
          <Box
            sx={{
              width: '100%',
              p: 2,
              borderRadius: 1,
              mt: 0.6,
              cursor: 'pointer',
              '&:hover': {
                background: '#fff',
              },
            }}
            onClick={() => {
              setOpen(true);
              setModalDetails('Drug Tolerance');
            }}
          >
            Drug Tolerance
          </Box>
          <Box
            sx={{
              width: '100%',
              p: 2,
              borderRadius: 1,
              mt: 0.6,
              cursor: 'pointer',
              '&:hover': {
                background: '#fff',
              },
            }}
            onClick={() => {
              setOpen(true);
              setModalDetails('Medications');
            }}
          >
            Medications
          </Box>
          <Box
            sx={{
              width: '100%',
              p: 2,
              borderRadius: 1,
              mt: 0.6,
              cursor: 'pointer',
              '&:hover': {
                background: '#fff',
              },
            }}
            onClick={() => {
              setOpen(true);
              setModalDetails('Problem List');
            }}
          >
            Problem List
          </Box>
          <Box
            sx={{
              width: '100%',
              p: 2,
              borderRadius: 1,
              mt: 0.6,
              cursor: 'pointer',
              '&:hover': {
                background: '#fff',
              },
            }}
            onClick={() => {
              setOpen(true);
              setModalDetails('Tasks');
            }}
          >
            Tasks
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
