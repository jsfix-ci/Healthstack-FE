import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { AppointmentSchema, getResolver, Schema } from '../../schema';
import { BottomWrapper, DetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

<<<<<<< HEAD:src/pages/app/clients/Appointments/AppointmentCreate.tsx
const AppointmentCreate = ({ onSubmit, backClick }) => {
  const resolver = yupResolver(getResolver(AppointmentSchema.flat() as any[]));

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver,
=======
const AppointmentForm = ({ onSubmit, backClick, selectedData }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: selectedData,
>>>>>>> 242735c9ab7c2634373245d69791a677e1ec6c5b:src/pages/app/clients/Appointments/AppointmentForm.tsx
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
                    {schemas.map((field, childIndex) => (
                      <DynamicInput
                        {...schema}
                        key={childIndex}
                        name={field.key}
                        control={control}
<<<<<<< HEAD:src/pages/app/clients/Appointments/AppointmentCreate.tsx
                        label={schema.description}
                        inputType={schema.inputType}
                        options={schema.options || []}
                        errors={errors}
=======
                        label={field.name}
                        inputType={field.inputType}
                        options={field.options || []}
                        data={selectedData}
>>>>>>> 242735c9ab7c2634373245d69791a677e1ec6c5b:src/pages/app/clients/Appointments/AppointmentForm.tsx
                      />
                    ))}
                  </GridWrapper>
                );
              } else {
                const field = obj as Schema;
                return (
                  <DynamicInput
                    {...schema}
                    key={index}
                    name={field.key}
                    control={control}
<<<<<<< HEAD:src/pages/app/clients/Appointments/AppointmentCreate.tsx
                    label={schema.description}
                    inputType={schema.inputType}
                    options={schema.options || []}
                    errors={errors}
=======
                    label={field.name}
                    inputType={field.inputType}
                    options={field.options || []}
                    data={selectedData}
>>>>>>> 242735c9ab7c2634373245d69791a677e1ec6c5b:src/pages/app/clients/Appointments/AppointmentForm.tsx
                  />
                );
              }
            })}
          </DetailsWrapper>
          <BottomWrapper>
            <Button label="Close without Saving" background="#ECF3FF" color="#0364FF" onClick={backClick} />
            <Button label="Save Appointment" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default AppointmentForm;
