import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { BillCustomerSchema } from '../../schema/pharmacy';
import { BottomWrapper, DetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  backClick: () => void;
  onSubmit: (_data, _event) => void;
  invoice: any;
}

const BillCreate: React.FC<Props> = ({ backClick, onSubmit, invoice }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      client: '',
    },
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Bill</h2>
            <span>Create a New Bill by filling out the form below to get started.</span>
          </div>
          <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DetailsWrapper title="Create Bill Service" defaultExpanded={true}>
            <GridWrapper>
              {BillCustomerSchema.map((field, index) => {
                return (
                  <GridWrapper className="subgrid two-columns" key={index}>
                    <DynamicInput
                      key={index}
                      name={field.key}
                      control={control}
                      label={field.description}
                      inputType={field.inputType}
                      options={field.options || { invoice }}
                    />
                  </GridWrapper>
                );
              })}
            </GridWrapper>
            <GridWrapper>
              {BillCustomerSchema.map((field, index) => {
                return (
                  <GridWrapper className="subgrid two-columns" key={index}>
                    <DynamicInput
                      key={index}
                      name={field.key}
                      control={control}
                      label={field.description}
                      inputType={field.inputType}
                      options={field.options || { invoice }}
                    />
                  </GridWrapper>
                );
              })}
            </GridWrapper>
          </DetailsWrapper>

          <BottomWrapper>
            <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
            <Button label="Save Form" type="submit" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BillCreate;
