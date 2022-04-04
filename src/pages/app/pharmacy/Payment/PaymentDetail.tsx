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
import AmountLabel from './AmountLabel';
import PaymentLine from './PaymentLine';
import { subwalletQuery } from './query';

const getAmt = (obj) =>
  obj.isFullPayment ? obj.partPay : obj.billing_status === 'Unpaid' ? obj.serviceInfo.amount : obj.paymentInfo.balance;

const PaymentDetails = ({ selectedPayments, row, backClick, onSubmit: _ }) => {
  const { find: querySubwallet, user } = useRepository(Models.SUBWALLET);
  const { submit: submitPayment } = useRepository(Models.SUBWALLETTX);
  const { submit: payForService } = useRepository(Models.INVOICE);
  const [totalAmountPaying, setTotalAmountPaying] = useState(0);
  const [totalAmountDue, setTotalAmountDue] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0.0);
  const { handleSubmit, control } = useForm();
  const [paymentItems, setPaymentItems] = useState(selectedPayments);
  const clientName = row.participantInfo.client.firstname + ' ' + row.participantInfo.client.lastname;

  const acceptPayment = (data) => {
    let confirm = window.confirm(`Are you sure you want to accept N ${data.amount} from ${clientName}`);
    if (!confirm) return;
    const amountPaid = +data.amount;

    const paymentObject = {
      client: row.participantInfo.clientId,
      organization: user.currentEmployee.facilityDetail._id,
      amount: amountPaid,
      toName: user.currentEmployee.facilityDetail.facilityName,
      fromName: clientName,
      description: data.description,
      category: 'credit',
      createdby: user._id,
      paymentmode: data.paymentmode,
      facility: user.currentEmployee.facilityDetail._id,
      type: 'Deposit',
    };
    submitPayment(paymentObject);
  };

  const submitServicePayment = () => {
    const remBalance = walletBalance - totalAmountPaying;

    if (totalAmountPaying > walletBalance) {
      toast.error(
        'Total amount due greater than money received. Kindly top up account or reduce number of bills to be paid'
      );
      return;
    }

    if (paymentItems.find((value) => value <= 0)) {
      toast.error('one or more bills do not have a payment method selected');
      return;
    }

    paymentItems.forEach((obj) => {
      if (obj.isFullPayment) {
        const payObj = {
          amount: obj.proposedpayment.amount,
          mode: 'Full',
          date: new Date().toLocaleString(),
        };
        obj.paymentInfo.paymentDetails.push(payObj);
      } else {
        const payObj = {
          amount: obj.proposedpayment.amount,
          mode: 'Part',
          date: new Date().toLocaleString(),
        };
        obj.paymentInfo.paymentDetails.push(payObj);
      }
    });

    paymentItems.forEach((obj) => {
      obj.paymentInfo.balance = obj.proposedpayment.balance;
      obj.paymentInfo.paidup = obj.proposedpayment.paidup;
      obj.paymentInfo.amountpaid = obj.proposedpayment.amount;

      if (obj.paymentInfo.balance === 0) {
        obj.billing_status = 'Fully Paid';
      } else {
        obj.billing_status = 'Part Payment';
      }
      obj.checked = false;
      delete obj.proposedpayment;
      delete obj.partPay;
    });

    const paymentObj = {
      clientId: row.participantInfo.clientId,
      clientName,
      client: row.participantInfo.client,
      facilityId: user.currentEmployee.facilityDetail._id,
      totalamount: totalAmountPaying,
      createdby: user._id,
      status: remBalance === 0 ? 'Fully Paid' : 'Part Payment',
      balance: remBalance,
      bills: paymentItems,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
    };
    console.debug({ paymentObj });
    paymentObj;
    payForService;

    // payForService(paymentObj);
    //   .then(() => {})

    //   .then(() => {
    //     setBalance(remBalance);
    //   })
    //   .catch(console.error);

    // else {
    // }
  };

  useEffect(() => {
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
              <AmountLabel>Balance ₦ {walletBalance}</AmountLabel>
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
              <AmountLabel>Total Amount Due {totalAmountDue}</AmountLabel>
            </div>
            <div>
              <AmountLabel>Amount due after payment ₦ {totalAmountDue - totalAmountPaying}</AmountLabel>
            </div>
          </HeadWrapper>

          {selectedPayments.map((payment, i) => (
            <PaymentLine
              payment={payment}
              updateAmountPaying={(payment) => {
                const newPaymentItems = [...paymentItems];
                paymentItems[i] = payment;
                setPaymentItems(newPaymentItems);
                setTotalAmountPaying(sumBy(newPaymentItems, getAmt));
              }}
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
