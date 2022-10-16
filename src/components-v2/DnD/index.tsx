import { faker } from '@faker-js/faker';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const finalSpaceCharacters: { id: string; name: string; thumb: string }[] = [
  ...Array(4),
].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  thumb: faker.image.avatar(),
}));

interface DnDProps {
  hasAvatar?: boolean;
}
const DnD: React.FC<DnDProps> = ({ hasAvatar }) => {
  const [items, setItems] = useState(finalSpaceCharacters);
  const handleOnDragEnd = (result: any) => {
    const data = Array.from(items);
    const [reorderedItem] = data.splice(result.source.index, 1);
    data.splice(result.destination.index, 0, reorderedItem);

    setItems(data);

    if (!result.destination) return;
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='items'>
        {provided => (
          <Box
            className='items'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map(({ id, name, thumb }, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {provided => (
                    <Stack
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                      sx={{
                        p: 2,
                        width: '100%',
                        background: '#f7f7f7',
                        mt: 0.5,
                        mb: 0.5,
                        borderRadius: 2,
                        cursor: 'pointer',
                      }}
                    >
                      <Box>
                        {hasAvatar && (
                          <Avatar
                            src={thumb}
                            alt={`${name} Thumb`}
                            sx={{ width: '40px', height: '40px' }}
                          />
                        )}
                        <Typography variant='body1' sx={{ ml: 2 }}>
                          {name}
                        </Typography>
                      </Box>

                      <Box>
                        <IconButton>
                          <Box className='bi bi-pen'></Box>
                        </IconButton>
                        <IconButton>
                          <Box className='bi bi-trash'></Box>
                        </IconButton>
                      </Box>
                    </Stack>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DnD;
