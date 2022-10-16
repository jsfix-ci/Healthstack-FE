import { Box } from '@mui/material';
import React, { useState } from 'react';
import { InputBox, InputField, InputLabel } from '../styles';

interface PasswordInputProps {
  label?: string;
  name?: string;
  // password?: string;
  // showPassword?: boolean;
  onChange?: () => void;
  errors?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label = 'Password',
  name,
  onChange,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <InputBox>
        <InputField
          className='form__input'
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
          // placeholder='Password'
          name={name}
        />
        <InputLabel className='form__label' htmlFor={label}>
          {label}
        </InputLabel>
        <span onClick={handleClickShowPassword}>
          {showPassword ? (
            <i className='bi bi-eye-slash-fill'></i>
          ) : (
            <i className={' bi bi-eye-fill'}></i>
          )}
        </span>
      </InputBox>

      {errors && <p>e{errors}</p>}
    </Box>
  );
};

export default PasswordInput;
