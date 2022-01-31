import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Button from '../../../buttons/Button';
import DynamicInput from "../../DynamicInput";
import RadioButton from '../../../inputs/basic/Radio';
import CustomSelect from '../../../inputs/basic/Select';
import { typeOptions,paymentOptions } from '../../ModelSchema';
import { PaymentSchema,PaymentDetailsSchema } from "../../ModelSchema";
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  handleAccept: (_data,_event) => void
  row?: any;
  amountBalance : number
}



const PaymentDetails: React.FC<Props> = ({ row, backClick,handleAccept,amountBalance }) => {
  const [values, setValues] = useState({});
  const { handleSubmit, control } = useForm();

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Payment Details</h2>
            <span>Below are your payment’s details</span>
          </div>
          <div>
            <Button
              label='Back to List'
              background='#fdfdfd'
              color='#333'
              onClick={backClick}
            />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <HeadWrapper>
            <div>
              <h2>Make deposit for {row.name}</h2>
            </div>
            <div>
              <label
                style={{
                  padding: "14px 20px",
                  background: "#ffb3bd",
                  color: "#ED0423",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Balance N {amountBalance}
              </label>
            </div>
          </HeadWrapper>
          <form onSubmit={handleSubmit(handleAccept)}>
            <GridWrapper>
              {PaymentDetailsSchema.map((client, index) => (
                <DynamicInput
                  key={index}
                  name={client.key}
                  control={control}
                  label={client.name}
                  inputType={client.inputType}
                  options={paymentOptions}
                />
              ))}
            </GridWrapper>
            <BottomWrapper>
              <Button label='Accept Payment' type='submit' />
            </BottomWrapper>
          </form>
        </FullDetailsWrapper>

        <FullDetailsWrapper>
          <GridWrapper>
            {PaymentSchema.map((schema) => (
              <div>
                <label>{schema.name}</label>
                <p>{schema.selector(row)}</p>
              </div>
            ))}
            <RadioButton title='Type' options={typeOptions} />
          </GridWrapper>
          <BottomWrapper>
            <Button label='Pay' type='submit' />
          </BottomWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default PaymentDetails;
