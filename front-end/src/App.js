import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './View/Login/Login';
import Home from './View/Home/Home';
import Profile from './View/Profile/Profile';
import Admin from './View/Admin/AdminUI/Admin';
import History from './View/History/History';
import Signin from './View/Signin/Signin';
import Notification from './View/Notification/Notification';
import AllNotification from './View/Notification/AllNotification';
import Bill from './View/Admin/Bill/Bill';
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// function Protected({children }){
//   const [isAdmin, setIsAdmin] = useState(false); 

//   useEffect(()=>{
//   const fetch= ()=>{
//     const token = JSON.parse(sessionStorage.getItem('token'));
//     if(token)
//     {
//       axios.post('http://localhost:3001/user/authAdmin', {token}).then((res)=>{
//         if(res.data.message===true)
//         {
//           setIsAdmin(true);
//         }
//       })
//       .catch((er)=>{
//         console.log(er)
//       })
//     }
//   }
//   }, [])

//   console.log(isAdmin);

//   if(isAdmin)
//     return children
//   else
//     return <Navigate to='/' replace />

// }

function App() {

  return (
      <div className='appContainer'>
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
            {/* <Route 
              path='/admin' 
              element={ 
                <Protected>
                  <Admin/> 
                </Protected>
                } 
              /> */}


          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
