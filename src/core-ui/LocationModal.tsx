import { Box, Portal, TextField } from '@mui/material';
import React from 'react';
import Modal from '../components/Modal';
import LocationCard from './LocationCard';
import { FlexBox, GridWrapper } from './styles';

interface LocationModalProps {
  locations: any[];
  onSelectLocation: (e: any) => void;
  open: boolean;
  setOpen: any;
}

const LocationModal: React.FC<LocationModalProps> = ({
  locations,
  onSelectLocation,
  open,
  setOpen,
}) => {
  const closeModal = () => setOpen(false);

  return (
    <Portal>
      <Modal open={open}>
        <FlexBox className='row'>
          <h4>Select a location</h4>
        </FlexBox>

        <Box sx={{ p: 1 }}>
          <TextField
            variant='outlined'
            size='small'
            placeholder='Select a location'
            sx={{
              width: { lg: '320px', xs: '100%' },
              // height: '40px',
              borderRadius: '4px',
              marginRight: '10px',
              mb: { xs: 1 },
              mt: 1,
            }}
          />
          <GridWrapper>
            {locations.map((location, index) => (
              <LocationCard
                key={index}
                location={location}
                onClick={() => {
                  closeModal();
                  onSelectLocation(location.location);
                }}
              />
            ))}
          </GridWrapper>
        </Box>
      </Modal>
    </Portal>
  );
};

export default LocationModal;
