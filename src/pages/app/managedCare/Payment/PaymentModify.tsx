import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { Schema } from '../../schema';
import { PaymentSchema } from '../../schema/ModelSchema';
import { BottomWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  cancelEditClicked?: () => void;
  row?: any;
  backClick: () => void;
  onSubmit: (_data) => void;
}

const PaymentModify: React.FC<Props> = ({ cancelEditClicked, onSubmit, row: bills, backClick }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: bills,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Employee Details</h2>
            <span>Below are your employee’s details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
            <Button
              label={'Cancel Editing'}
              background={'#f2f2f2'}
              color={'#333'}
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={cancelEditClicked}
            />
          </div>
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <GridWrapper>
            {PaymentSchema.map((client: Schema, index) => (
              <DynamicInput
                key={index}
                name={client.key}
                control={control}
                label={client.name}
                inputType={client.inputType}
                options={client.options}
              />
            ))}
          </GridWrapper>
        </form>

        <BottomWrapper>
          <Button label="Delete Employee" background="#FFE9E9" color="#ED0423" />
          <Button label="Save Employee" type="submit" />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default PaymentModify;
