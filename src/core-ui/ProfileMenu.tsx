import React, { useRef, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  ListItemButton,
} from '@mui/material';
import { account, MENU_OPTIONS } from '../Constants';
import { Link } from 'react-router-dom';
import MenuPopover from './MenuPopover';

interface ListItemStyleProps {
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
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
  display: 'flex',
  alignItems: 'center',
}));

const ProfileMenu = () => {
  const anchorRef = useRef(null);

  const [open, setOpen] = useState<any>(null);

  const handleOpen = (event: React.MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
    console.log('hello');
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: theme => alpha(theme.palette.grey[400], 0.8),
            },
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{ bgcolor: 'orange' }}
        />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
          boxShadow: '4px 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant='subtitle2' noWrap>
            {account.displayName}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map(option => (
            <ListItemStyle key={option.label} onClick={handleOpen}>
              <Link key={option.label} to={option.linkTo}>
                {option.label}
              </Link>
            </ListItemStyle>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
};

export default ProfileMenu;
