import React from 'react';
import { ButtonGroup } from '../../../../styles/global';

import Button from '../../../buttons/Button';
import { EmployeeSchema } from '../../schema/ModelSchema';
import {
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  handleDelete: (_event) => void;
  row?: any;
}

const EmployeeDetails: React.FC<Props> = ({
  editBtnClicked,
  row,
  backClick,
  handleDelete,
}) => (
  <PageWrapper>
    <GrayWrapper>
      <HeadWrapper>
        <div>
          <h2>Employee Details</h2>
          <span>Below are your employee’s details</span>
        </div>
        <ButtonGroup>
          <Button
            label="Back to List"
            background="#fdfdfd"
            color="#333"
            onClick={backClick}
          />
          <Button
            label="Delete"
            background="#FFE9E9"
            color="#ED0423"
            showicon
            icon="bi bi-pen-fill"
            onClick={handleDelete}
          />
          <Button
            label="Edit Details"
            background="#ECF3FF"
            color="#0364FF"
            showicon
            icon="bi bi-pen-fill"
            onClick={editBtnClicked}
          />
        </ButtonGroup>
      </HeadWrapper>
      <FullDetailsWrapper>
        <GridWrapper>
          {EmployeeSchema.map((schema) => (
            <div>
              <label>{schema.name}</label>
              <p>{schema.selector(row)}</p>
            </div>
          ))}
        </GridWrapper>
      </FullDetailsWrapper>
    </GrayWrapper>
  </PageWrapper>
);

export default EmployeeDetails;
