import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import RadioButton from '../../../../components/inputs/basic/Radio';
import { PaymentLineSchema } from '../../schema/payment';
import { GridWrapper } from '../../styles';
import AmountLabel from './AmountLabel';

const PaymentLine = ({ payment, updateAmountPaying }) => {
  const [isFullPayment, setIsFullPayment] = useState(true);
  const [amountDue] = useState(payment.paymentInfo.balance);
  const [amountPaying, setAmountPaying] = useState(payment.paymentInfo.balance);
  const [balanceDue, setBalanceDue] = useState(0);

  const handleUpdate = () => {
    const paying = { ...payment };
    console.debug({ paying });
    if (amountPaying) {
      toast.info('Please enter an amount as part payment');
      return;
    }

    if (!isFullPayment) {
      const payObj = {
        amount: amountPaying,
        mode: 'Part',
        date: new Date().toLocaleString(),
      };
      paying.proposedpayment = {
        balance: 0,
        paidup: +paying.paymentInfo.paidup + +payObj.amount,
        amount: payObj.amount,
      };
    } else {
      const payObj = {
        amount: paying.paymentInfo.balance,
        mode: 'Full',
        date: new Date().toLocaleString(),
      };
      paying.proposedpayment = {
        balance: +paying.paymentInfo.balance - +payObj.amount,
        paidup: +paying.paymentInfo.paidup + +payObj.amount,
        amount: payObj.amount,
      };
      paying.paymentInfo.paymentDetails.push(payObj);
    }
    setBalanceDue(amountDue - amountPaying);
    updateAmountPaying(paying);
    toast.success('Part payment updated successfully');
  };

  useEffect(() => {
    handleUpdate();
  }, []);

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
            setIsFullPayment(e.target.value === 'Full');
          }}
          defaultValue={isFullPayment ? 'Full' : 'Part'}
        />
        {!isFullPayment && (
          <>
            <div>
              <Input type="number" value={amountPaying} onChange={(e) => setAmountPaying(+e.target.value)} />
            </div>
            <div>
              <AmountLabel>paid up {amountPaying}</AmountLabel>
            </div>
            <div>
              <AmountLabel>Balance Due {balanceDue}</AmountLabel>
            </div>
          </>
        )}
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </GridWrapper>
  );
};

export default PaymentLine;
