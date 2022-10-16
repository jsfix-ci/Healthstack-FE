import { Box } from '@mui/material';
import React, { TextareaHTMLAttributes, useRef } from 'react';
import { TextareaField } from '../styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errorText?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => (
  <Box>
    <label>{label}</label>
    <TextareaField ref={useRef()} {...props} />
  </Box>
);

export default Textarea;
