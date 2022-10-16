import React from 'react';
import { AuthContainer, PageWrapper } from '../styles';
import Side from './Side';

interface AuthProps {
  paragraph?: string;
  children?: React.ReactNode;
}
const AuthWrapper: React.FC<AuthProps> = ({ paragraph, children }) => {
  return (
    <PageWrapper>
      <Side />
      <AuthContainer>
        <div className='aside-container'>
          <img src='/public/Healthstack.png' alt='' />
          <h2>Welcome to Healthstack</h2>
          <p>{paragraph}</p>
          <div className='aside-child'>{children}</div>
        </div>
      </AuthContainer>
    </PageWrapper>
  );
};

export default AuthWrapper;
