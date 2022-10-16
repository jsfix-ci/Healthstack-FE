import { Box } from '@mui/material';
import React from 'react';
import { GrayWrapper, HeadWrapper } from '../../../@views/styles';
import { Button } from '../../../components';
import DynamicInput from '../../../components/Inputs/DynamicInput';
import { BottomWrapper, FullDetailsWrapper } from '../../../components/styles';
import {
  DashboardPageWrapper,
  GridWrapper,
  ModalWrapper,
} from '../../../core-ui/styles';
import { BandSchema } from '../../../utils/schema';

const CreateBand = () => {
  return (
    <ModalWrapper>
      <Box>
        <HeadWrapper>
          <div>
            <h2>Create Band</h2>
            <span>
              Create a New Band by filling out the form below to get started.
            </span>
          </div>
        </HeadWrapper>
        <form>
          <FullDetailsWrapper>
            <GridWrapper>
              {BandSchema.map(({ inputType, key, name, options }) => (
                <DynamicInput
                  key={key}
                  name={key}
                  inputType={inputType}
                  label={name}
                  options={options}
                />
              ))}
            </GridWrapper>
          </FullDetailsWrapper>
          <BottomWrapper>
            <Button label='Clear Form' background='#FFE9E9' color='#ED0423' />
            <Button label='Save Form' type='submit' />
          </BottomWrapper>
        </form>
      </Box>
    </ModalWrapper>
  );
};

export default CreateBand;
