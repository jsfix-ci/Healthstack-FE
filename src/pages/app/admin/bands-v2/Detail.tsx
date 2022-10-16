import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { bandList } from '../../../../utils/data';
import { Box, Typography } from '@mui/material';
import { BandSchema } from '../../../../utils/schema';
import { Button } from '../../../../components-v2';
import DetailView from '../../../../@views/DetailView';
import DynamicInput from '../../../../components-v2/Inputs/DynamicInput';
import { BottomWrapper } from '../../../../components-v2/styles';

interface Props {
  id: string;
}

const BandDetail: React.FC<Props> = ({ id }) => {
  const [isEditing, setIsEditing] = useState(false);

  const details: any = bandList.filter((band, index) => {
    return band.id === id;
  });

  let keys = Object.keys(details[0]);
  const renderLabel = (key: any) => {
    if (key === 'id') return 'ID';
    if (key === 'name') return 'Name';
    if (key === 'bandType') return 'Band Type';
    if (key === 'description') return 'Description';
  };

  console.log('Band Details', details[0]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => null;
  const renderButton = () => {
    return (
      isEditing && (
        <BottomWrapper>
          <Button label='Clear Form' background='#FFE9E9' color='#ED0423' />
          <Button label='Save Form' type='submit' />
        </BottomWrapper>
      )
    );
  };

  return (
    <DetailView
      title='Band Detail'
      onEdit={handleEdit}
      onDelete={handleDelete}
      hasBottomNavigation={true}
      bottomNavChildren={renderButton()}
    >
      {isEditing ? (
        <>
          {BandSchema.map(({ inputType, key, name, options }, idx) => (
            <DynamicInput
              key={key}
              name={key}
              inputType={inputType}
              label={name}
              options={options}
              value={details[0][key]}
            />
          ))}
        </>
      ) : (
        <>
          {keys.map((key, idx) => {
            return (
              <Box>
                <label>{renderLabel(key)}</label>
                <Typography variant='body2'>{`${details[0][key]}`}</Typography>
              </Box>
            );
          })}
        </>
      )}
    </DetailView>
  );
};

export default BandDetail;
