import React from 'react';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import { ButtonGroup } from '../../../../ui/styled/global';
import {
  FullDetailsWrapper,
  GrayWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import { ServicesSchema } from '../schema';

const ServiceDetails = ({ editBtnClicked, row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Bill Details</h2>
            <span>Below are your Bill’s details</span>
          </div>
          <ButtonGroup>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
            <Button
              label={'Delete'}
              background="#FFE9E9"
              color="#ED0423"
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={editBtnClicked}
            />
          </ButtonGroup>
        </HeadWrapper>
        <FullDetailsWrapper>
          <CustomTable
            title={`Bills for ${row.clientname}`}
            columns={ServicesSchema}
            data={row.services}
            pointerOnHover
            highlightOnHover
            striped
          />
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ServiceDetails;
