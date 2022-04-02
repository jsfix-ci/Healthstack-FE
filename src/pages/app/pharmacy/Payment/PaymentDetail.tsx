import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import useRepository from '../../../../components/hooks';
import Input from '../../../../components/inputs/basic/Input';
import RadioButton from '../../../../components/inputs/basic/Radio';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { Models } from '../../Constants';
import { PaymentDetailsSchema, PaymentSchema } from '../../schema/ModelSchema';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';
import { subwalletQuery } from './query';

const typeOptions = [
  {
    value: 'Full',
    label: 'full',
  },
  {
    value: 'Part',
    label: 'Part',
  },
];

const PaymentDetails = ({ row, backClick, onSubmit }) => {
  const { find: querySubwallet, user } = useRepository(Models.SUBWALLET);
  const { submit: submitPayment } = useRepository(Models.SUBWALLETTX);
  const { submit: payForService } = useRepository(Models.INVOICE);
  const [amount, setAmount] = useState(0);
  const [fName, setfName] = useState(0);
  const [paid, setPaid] = useState(0);
  const [source, setSource] = useState('');
  const [balance, setBalance] = useState(0.0);
  const [balanceDue, setBalanceDue] = useState(0);
  const { handleSubmit, control } = useForm();
  const [isFullPayment, setUpdate] = useState();

  const calcAmount = amount - fName;
  const paidUp = () => {
    setBalanceDue(calcAmount);
    setPaid(fName);
    setfName(0);
  };

  const acceptPayment = (data) => {
    const amountPaid = Number(data.amount);

    const paymentObject = {
      client: row.participantInfo.clientId,
      organization: user.currentEmployee.facilityDetail._id,
      amount: amountPaid,
      toName: user.currentEmployee.facilityDetail.facilityName,
      fromName: row.participantInfo.client.firstname + ' ' + row.participantInfo.client.lastname,
      description: data.description,
      category: 'credit',
      createdby: user._id,
      paymentmode: data.paymentmode,
      facility: user.currentEmployee.facilityDetail._id,
      type: 'Deposit',
    };
    submitPayment(paymentObject)
      .then(() => setBalance(balance + amountPaid))
      .catch(console.error);
  };

  const submitServicePayment = () => {
    const remBalance = balance - amount;
    if (isFullPayment !== 'Part') {
      const paymentObj = {
        clientId: row.participantInfo.clientId,
        clientName: source,
        client: row.participantInfo.client,
        facilityId: user.currentEmployee.facilityDetail._id,
        totalamount: amount,
        createdby: user._id,
        status: 'Fully Paid',
        balance: remBalance,
        facilityName: user.currentEmployee.facilityDetail.facilityName,
      };
      payForService(paymentObj)
        .then(() => {})

        .then(() => {
          setBalance(remBalance);
        })
        .catch(console.error);
    }
    // else {
    // }
  };

  useEffect(() => {
    setSource(row.participantInfo.client.firstname + ' ' + row.participantInfo.client.lastname);
    setAmount(row.paymentInfo.amountDue);
    querySubwallet(subwalletQuery(user.currentEmployee.facility, row.participantInfo.clientId))
      .then((res: any) => {
        if (res.data.length > 0) {
          setBalance(res.data[0].amount);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Payment Details</h2>
            <span>Below are your payment’s details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <HeadWrapper>
            <div>
              <h2>Make deposit for {row.orderInfo.orderObj.clientname}</h2>
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
                Balance ₦ {balance}
              </label>
            </div>
          </HeadWrapper>
          <form onSubmit={handleSubmit(acceptPayment)}>
            <GridWrapper>
              {PaymentDetailsSchema.map((client, index) => (
                <DynamicInput
                  key={index}
                  name={client.key}
                  control={control}
                  label={client.name}
                  inputType={client.inputType}
                  options={client.options}
                />
              ))}
            </GridWrapper>
            <BottomWrapper>
              <Button label="Accept Payment" type="submit" />
            </BottomWrapper>
          </form>
        </FullDetailsWrapper>

        <FullDetailsWrapper>
          <HeadWrapper>
            <div>
              <h2>Pay bills for {row.orderInfo.orderObj.clientname}</h2>
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
                Total Amount Due {amount}
              </label>
            </div>
          </HeadWrapper>

          <GridWrapper>
            {PaymentSchema.map((schema) => (
              <div>
                <label>{schema.name}</label>
                <p>{schema.selector(row)}</p>
              </div>
            ))}
            <div>
              <RadioButton title="Type" options={typeOptions} onChange={(e) => setUpdate(e.target.value)} />
              {isFullPayment === 'Part' && (
                <>
                  <div>
                    <Input name="paymentType" value={fName} onChange={(e) => setfName(Number(e.target.value))} />
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
                      paid up {paid}
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

              <Button onClick={paidUp}>Update</Button>
            </div>
          </GridWrapper>
          <BottomWrapper>
            <Button label="Pay" onClick={submitServicePayment} />
          </BottomWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default PaymentDetails;
