import React from 'react';
import { SearchBox } from '../../core-ui/styles';
import Input from './Input';

interface Props {
  onChange?: (e: any) => void;
  className?: string;
  label?: string;
  placeholder?: string;
}

const SearchInput: React.FC<Props> = ({
  onChange,
  label,
  className,
  placeholder,
}) => {
  return (
    <SearchBox className={className}>
      <Input type='text' placeholder={placeholder} label={label} />
      <i className='bi bi-search'></i>
    </SearchBox>
  );
};

export default SearchInput;
