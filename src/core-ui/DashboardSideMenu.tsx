import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import MenuItem from './MenuItem';
import { Lists, MainMenu, Sidemenu, TopSection } from './styles';

interface DashboardSideMenuProps {
  isOpen?: boolean;
  menuItems: any[];
}

const DashboardSideMenu: React.FC<DashboardSideMenuProps> = ({
  isOpen,
  menuItems,
}) => {
  const [inactive, setInactive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (inactive) {
      document.querySelectorAll('.sub-menu');
    }
  }, [inactive]);

  const removeActiveClassFromSubMenu = () => {};

  useEffect(() => {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(el => {
      el.addEventListener('click', () => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach(el => el.classList.remove('active'));
        el.classList.toggle('active');

        if (next !== null) {
          next.classList.toggle('active');
        }
      });
    });
  }, []);

  return (
    <Sidemenu className={`side-menu ${!isOpen ? '' : 'hide'}`}>
      <TopSection>
        <h4>Our Hospital</h4>
      </TopSection>
      <MainMenu className='main-menu'>
        <Lists>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={() => {
                if (menuItem.action) {
                  menuItem.action();
                }
                if (menuItem.to && !menuItem.subMenus) {
                  navigate(menuItem.to);
                }
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </Lists>
      </MainMenu>
    </Sidemenu>
  );
};

export default DashboardSideMenu;
