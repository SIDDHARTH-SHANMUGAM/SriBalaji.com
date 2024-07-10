import React, { useState } from 'react';
import './Home.css';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';

function Home() {
  
  const token = JSON.parse(sessionStorage.getItem('token'));
  const navigate = useNavigate();
  const gotoLogin = ()=>{
    navigate('/login');
  }
  const [pic1, setPic1] = useState(true);
  const [pic2, setPic2] = useState(false);
  const [pic3, setPic3] = useState(false);
  const [pic4, setPic4] = useState(false);
  const [pic5, setPic5] = useState(false);
  const [pic6, setPic6] = useState(false);
  const [pic7, setPic7] = useState(false);

  const setOne= ()=>{
    setPic1(true);
    setPic2(false);
    setPic3(false);
    setPic4(false);
    setPic5(false);
    setPic6(false);
    setPic7(false);
  }
  const setTwo= ()=>{
    setPic2(true);
    setPic1(false);
    setPic3(false);
    setPic4(false);
    setPic5(false);
    setPic6(false);
    setPic7(false);
  }
  const setThree= ()=>{
    setPic3(true);
    setPic1(false);
    setPic2(false);
    setPic4(false);
    setPic5(false);
    setPic6(false);
    setPic7(false);
  }
  const setFour= ()=>{
    setPic4(true);
    setPic2(false);
    setPic3(false);
    setPic1(false);
    setPic5(false);
    setPic6(false);
    setPic7(false);
  }
  const setFive= ()=>{
    setPic5(true);
    setPic2(false);
    setPic3(false);
    setPic4(false);
    setPic1(false);
    setPic6(false);
    setPic7(false);
  }
  const setSix= ()=>{
    setPic6(true);
    setPic2(false);
    setPic3(false);
    setPic4(false);
    setPic5(false);
    setPic1(false);
    setPic7(false);
  }
  const setSeven= ()=>{
    setPic7(true);
    setPic2(false);
    setPic3(false);
    setPic4(false);
    setPic5(false);
    setPic6(false);
    setPic1(false);
  }

  const [onScrollBoolean, setScrollBoolean] = useState(false);


  const [cursorX, setCursorX] = useState('');
  const [cursorY, setCursorY] = useState('');

  const changeBackground = ()=>{
    if(window.scrollY>=250)
      setScrollBoolean(true);
    else
      setScrollBoolean(false);
  }

  window.addEventListener('scroll', changeBackground);

  window.addEventListener('mousemove', (e) =>{
    setCursorX(e.screenX -50);
    setCursorY(e.screenY -130);
  });

  
  const variants = {
    default :{
      x: cursorX,
      y:cursorY
    }
  }
  

  return (
<div >
  <motion.div 
    initial={{ x: "100%" }}
    className={'cursor1 '} 
    variants={variants}
    animate = 'default'
   />
  <Navbar/>
  <div className={onScrollBoolean? 'homeContainer active':'homeContainer'}>
    {!token&&
      <div className='welcome drop-down'>
        <h1 className='drop-up'> Sri Balaji Finance</h1>
        <p className='drop-right sl'>We are here for Your Emergency. Grow with us</p>
        <button onClick={gotoLogin}>Get Started </button>
      </div>
    }
    <div className='avail'>
      <div >
        <div className='sl'>Loans Available for</div>
        <div className='carosuelContainer'>
          <label for='c1' className ={pic1?'card2 ':'card'} onClick={setOne}>
            <div class="icon">1</div>
            <div class="description">
              Medical Emergency
            </div>
          </label>
          <label for='c2' className ={pic2?'card2 ':'card'} onClick={setTwo}>
            <div class="icon">2</div>
            <div class="description">
              Education Need
            </div>
          </label>
          <label for='c3' className ={pic3?'card2 ':'card'} onClick={setThree}>
            <div class="icon">3</div>
            <div class="description">
              Start Up Support
            </div>
          </label>
          <label for='c4' className ={pic4?'card2 ':'card'} onClick={setFour}>
            <div class="icon">4</div>
            <div class="description">
              Vehicle Financing
            </div>
          </label>
          <label for='c5' className ={pic5?'card2 ':'card'} onClick={setFive}>
            <div class="icon">5</div>
            <div class="description">
              Wedding Expenses
            </div>
          </label>
          <label for='c6' className ={pic6?'card2 ':'card'} onClick={setSix}>
            <div class="icon">6</div>
            <div class="description">
              Home Renovation
            </div>
          </label>
          <label for='c7' className ={pic7?'card2 ':'card'} onClick={setSeven}>
            <div class="icon">7</div>
            <div class="description">
              Vacation Expenses
            </div>
          </label>
        </div>{/* caroseulContainer */}
    </div>{/** avials */}
    </div>
      <div className='loans'>
        <div className='items'>
          <div className='title'>
            ML - Monthly Loan
          </div>
          <div className='explaination'>
            <div className='controller'>
              <p>total 5 months of dues</p>
              <p>0.1% of due Amount is considered to be over due as penality</p>
              <p>5.8% Interest Rate</p>
              <p>Amount Start from 10000 to 40000</p>
            </div>
          </div>
        </div>
        <div className='items'>
          <div className='title'>
            YL - Yearly Loan
          </div>
          <div className='explaination'>
            <div className='controller'>
              <p>total 12 months of dues</p>
              <p>0.2% of due Amount is considered to be over due as penality</p>
              <p>10.6% Interest Rate</p>
              <p>Amount Start from 50000 to 100000</p>
            </div>
          </div>
        </div>
        <div className='items'>
          <div className='title'>
            INT - Interest
          </div>
          <div className='explaination'>
            <div className='controller'>
              <p>Each month should pay the Interest amount utill paying full Loan Amount</p>
              <p>0.1% of due Amount is considered to be over due as penality</p>
              <p>8% Interest Rate</p>
              <p>Amount Start from 50000 to 200000</p>
            </div>
          </div>
        </div>
        <div className='items'>
          <div className='title'>
            EMG - Emergency
          </div>
          <div className='explaination'>
            <div className='controller'>
              <p>Should return money in 1 week</p>
              <p>5% of due Amount is considered to be over due as penality</p>
              <p>5.8% Interest Rate</p>
              <p>Amount Start from 10000 to 40000</p>
            </div>
          </div>
        </div>
      </div>{/** loans */}

    {/* <div className='about'>
        <div className='loc'>
          <p>your trusted partner in financial empowerment</p>
          <p>Established in 2016 by Balaji</p>
          <p>Our company is located at 13/657, Kudi Theru, Vilvanur, Idaiyapatti P/O, PN Palayam T/K, Salem D/T</p>
        </div>
        <div className='divs'>
        <h1>Founder</h1>
          <img src='/asserts/appa.jpg'/>
          <p>Shanmugam, a seasoned professional with a deep understanding of the financial landscape, envisioned creating a platform that goes beyond traditional financial services. With a valid license and a passion for helping others achieve their financial goals, Balaji embarked on this journey to make a meaningful impact on the community.</p>
        </div>
    </div> */}
    {/** about */}
  </div>{/** home container */}
</div>
  );
}

export default Home;