import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { LayoutContent, LayoutWrapper } from '../../components/layout/styles';
import SideMenu from '../../components/sidemenu';
import TopMenu from '../../components/topmenu';
import { UserContext } from '../../context/context';

interface Props {
  children?: React.ReactNode;
}

const Dashboard: React.FC<Props> = ({ children }) => {
  const { locationType } = useContext(UserContext);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
    document.title = 'Health Stack - Dashboard';
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <LayoutWrapper>
      <SideMenu isOpen={isOpen} />
      <LayoutContent>
        {/* {locationType && (
          <TopMenu isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
        )} */}

        <TopMenu isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
        <div className='layout__content-main'>
          {children}
          <Outlet />
        </div>
      </LayoutContent>
    </LayoutWrapper>
  );
};

export default Dashboard;
