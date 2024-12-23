import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './View/Admin/AdminUI/Admin';
import Notification from './View/Notification/Notification';
import AllNotification from './View/Notification/AllNotification';
import PageNotFound from './View/PageNotFound/PageNotFound';
import Bill from './View/Admin/Bill/Bill';
import Navbar from './View/Navbar/Navbar';

function App() {

  return (
      <div className='app-container'>
        
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Navbar/> } />
            <Route path='/bill' element={ <Bill/> } />
            <Route path='/notification' element={ <Notification/> } />
            <Route path='/allNotification' element={ <AllNotification/> } />
            <Route path='/admin' element={ <Admin/> } />
            <Route path="*" element={ <PageNotFound/> } />


          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
