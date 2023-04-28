
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Components/Pages/Login';
import Dashboard from './Components/Pages/Dashboard'
import Users from './Components/Pages/Users';
import ForgotPassword from './Components/Pages/ForgotPassword';
import ResetPassword from './Components/Pages/ResetPassword';
import Verification from './Components/Pages/Verification';
import Sidebar from './Components/Sidebar/Sidebar';

import ExportTicket from './Components/Tickets/ExportTicket';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Sidebar' element={<Sidebar />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/Users' element={<Users />}/>
        <Route path='/Dashboard' element={<Dashboard />}/>
        <Route path='/ForgotPassword' element={<ForgotPassword />}/>
        <Route path='/ResetPassword' element={<ResetPassword />}/>
        <Route path='/Verification' element={<Verification />}/>
        <Route path='/Sidebar' element={<Sidebar />}/>
        <Route path='/ExportTicket' element={<ExportTicket />}/>
      
      </Routes>
    </Router>
  );
}

export default App;
