import React, { useState } from 'react';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import { ClientSearch } from './N';

import CustomSelect from '../../../inputs/basic/Select';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  backClick: () => void;
  getSearchFacility: (_event , clear) => void;
  success: any,
  date:any,
  invoice:any
}

const BillCreate: React.FC<Props> = ({ backClick, getSearchFacility,success,date,invoice }) => {
  const [values, setValues] = useState({});

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Bill</h2>
            <span>
              Create a New Bill by filling out the form below to get started.
            </span>
          </div>
          <Button
            label="Back to List"
            background="#fdfdfd"
            color="#333"
            onClick={backClick}
          />
        </HeadWrapper>
        <form action="" onSubmit={() => {}}>
          <DetailsWrapper title="Create Bill Service" defaultExpanded={true}>
            <GridWrapper>
              <ClientSearch getSearchfacility={getSearchFacility} clear={success}/>
              <CustomSelect
                label="Choose a Billing Mode"
                name="billingMode"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
                options={['Mode 1', 'Mode 2']}
              />

              <Input
                name="datetime"
                
                value={date}
              />
              <Input
                label="INVOICE"
                name="InvoiceNumber"
                value={invoice}
              />

              <Input
                label="Choose a Service Item"
                name="chooseServiceItem"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </GridWrapper>
          </DetailsWrapper>

          <BottomWrapper>
            <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
            <Button label="Save Form" type="submit" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BillCreate;
