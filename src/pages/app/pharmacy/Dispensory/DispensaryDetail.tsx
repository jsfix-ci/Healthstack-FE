import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { DispensaryCreateSchema, DispensaryDetailSchema, Schema } from '../../schema';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';
import { randomString } from '../../Utils';

const DispensaryDetails = ({ row, backClick, onSubmit }) => {
  const options = ['Sales', 'In-house', 'Dispense', 'Audit'];
  const invoiceNo = randomString(6);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      client: '',
    },
  });
  const rowData = [
    {
      _id: row._id,
      name: row.serviceInfo.name,
      quantity: row.serviceInfo.quantity,
      baseunit: row.serviceInfo.baseunit,
      price: row.serviceInfo.price,
      amount: row.serviceInfo.amount,
    },
  ];
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Dispensary Sent Details</h2>
            <span>Below are your dispensary’s details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
          </div>
        </HeadWrapper>

        <FullDetailsWrapper>
          <GridWrapper className="two-columns" style={{ alignItems: 'end' }}>
            <div>
              <label>Name</label>
              <p>{row.orderInfo.orderObj.clientname}</p>
            </div>

            <CustomSelect label="Dispensary Mode" name="hmo" options={options} />
          </GridWrapper>
          <GridWrapper style={{ alignItems: 'end' }}>
            <Input label="Date" name="date" value={new Date().toLocaleString()} disabled />
            <Input label="Invoice" name="phone" value={invoiceNo} disabled />
            <Input label="Quantity" name="quantity" value={row.paymentInfo.amountDue} />
          </GridWrapper>

          <br />

          <h2>Instructions:</h2>
          <h2>Billing Status: {row.mode}</h2>
          <br />

          <form onSubmit={handleSubmit(onSubmit)}>
            <FullDetailsWrapper title="Create Employee">
              {DispensaryCreateSchema.map((obj, index) => {
                if (obj['length']) {
                  const schemas = obj as Schema[];

                  return (
                    <GridWrapper key={index}>
                      {schemas.map((schema) => (
                        <DynamicInput
                          key={index}
                          name={schema.key}
                          control={control}
                          label={schema.description}
                          inputType={schema.inputType}
                          options={schema.options || []}
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
                      options={schema.options || []}
                    />
                  );
                }
              })}
              <button
                style={{
                  borderRadius: '32px',
                  background: '#f3f3f3',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                }}
                type="submit"
              >
                +
              </button>

              <BottomWrapper>
                <Button label="Adjust" type="submit" />
              </BottomWrapper>
            </FullDetailsWrapper>
          </form>
        </FullDetailsWrapper>

        <CustomTable title="Product Items" columns={DispensaryDetailSchema} data={rowData} highlightOnHover striped />

        <BottomWrapper>
          <Button label="Clear " background="#FFE9E9" color="#ED0423" />
          <Button label="Sell" />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default DispensaryDetails;
