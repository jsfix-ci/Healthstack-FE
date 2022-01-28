import React, { useState } from 'react';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import RadioButton from '../../../inputs/basic/Radio';
import CustomSelect from '../../../inputs/basic/Select';
import { typeOptions,paymentOptions } from '../../ModelSchema';
import { PaymentSchema } from "../../ModelSchema";
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
  row?: any;
}



const PaymentDetails: React.FC<Props> = ({ row, backClick }) => {
  const [values, setValues] = useState({});
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
                Balance {row.amount}
              </label>
            </div>
          </HeadWrapper>
          <form action=''>
            <GridWrapper>
              <CustomSelect
                options={paymentOptions}
                name='paymentOptions'
                label='Payment Options'
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label='Amount'
                name='name'
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label='Description'
                name='description'
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
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
