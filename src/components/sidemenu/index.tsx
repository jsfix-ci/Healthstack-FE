import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuItem from '../menuitem';
import { Lists } from '../menuitem/style';
import { MainMenu, Sidemenu, TopSection } from './styles';

export const menuItems = [
  {
    name: 'Overview',
    exact: true,
    to: '/app',
    iconClassName: 'bi bi-house-door',
  },
  {
    name: 'Client',
    exact: true,
    to: '/app/clients',
    iconClassName: 'bi bi-people',
    subMenus: [
      { name: 'Appointment', to: '/app/clients/appointments' },
      { name: 'Client', to: '/app/clients/clients' },
      { name: 'Encounter', to: '/app/clients/encounter' },
      { name: 'Clinic Reports', to: '/app/clients/clinicreports' },
    ],
  },
  {
    name: 'Clinic',
    exact: true,
    to: '/app/clinic',
    iconClassName: 'bi bi-file-medical',
    subMenus: [
      { name: 'Appointment', to: '/app/clinic/appointments' },
      { name: 'Clinics', to: '/app/clinic/clinics' },
      { name: 'Clinic Setup', to: '/app/clinic/clinicsetup' },
      { name: 'Clinic Store', to: '/app/clinic/clinicstore' },
      { name: 'Clinic Reports', to: '/app/clinic/clinicreports' },
      { name: 'Encounters', to: '/app/clinic/encounter' },
      { name: 'Patients', to: '/app/clinic/patients' },
    ],
  },
  {
    name: 'Pharmacy',
    exact: true,
    to: '/app/pharmacy',
    iconClassName: 'bi bi-file-medical',
    subMenus: [
      { name: 'Bill client', to: '/app/pharmacy/billclient' },
      { name: 'Bill Prescription Sent', to: '/app/pharmacy/billsent' },
      { name: 'Payment', to: '/app/pharmacy/payment' },
      { name: 'dispensory', to: '/app/pharmacy/dispensory' },
      { name: 'Store Inventory', to: '/app/pharmacy/inventory' },
      { name: 'Product Entry', to: '/app/pharmacy/productentry' },
      { name: 'POS', to: '/app/pharmacy/pos' },
    ],
  },
  {
    name: 'Accounts',
    exact: true,
    to: '/app/accounts',
    iconClassName: 'bi bi-file-medical',
    subMenus: [
      { name: 'Accounts', to: '/app/accounts' },
      { name: 'Payments', to: '/app/accounts/payments' },
      { name: 'Expenses', to: '/app/accounts/expenses' },
      { name: 'Reports', to: '/app/accounts/reports' },
      { name: 'Journals', to: '/app/accounts/journals' },
      { name: 'Ledgers', to: '/app/accounts/ledgers' },
      { name: 'Charts Account', to: '/app/accounts/chartsaccount' },
    ],
  },
  {
    name: 'Epidemology',
    exact: true,
    to: '/app/epid',
    iconClassName: 'bi bi-file-medical',
    subMenus: [
      { name: 'Epid', to: '/app/epid' },
      { name: 'Map', to: '/app/epid/map' },
      { name: 'Dashboard', to: '/app/epid/dashboard' },
      { name: 'Definations', to: '/app/epid/definitions' },
      { name: 'Communications', to: '/app/epid/communication' },
      { name: 'Signals', to: '/app/epid/signals' },
    ],
  },
  {
    name: 'Laboratory',
    exact: true,
    to: '/app/laboratory',
    iconClassName: 'bi bi-binoculars',
    subMenus: [
      { name: 'Bill client', to: '/app/laboratory/billclient' },
      { name: 'Bill Lab Orders Sent', to: '/app/laboratory/billlabsent' },
      { name: 'Payment', to: '/app/laboratory/payment' },
      { name: 'Lab Result', to: '/app/laboratory/result' },
    ],
  },
  {
    name: 'Managed Care',
    exact: true,
    to: '/app/managedCare',
    iconClassName: 'bi bi-alarm',
    subMenus: [
      { name: 'Claim Payment', to: '/app/managedCare/claimpayment' },
      { name: 'Claims', to: '/app/managedCare/claims' },
      { name: 'Referrals', to: '/app/managedCare/referrals' },
      { name: 'Check In', to: '/app/managedCare/checkin' },
      { name: 'Preauthorization', to: '/app/managedCare/preauthorization' },
      { name: 'Beneficiaries', to: '/app/managedCare/beneficiaries' },
      { name: 'Organizations', to: '/app/managedCare/organization' },
      { name: 'Tarrif', to: '/app/managedCare/tarrif' },
    ],
  },
  {
    name: 'Finance',
    exact: true,
    to: '/app/finance',
    iconClassName: 'bi bi-cash',
    subMenus: [
      { name: 'Bill Services', to: '/app/finance/billservices' },
      { name: 'Payment', to: '/app/finance/payment' },
      { name: 'Revenue', to: '/app/finance/revenue' },
      { name: 'Collections', to: '/app/finance/collections' },
      { name: 'Services', to: '/app/finance/services' },
      { name: 'HMO Authorization', to: '/app/finance/hmoauthorization' },
    ],
  },
  {
    name: 'Epidemiology',
    exact: true,
    to: '/',
    iconClassName: 'bi bi-bezier',
    subMenus: [
      { name: 'Case Definition', to: '/app/epidemiology/case-definition' },
      { name: 'Signals', to: '/app/epidemiology/signal' },
    ],
  },
  {
    name: 'Admin',
    exact: true,
    to: '/app/admin',
    iconClassName: 'bi bi-person',
    subMenus: [
      { name: 'Bands', to: '/app/admin/bands' },
      { name: 'Employees', to: '/app/admin/employees' },
      { name: 'Location', to: '/app/admin/location' },
      { name: 'Care Team', to: '/app/admin/careteam' },
      { name: 'Departments', to: '/app/admin/department' },
      { name: 'Department Units', to: '/app/admin/dept-unit' },
      { name: 'Facilities', to: '/app/admin/facility' },
      { name: 'HS Modules', to: '/app/admin/hsmodules' },
      { name: 'Roster', to: '/app/admin/roaster' },
      { name: 'Workspace', to: '/app/admin/workspace' },
      { name: 'Clinic Setup', to: '/app/admin/clinicsetup' },
    ],
  },
  {
    name: 'Communication',
    exact: true,
    to: '/app/communication',
    iconClassName: 'bi bi-rss',
    subMenus: [
      { name: 'Channel', to: '/app/communication/channel' },
      { name: 'Questionnaires', to: '/app/communication/questionnaires' },
      { name: 'Configuration', to: '/app/communication/configuration' },
      { name: 'Submissions', to: '/app/communication/submissions' },
    ],
  },
  {
    name: 'Logout',
    exact: true,
    to: '/',
    action: () => {
      localStorage.setItem('user', '');
    },
    iconClassName: 'bi bi-box-arrow-right',
  },
];

function SideMenu({ isOpen }) {
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
}

export default SideMenu;
