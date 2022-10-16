import { Button, ButtonGroup } from '@mui/material';
import React, { useState } from 'react';

// const buttons = [
//   <Button key='one' value='list'>
//     List
//   </Button>,
//   <Button key='two' value='list'>
//     Grid
//   </Button>,
// ];
interface GroupsProps {
  onClick: (e: any) => void;
  buttons?: any[];
}

const Groups: React.FC<GroupsProps> = ({ onClick, buttons }) => {
  const [active, setActive] = useState(false);
  return (
    <ButtonGroup
      size='large'
      aria-label='large button group'
      sx={{
        height: '42px',
        ml: 1,
        width: '110px',
        background: `${active && 'red'}`,
      }}
    >
      {buttons?.map(button => (
        <Button
          key={button.key}
          value={button.value}
          onClick={e => {
            setActive(true);
            onClick(e);
          }}
        >
          {button.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Groups;
