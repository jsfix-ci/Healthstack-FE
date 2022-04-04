import React from 'react';

import Button from '../../../../components/buttons/Button';
import { ButtonGroup } from '../../../../ui/styled/global';
import { BillServiceSchema } from '../../schema/pharmacy';
import { FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

const BillDetails = ({ editBtnClicked, row, backClick, deleteBtnClicked }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Bill Details</h2>
            <span>Below are your Bill’s details</span>
          </div>
          <ButtonGroup>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
            <Button label={'Delete'} background={'#ff0000'} color={'#fff'} onClick={() => deleteBtnClicked(row._id)} />
            <Button label={'Edit Details'} background={'#04ed7c'} color={'#fff'} onClick={editBtnClicked} />
          </ButtonGroup>
        </HeadWrapper>
        <FullDetailsWrapper>
          <GridWrapper>
            {BillServiceSchema.map((schema) => (
              <div key={schema.key}>
                <label>{schema.name}</label>
                <p>{schema.selector(row)}</p>
              </div>
            ))}
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BillDetails;
