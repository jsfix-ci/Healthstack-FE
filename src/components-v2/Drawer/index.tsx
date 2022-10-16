import React from 'react';
import {
  Box,
  IconButton,
  SwipeableDrawer as CustomDrawer,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloseIcon } from '../Icons/Icons';
import useResponsive from '../../utils/useResponsive';

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: '#fff',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
}));

interface DrawerProps {
  children?: React.ReactNode;
  sx?: {};
  title?: string;
  isOpen?: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  sx,
  title = 'Header',
  isOpen = false,
  handleClose,
  handleOpen,
}) => {
  const isDesktop = useResponsive('up', 'lg', 0, 0);

  return (
    <CustomDrawer
      anchor={isDesktop ? 'right' : 'bottom'}
      open={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      hideBackdrop={true}
      PaperProps={{
        sx: {
          p: 1,
          width: { lg: 600, sm: '100%' },
          overflow: 'inherit',
          boxShadow: '4px 4px 20px rgba(0,0,0,0.08)',
          borderTopLeftRadius: { sm: 8 },
          borderTopRightRadius: { sm: 8 },
          borderBottomRightRadius: { lg: 8 },
          borderBottomLeftRadius: { lg: 8 },
          elevation: 12,

          ...sx,
        },
      }}
      ModalProps={{
        sx: { backgroundColor: '#8a8a8aa' },
      }}
    >
      <StyledBox>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            p: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <IconButton onClick={handleClose} sx={{ borderRadius: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {children}
      </StyledBox>
    </CustomDrawer>
  );
};

export default Drawer;
