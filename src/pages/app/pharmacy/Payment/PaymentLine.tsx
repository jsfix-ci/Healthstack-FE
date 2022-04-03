import { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import RadioButton from '../../../../components/inputs/basic/Radio';
import { PaymentLineSchema } from '../../schema/payment';
import { GridWrapper } from '../../styles';

const PaymentLine = ({ payment, updateAmountPaying }) => {
  const [payInFull, setPayInFull] = useState(true);
  const [amountDue] = useState(payment.paymentInfo.amountDue);
  const [amountPaying, setAmountPaying] = useState(amountDue);
  const [balanceDue, setBalanceDue] = useState(0);

  return (
    <GridWrapper>
      {PaymentLineSchema.map((schema) => (
        <div>
          <label>{schema.name}</label>
          <p>{schema.selector(payment)}</p>
        </div>
      ))}
      <div>
        <RadioButton
          title="Type"
          options={['Full', 'Part']}
          onChange={(e) => {
            setPayInFull(e.target.value === 'Full');
          }}
          defaultValue={payInFull ? 'Full' : 'Part'}
        />
        {!payInFull && (
          <>
            <div>
              <Input
                type="number"
                name="paymentType"
                value={amountPaying}
                onChange={(e) => {
                  var value = +e.target.value;

                  if (value > amountDue) value = amountDue;
                  if (value < 0) value = 0;

                  setAmountPaying(+value);
                }}
                max={amountDue}
                min={0}
              />
            </div>
            <div>
              <label
                style={{
                  padding: '14px 20px',
                  background: '#ffb3bd',
                  color: '#ED0423',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                paid up {amountPaying}
              </label>
            </div>
            <div>
              <label
                style={{
                  padding: '14px 20px',
                  background: '#ffb3bd',
                  color: '#ED0423',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Balance Due {balanceDue}
              </label>
            </div>
          </>
        )}
        <Button
          onClick={() => {
            setBalanceDue(amountDue - amountPaying);
            updateAmountPaying(amountPaying);
          }}
        >
          Update
        </Button>
      </div>
    </GridWrapper>
  );
};

export default PaymentLine;
