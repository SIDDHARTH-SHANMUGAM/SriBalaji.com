import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Login.css';

function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:3001/user/login", {
        mobile, password
      })
      .then(res=>{
        if(res.data.message==="Exist"){
          sessionStorage.setItem('token', JSON.stringify(res.data.token))
          navigate('/');
        }
        else if(res.data.message==="Mobile Not Exist")
        {
          setError("Mobile Number Not Exist, Make sure Correct Mobile Number");
        }
        else if(res.data.message==="Password is Wrong")
        {
          setError("Password is Wrong");
        }
      })
      .catch(e =>{
        setError(e.toString())
      })
    }
    catch(e){
    }
  };

  const check = (val)=>{
    if(!val)
    {
      setError("");
    }
    else if(val.match('[^0-9]'))
    {
      setError("Mobile number must be in numbers");
    }
    else if(val.length!==10)
    {
      setError("Mobile Number should be in 10 digits")
    }
    else
    {
      setError("");
    }
  }
    
  return (
      <form onSubmit={handleLogin} className='drop-left' >
            <div className='title'>
              Enter Login Credentials
            </div>
            <div className='input-box'>
              <input
                type="text"
                value={mobile}
                onChange={(e) => {setMobile(e.target.value); check(e.target.value)}}
                required
              />
              <span>Mobile</span>
            </div>
            <div className='input-box'>
              <input
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value); setError('')}}
                required
              />
              <span>Password</span>
            </div>
            <div className='button-container'>
              <button className={'buttonNotActive'} type="submit">Log In</button>
            </div>
            {
              error&&
              <div className='error-container drop-right'>
                <img src='/illustrations/char.svg' alt=''/>
                {error}
              </div>
            }
      </form>
  );
}


export default Login;