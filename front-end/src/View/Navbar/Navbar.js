import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import axios from 'axios';
import Admin from '../Admin/AdminUI/Admin';
import Profile from '../Profile/Profile';
import AllNotification from '../Notification/AllNotification';
import { AiOutlineHome } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { IoAlertOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Home from '../Home/Home';



function Navbar() {

    const navigate = useNavigate();
    const isLogout =true;
    const token = JSON.parse(sessionStorage.getItem('token'));
    const [isAdmin, setIsAdmin] = useState(false);
    const [active, setActive] = useState(0);


  let menumask
  let logoutModel

  const handleLogout = ()=>{
    sessionStorage.removeItem('token');
    setActive(0);
    navigate('/');
  }
  
  useEffect(() => {
    async function fetchData() {
      try {
        await axios.post('http://localhost:3001/user/isAdmin', {
          token: token
        }).then((res)=>{
          if(res.data.message==='Admin')
            setIsAdmin(true)
        })
      } catch (error) {
        console.error('Error fetching Count data:', error);
      } 
    }
      fetchData();
  }, [token]);



  if(isLogout)
  {
    logoutModel =<div className='logout'>
      <div className='logoutContainer drop-down'>
        <div className='message'>
          <IoAlertOutline size='100px'/>
          <h2>Are you sure to Logout</h2>
        </div>
        <div className='button-container'>
          <button onClick={handleLogout}>Confirm</button>
          <button onClick={()=> setActive(0)}>Cancel</button>
        </div>
      </div>
    </div>
    menumask= <div className='menuMask' onClick={()=> setActive(0)}></div>
  }
  const Menus = [
    { name: "Home", icon: <AiOutlineHome size="40px" /> },
    { name: "Admin", icon: <MdOutlineAdminPanelSettings size="40px" /> },
    { name: "Profile", icon: <BsPerson size="40px"/> },
    { name: "Message", icon: <IoMdNotificationsOutline size="40px"/> },
    { name: "Logout", icon: <IoLogOutOutline size="40px"/> },
  ];

  return (
    <div>
      {token&&<div>
        <div className={'navContainer drop-down from-red-600'}>
              <div className='beforeLogo'>
              </div>
              <div className='logo'>
                <div className='title'>Sri Balaji</div>
              </div>
              <div className='afterLogo'>
                {Menus.map((menu, i) => (
                  ((i===1 &&isAdmin)||i!==1)&&
                  <div key={i} 
                    className={`item duration-500 ${
                      i === active && "nav-active"
                    }`}
                    onClick={() => setActive(i)}
                  >
                        {menu.icon}
                        <p>
                        {menu.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </div>}
      {active === 0 && <Home />}
      {active === 1 && <Admin />}
      {active === 2 && <Profile />}
      {active === 3 && <AllNotification />}
      {active === 4 && logoutModel}
      {active === 4 && menumask}
    </div>
  )
}

export default Navbar