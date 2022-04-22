import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import { BillCreateDetailSchema, BillServiceSchema } from '../schema';

const ServiceCreate = ({ backClick, onSubmit: _ }) => {
  const { handleSubmit, control } = useForm();

  const [clientBills, setClientBills] = useState([]);

  const addNewBill = (data) => {
    setClientBills(data);
  };

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Service</h2>
            <span>
              Create a New Service by filling out the form below to get started.
            </span>
          </div>
          <Button
            label="Back to List"
            background="#fdfdfd"
            color="#333"
            onClick={backClick}
          />
        </HeadWrapper>
        <form onSubmit={handleSubmit(addNewBill)}>
          <DetailsWrapper title="Create Service" defaultExpanded={true}>
            <GridWrapper>
              {BillServiceSchema.filter((obj) => obj.key).map(
                (schema, index) => {
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
              )}
              <button
                style={{
                  borderRadius: '32px',
                  background: '#f3f3f3',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  margin: '1rem 0',
                }}
                type="submit"
              >
                +
              </button>
            </GridWrapper>
            <CustomTable
              title={'Total'}
              columns={BillCreateDetailSchema}
              data={clientBills}
              pointerOnHover
              highlightOnHover
              striped
            />
          </DetailsWrapper>
        </form>
        <BottomWrapper>
          <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
          <Button label="Save Form" />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ServiceCreate;
