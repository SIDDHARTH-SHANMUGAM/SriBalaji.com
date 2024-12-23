import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import './Notification.css'

function AllNotification() {
  const token = JSON.parse(sessionStorage.getItem('token'));
  const [message, setMessage] = useState('');


  useEffect(() => {
      fetchData();
  },[]);

  async function fetchData() {
    try {
      const res = await axios.post('http://localhost:3001/msg/getMessage', { token });
      if(res.data.message==='got')
      {
        setMessage(res.data.msgs)
      }
    } catch (error) {
      console.error('Error fetching Message data:', error);
    } 

    try{
        await axios.post('http://localhost:3001/msg/updateSeen', { token });
      }
      catch(e)
      {
        console.log(e);
      }

  }
  // async function markAsRead (){

  // }
  return (
    <div className='messageContainer'>
      <div className='flex'>
        {
          message&&message.map((msg) => (
            <Msg key={msg._id} msg={msg} />
          ))
        }
        
      </div>
    </div>
  )
}

function Msg ({msg}){
  return (
    <div className='space drop-left'>
      <div className='msgContainer'>
        <img src='/svg/sbLogo.svg'></img>
        <p>{msg.message}</p>
      </div>
    </div>
  )
}

export default AllNotification
