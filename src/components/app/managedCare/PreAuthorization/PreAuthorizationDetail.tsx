import React from 'react';
import DataTable from 'react-data-table-component';

import AccordionBox from '../../../accordion';
import Button from '../../../buttons/Button';
import CustomTable from '../../../customtable';
import {
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import { columnHead } from './data';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const PreAuthorzationDetails: React.FC<Props> = ({ row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>PreAuthorzation Details</h2>
            <span>Below are your PreAuthorzation’s details</span>
          </div>
          <div>
            <Button
              label='Back to List'
              background='#fdfdfd'
              color='#333'
              onClick={backClick}
            />
            <label
              style={{
                padding: '14px 20px',
                background: '#b3ffed',
                color: '#062e12',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Current Balance {row.amount}
            </label>
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <GridWrapper className='two-columns'>
            <AccordionBox defaultExpanded={true} title='Credit'>
              <CustomTable
                data={row.credit}
                columns={columnHead}
                title='Credit'
                pointerOnHover
                highlightOnHover
                striped
              />
            </AccordionBox>
            <AccordionBox defaultExpanded={true} title='Debit'>
              <CustomTable
                data={row.debit}
                columns={columnHead}
                title='Debit'
                pointerOnHover
                highlightOnHover
                striped
              />
            </AccordionBox>
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default PreAuthorzationDetails;