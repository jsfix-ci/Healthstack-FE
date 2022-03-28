import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { BillServiceCreateSchema, Schema } from '../../schema';
import { BottomWrapper, DetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

const BillClientCreate = ({ backClick, onSubmit }) => {
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
              {BillServiceCreateSchema.map((obj, index) => {
                if (obj['length']) {
                  const schemas = obj as Schema[];

                  return (
                    <GridWrapper className="subgrid two-columns" key={index}>
                      {schemas.map((schema) => (
                        <DynamicInput
                          key={index}
                          name={schema.key}
                          control={control}
                          label={schema.description}
                          inputType={schema.inputType}
                          options={schema.options}
                        />
                      ))}
                    </GridWrapper>
                  );
                } else {
                  const schema = obj as Schema;
                  return (
                    <DynamicInput
                      key={index}
                      name={schema.key}
                      control={control}
                      label={schema.description}
                      inputType={schema.inputType}
                      options={schema.options}
                    />
                  );
                }
              })}
            </GridWrapper>
          </DetailsWrapper>
          <table>
            <thead>
              <tr>
                <th>
                  <abbr title="Serial No">S/No</abbr>
                </th>
                <th>
                  <abbr title="Category">Category</abbr>
                </th>
                <th>
                  <abbr title="Name">Name</abbr>
                </th>
                <th>
                  <abbr title="Quantity">Quanitity</abbr>
                </th>
                <th>
                  <abbr title="Unit">Unit</abbr>
                </th>
                <th>
                  <abbr title="Selling Price">Selling Price</abbr>
                </th>
                <th>
                  <abbr title="Amount">Amount</abbr>
                </th>
                <th>
                  <abbr title="Billing Mode">Mode</abbr>
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
          <BottomWrapper>
            <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
            <Button label="Save Form" type="submit" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BillClientCreate;
