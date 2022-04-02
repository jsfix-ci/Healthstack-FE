import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import useRepository from '../../../../components/hooks';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { Models } from '../../Constants';
import { BillCreateDetailSchema, BillServiceCreateSchema, Schema } from '../../schema';
import { BottomWrapper, DetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

const BillClientCreate = ({ backClick, onSubmit: _ }) => {
  const { submit: submitBill, user } = useRepository(Models.BILLCREATE);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      client: '',
    },
  });

  const [clientBills, setClientBills] = useState([]);

  const addNewBill = (data) => {
    setClientBills([...clientBills, data]);
  };
  const createBill = () => {
    let serviceList = [];
    let document: any = {};
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName;
      document.documentdetail = clientBills;
      clientBills.forEach((element) => {
        document.clientname = element.clientId.firstname + ' ' + ' ' + element.clientId.lastname;
        document.clientobj = element.clientId;
        document.createdBy = user._id;
        document.createdByname = user.firstname + ' ' + user.lastname;
      });
    }

    document.documentdetail.forEach((element) => {
      let orderinfo = {
        documentationId: '',
        order_category: element.inventoryId.category,
        order: element.name,
        instruction: '',
        destination_name: document.facilityname,
        destination: document.facility,
        order_status: 'Billed',

        clientId: element.client,
        clientobj: element.clientId,
        client: element.clientId.clientId,

        order_action: [],
        medication_action: [],
        treatment_action: [],
      };

      let billInfo = {
        orderInfo: {
          orderId: '', //tbf
          orderObj: orderinfo,
        },
        serviceInfo: {
          price: element.sellingprice,
          quantity: element.quantity,
          productId: element.productId,
          name: element.name,
          baseunit: element.baseunit,
          amount: element.amount,
          billingId: element.billingId,
          billingContract: element.billingContract,
          createdby: user._id,
        },
        paymentInfo: {
          amountDue: element.Amount,
          paidup: 0,
          balance: element.Amount,
          paymentDetails: [],
        },
        participantInfo: {
          billingFacility: orderinfo.destination,
          billingFacilityName: orderinfo.destination_name,
          locationId: document.locationId, //selected location,
          clientId: orderinfo.clientId,
          client: orderinfo.client,
          paymentmode: element.billMode,
        },
        createdBy: user._id,
        billing_status: 'Unpaid',
      };
      let items = {
        orderinfo,
        billInfo,
      };

      serviceList.push(items);
    });

    submitBill({
      document,
      serviceList,
      clientBills,
    })
      .then((res) => console.debug(res))
      .catch((err) => console.error(err));
  };

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
        <form onSubmit={handleSubmit(addNewBill)}>
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
          <CustomTable
            title="Service Items"
            columns={BillCreateDetailSchema}
            data={clientBills}
            pointerOnHover
            highlightOnHover
            striped
          />
          <button
            style={{
              borderRadius: '32px',
              background: '#0000FF',
              border: 'none',
              color: '#fff',
              width: '44px',
              height: '44px',
            }}
            type="submit"
          >
            +
          </button>
        </form>
        <BottomWrapper>
          <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
          <Button label="Save Form" onClick={createBill} />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BillClientCreate;
