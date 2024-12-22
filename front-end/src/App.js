import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './View/Login/Login';
import Home from './View/Home/Home';
import Profile from './View/Profile/Profile';
import Admin from './View/Admin/AdminUI/Admin';
import History from './View/History/History';
import Signin from './View/Signin/Signin';
import Notification from './View/Notification/Notification';
import AllNotification from './View/Notification/AllNotification';
import PageNotFound from './View/PageNotFound/PageNotFound';
import Bill from './View/Admin/Bill/Bill';

function App() {

  return (
      <div className='app-container'>
        
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Home/> } />
            <Route path='/login' element={<Login/>} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/profile' element={ <Profile/> } />
            <Route path='/bill' element={ <Bill/> } />
            <Route path='/history' element={ <History/> } />
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
