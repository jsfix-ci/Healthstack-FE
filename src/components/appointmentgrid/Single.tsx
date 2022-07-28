import React from 'react';
import { SingleBox } from '../../ui/styled/global';

interface SingleProps {
  status?: string;
}

const Single: React.FC<SingleProps> = ({ status }) => {
  return <SingleBox className={`${status}`}></SingleBox>;
};

export default Single;
