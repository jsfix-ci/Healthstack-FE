import React from 'react';

import { Popover } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  },
}));

interface MenuPopoverProps {
  children: React.ReactNode;
  sx: {};
  open: any;
  anchorEl: any;
  onClose: () => void;
}

const MenuPopover: React.FC<MenuPopoverProps> = ({
  children,
  sx,
  anchorEl,
  onClose,
  ...other
}) => {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          overflow: 'inherit',
          ...sx,
        },
      }}
      anchorEl={anchorEl}
      onClose={onClose}
      {...other}
    >
      <ArrowStyle className='arrow' />

      {children}
    </Popover>
  );
};

export default MenuPopover;
