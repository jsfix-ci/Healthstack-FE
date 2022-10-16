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

interface AddDocumentMenuProps {
  list: any[];
  handleClick: () => void;
}

const AddDocumentMenu: React.FC<AddDocumentMenuProps> = ({
  list,
  handleClick,
}) => {
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
    <Box sx={{ width: { lg: '160px', xs: '100%' } }}>
      <IconButton
        sx={{
          width: { lg: '160px', xs: '100%' },
          p: 1,
          pt: 2,
          pb: 2,
          borderRadius: '8px',
          background: '#fafafa',
        }}
        ref={anchorRef}
        onClick={handleOpen}
      >
        Add Document
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
                  {list.map(option => (
                    <ListItemStyle key={option} onClick={handleClick}>
                      <List sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='body1' sx={{ marginLeft: 1 }}>
                          {option}
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

export default AddDocumentMenu;
