import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { getResolver } from '../../schema';
import { BandSchema } from '../../schema/ModelSchema';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  backClick: () => void;
  onSubmit: (_data, _event) => void;
}

const BandCreate: React.FC<Props> = ({ backClick, onSubmit }) => {
  const resolver = yupResolver(getResolver(BandSchema));
  console.debug({ resolver: JSON.stringify(getResolver(BandSchema)) });
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ resolver });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Band</h2>
            <span>Create a New band by filling out the form below to get started.</span>
          </div>
          <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FullDetailsWrapper title="Create Band">
            <GridWrapper>
              {BandSchema.map((client, index) => (
                <DynamicInput
                  {...client}
                  key={index}
                  name={client.key}
                  control={control}
                  label={client.name}
                  inputType={client.inputType}
                  options={client.options}
                  errors={errors}
                />
              ))}
            </GridWrapper>
          </FullDetailsWrapper>

          <BottomWrapper>
            <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
            <Button label="Save Form" type="submit" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BandCreate;
