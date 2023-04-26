
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Components/Pages/Login';
import EmployeeList from './Components/Empolyee/EmployeeList';
import Dashboard from './Components/Pages/Dashboard';
import TicketList from './Components/Tickets/TicketList';
import Sidebar from './Components/Sidebar/Sidebar';
import NewTicket from './Components/Tickets/NewTicket';
import UpdateTicket from './Components/Tickets/UpdateTicket';
import Users from './Components/Pages/Users';
import ForgotPassword from './Components/Pages/ForgotPassword';
import VIewTickets from './Components/Tickets/VIewTickets';
import ResetPassword from './Components/Pages/ResetPassword';
import Verification from './Components/Pages/Verification';
import DeleteTicket from './Components/Tickets/DeleteTicket';
import NewEmployee from './Components/Empolyee/NewEmployee';
import UpdateEmployee from './Components/Empolyee/UpdateEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Sidebar' element={<Sidebar />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/Users' element={<Users />}/>
        <Route path='/Dashboard' element={<Dashboard />}/>
        <Route path='/EmployeeList' element={<EmployeeList />}/>
        <Route path='/TicketList' element={<TicketList />}/>
        <Route path='/NewTicket' element={<NewTicket />}/>
        <Route path='/UpdateTicket' element={<UpdateTicket />}/>
        <Route path='/ForgotPassword' element={<ForgotPassword />}/>
        <Route path='/ResetPassword' element={<ResetPassword />}/>
        <Route path='/VIewTickets' element={<VIewTickets />}/>
        <Route path='/Verification' element={<Verification />}/>
        <Route path='/DeleteTicket' element={<DeleteTicket />}/>
        <Route path='/NewEmployee' element={<NewEmployee />}/>
        <Route path='/UpdateEmployee' element={<UpdateEmployee />}/>
      
      </Routes>
    </Router>
  );
}

export default App;
