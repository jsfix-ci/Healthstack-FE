import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../components/app/admin/AdminDashboard';
import AppBands from '../components/app/admin/Bands';
import AppEmployees from '../components/app/admin/Employees';
import AppLocation from '../components/app/admin/Locations';
import Appointments from '../components/app/clients/Appointments';
import Clients from '../components/app/clients/Clients';
import AppointmentDetails from '../components/app/clients/details/AppointmentDetails';
import ClientDetails from '../components/app/clients/details/ClientDetails';
import SingleClient from '../components/app/clients/details/SingleClient';
import ClientQuickForm from '../components/app/clients/forms/ClientQuickForm';
import Overview from '../components/app/Overview';
import Login from '../pages/auth';
import IndividualSignup from '../pages/auth/IndividualSignup';
import Signup from '../pages/auth/Signup';
import Dashboard from '../pages/Dashboard';
const Details = () => {
  return <h1>Details</h1>;
};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signupindividual' element={<IndividualSignup />} />
        <Route path='/app' element={<Dashboard />}>
          <Route index element={<Overview />} />
          <Route path='/app/clients' element={<Clients />} />
          <Route path='/app/clients/:id' element={<ClientDetails />} />
          <Route path='/app/clients/appointments' element={<Appointments />} />

          <Route path='/app/clients/appointments/:id' element={<AppointmentDetails />} />
          <Route path='/app/admin' element={<AdminDashboard />} />
          <Route path='/app/admin/bands' element={<AppBands />} />
          <Route path='/app/admin/employees' element={<AppEmployees />} />
          <Route path='/app/admin/location' element={<AppLocation />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
