import React, { useRef, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Stack,
  IconButton,
  ListItemButton,
  List,
  Popper,
  Grow,
  ClickAwayListener,
} from '@mui/material';
import { FILTER_OPTIONS } from '../../Constants';

import Input from '../Inputs/Input';

interface ListItemStyleProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export const ListItemStyle = styled((props: ListItemStyleProps) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  padding: '16px',
}));

const FilterMenu = () => {
  const anchorRef = useRef(null);

  const [open, setOpen] = useState<any>(false);

  const handleOpen = (event: React.MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
    console.log('hello');
  };
  return (
    <Box>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: '0.5rem 1.2rem',
          borderRadius: 2,
          color: '#000',
          fontWeight: 'bold',
          width: { xs: '100%' },
        }}
      >
        <Typography variant='body1'>Filter </Typography>
        <i className='bi bi-chevron-down'></i>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-start'
        transition
        disablePortal
        sx={{ zIndex: 1000, width: { xs: '100%', lg: '320px' } }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left right' : 'left bottom',
            }}
          >
            <Box
              sx={{
                background: '#fff',
                minWidth: '200px',
                borderRadius: '4px',
                boxShadow: '4px 4px 20px rgba(0,0,0,0.08)',
                width: { xs: '100%', lg: '100%' },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Stack sx={{ p: 1 }}>
                  {/* <SearchInput /> */}
                  <Input sx={{ width: '100%', height: '36px' }} />
                  {FILTER_OPTIONS.map(option => (
                    <ListItemStyle key={option.label} onClick={handleOpen}>
                      <List sx={{ display: 'flex', alignItems: 'center' }}>
                        <input type='checkbox' />
                        <Typography variant='body1' sx={{ marginLeft: 1 }}>
                          {option.label}
                        </Typography>
                      </List>
                    </ListItemStyle>
                  ))}
                </Stack>
              </ClickAwayListener>
            </Box>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default FilterMenu;
