import sumBy from 'lodash/sumBy';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '../../../../components/buttons/Button';
import useRepository from '../../../../components/hooks/repository';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { Models } from '../../Constants';
import { PaymentWalletSchema } from '../../schema/payment';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';
import PaymentLine from './PaymentLine';
import { subwalletQuery } from './query';

const PaymentDetails = ({ selectedPayments, row, backClick, onSubmit: _ }) => {
  const { find: querySubwallet, user } = useRepository(Models.SUBWALLET);
  const { submit: submitPayment } = useRepository(Models.SUBWALLETTX);
  const { submit: payForService } = useRepository(Models.INVOICE);
  const [totalAmountPaying, setTotalAmountPaying] = useState(0);
  const [totalAmountDue, setTotalAmountDue] = useState(0);
  const [source, setSource] = useState('');
  const [walletBalance, setWalletBalance] = useState(0.0);
  const { handleSubmit, control } = useForm();

  const acceptPayment = (data) => {
    const amountPaid = +data.amount;

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
    console.debug({ paymentObject });
    submitPayment;
    payForService;
    // submitPayment(paymentObject)
    //   .then(() => setBalance(balance + amountPaid))
    //   .catch(console.error);
  };

  const submitServicePayment = () => {
    const remBalance = walletBalance - totalAmountPaying;

    if (totalAmountPaying > walletBalance) {
      toast.warning(
        'Total amount due greater than money received. Kindly top up account or reduce number of bills to be paid'
      );

      return;
    }

    const paymentObj = {
      clientId: row.participantInfo.clientId,
      clientName: source,
      client: row.participantInfo.client,
      facilityId: user.currentEmployee.facilityDetail._id,
      totalamount: totalAmountPaying,
      createdby: user._id,
      status: remBalance === 0 ? 'Fully Paid' : 'Part Payment',
      balance: remBalance,
      bills: [],
      facilityName: user.currentEmployee.facilityDetail.facilityName,
    };
    paymentObj;

    // payForService(paymentObj)
    //   .then(() => {})

    //   .then(() => {
    //     setBalance(remBalance);
    //   })
    //   .catch(console.error);

    // else {
    // }
  };

  useEffect(() => {
    setSource(row.participantInfo.client.firstname + ' ' + row.participantInfo.client.lastname);
    querySubwallet(subwalletQuery(user.currentEmployee.facility, row.participantInfo.clientId))
      .then((res: any) => {
        if (res.data.length > 0) {
          setWalletBalance(res.data[0].amount);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setTotalAmountDue(sumBy(selectedPayments, (obj: any) => obj.paymentInfo.amountDue));
  });

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
                Balance ₦ {walletBalance}
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
                Balance after payment ₦ {walletBalance - totalAmountPaying}
              </label>
            </div>
          </HeadWrapper>
          <form onSubmit={handleSubmit(acceptPayment)}>
            <GridWrapper>
              {PaymentWalletSchema.map((client, index) => (
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
                Total Amount Due {totalAmountDue}
              </label>
            </div>
          </HeadWrapper>

          {selectedPayments.map((payment) => (
            <PaymentLine
              payment={payment}
              updateAmountPaying={(amount) => setTotalAmountPaying(totalAmountPaying + amount)}
            />
          ))}
          <BottomWrapper>
            <Button label="Pay" onClick={submitServicePayment} />
          </BottomWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default PaymentDetails;
