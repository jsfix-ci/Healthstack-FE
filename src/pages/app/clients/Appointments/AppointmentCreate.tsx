import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { AppointmentSchema, getResolver, Schema } from '../../schema';
import { BottomWrapper, DetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

const AppointmentCreate = ({ onSubmit, backClick }) => {
  const resolver = yupResolver(getResolver(AppointmentSchema.flat() as any[]));

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver,
  });
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Appointment</h2>
            <span>Create a new appointment by filling out the form below.</span>
          </div>
          <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DetailsWrapper title="Appointment Form" defaultExpanded={true}>
            {AppointmentSchema.map((obj, index) => {
              if (obj['length']) {
                const schemas = obj as Schema[];

                return (
                  <GridWrapper className="subgrid two-columns" key={index}>
                    {schemas.map((schema, childIndex) => (
                      <DynamicInput
                        {...schema}
                        key={childIndex}
                        name={schema.key}
                        control={control}
                        label={schema.description}
                        inputType={schema.inputType}
                        options={schema.options || []}
                        errors={errors}
                      />
                    ))}
                  </GridWrapper>
                );
              } else {
                const schema = obj as Schema;
                return (
                  <DynamicInput
                    {...schema}
                    key={index}
                    name={schema.key}
                    control={control}
                    label={schema.description}
                    inputType={schema.inputType}
                    options={schema.options || []}
                    errors={errors}
                  />
                );
              }
            })}
          </DetailsWrapper>
          <BottomWrapper>
            <Button label="Close without Saving" background="#ECF3FF" color="#0364FF" onClick={backClick} />
            <Button label="Create Appointment" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default AppointmentCreate;
