import {
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import MenuPopover from '../../core-ui/MenuPopover';

interface TableMenuProps {
  row: any;
  onDeleteRow: (e: any) => void;
  size: any;
}

export const TableMenu: React.FC<TableMenuProps> = ({
  row,
  onDeleteRow,
  size,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState<any>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const deleteRow = () => {
    if (onDeleteRow) {
      onDeleteRow(row);
    }
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}
        size={size}
      >
        {/* <MoreVertIcon /> */}
        <span>Icon</span>
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
        <MenuItem>Item One</MenuItem>

        <MenuItem>Item Two</MenuItem>

        <Divider />

        <MenuItem onClick={deleteRow}>
          <ListItemIcon>
            {/* <DeleteIcon fontSize='small' color='secondary' /> */}
            <span>Icon</span>
          </ListItemIcon>
          <Typography variant='inherit'>Delete</Typography>
        </MenuItem>
      </MenuPopover>
    </div>
  );
};
