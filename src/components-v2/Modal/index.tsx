import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import { Modal as CustomModal } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
  setOpen?: (e?: any) => void;
}
const style = {
  width: '68%',
  maxWidth: '90%',
  height: '80%',
  maxHeight: '100%',
  bgcolor: '#fff',
  boxShadow: 40,
  p: 4,
  borderRadius: '6px',
  minWidth: '350px !important',
};

const Modal: React.FC<ModalProps> = ({
  open,
  setOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <CustomModal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={onClose}
      closeAfterTransition
      // BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{
        width: '100%',
        display: 'grid',
        placeItems: 'center ',
        p: 1,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography>{title}</Typography>
            <IconButton onClick={setOpen}>
              <i className='bi bi-x-circle' style={{ fontSize: '20px' }}></i>
            </IconButton>
          </Box>
          <Box sx={{ height: '100%', overflowY: 'auto' }}>{children}</Box>
        </Box>
      </Fade>
    </CustomModal>
  );
};

export default Modal;
