import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';


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

  return (
<div >
  <Navbar/>
  <div className='homeContainer'>
    {!token&&
      <div className='welcome drop-down'>
        <h1 className='drop-up'> Sri Balaji Finance</h1>
        <p className='drop-right sl'>We are here for Your Emergency. Grow with us</p>
        <button onClick={gotoLogin}>Start journey</button>
      </div>
    }
    <div className='avail'>
      <div >
        <h1 className='sl'>Loans Available for</h1>
        <div className='carosuelContainer'>
          <label for='c1' className ={pic1?'card2 ':'card'} onClick={setOne}>
            <div class="row">
              <div class="icon">1</div>
              <div class="description">
                <p>Medical Emergency</p>
              </div>
            </div>
          </label>
          <label for='c2' className ={pic2?'card2 ':'card'} onClick={setTwo}>
            <div class="row">
              <div class="icon">2</div>
              <div class="description">
                <p>Education Need</p>
              </div>
            </div>
          </label>
          <label for='c3' className ={pic3?'card2 ':'card'} onClick={setThree}>
            <div class="row">
              <div class="icon">3</div>
              <div class="description">
                <p>Start Up Support</p>
              </div>
            </div>
          </label>
          <label for='c4' className ={pic4?'card2 ':'card'} onClick={setFour}>
            <div class="row">
              <div class="icon">4</div>
              <div class="description">
                <p>Vehicle Financing</p>
              </div>
            </div>
          </label>
          <label for='c5' className ={pic5?'card2 ':'card'} onClick={setFive}>
            <div class="row">
              <div class="icon">5</div>
              <div class="description">
                <p>Wedding Expenses</p>
              </div>
            </div>
          </label>
          <label for='c6' className ={pic6?'card2 ':'card'} onClick={setSix}>
            <div class="row">
              <div class="icon">6</div>
              <div class="description">
                <p>Home Renovation</p>
              </div>
            </div>
          </label>
          <label for='c7' className ={pic7?'card2 ':'card'} onClick={setSeven}>
            <div class="row">
              <div class="icon">7</div>
              <div class="description">
                <p>Vacation Expenses</p>
              </div>
            </div>
          </label>
        </div>{/* caroseulContainer */}
      </div>
      <div className='loans'>
        <h1 className='sl'>Available Loans</h1>
        <table>
          <thead>
          <tr>
            <th>Sl.No</th>
            <th>Loan</th>
            <th>Intrest Rate</th>
            <th>Amount Limit</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>Monthly Loan</td>
            <td>3.7%</td>
            <td>10000-50000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Yearly Loan</td>
            <td>3.7%</td>
            <td>75000-200000</td>
          </tr>
          <tr>
            <td>3</td>
            <td>INT</td>
            <td>0.1%</td>
            <td>75000-200000</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Emergency</td>
            <td>10%</td>
            <td>75000-200000</td>
          </tr>
          </tbody>
        </table>
      </div>{/** loans */}
    </div>{/** avials */}

    <div className='about'>
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
    </div>{/** about */}
  </div>{/** home container */}
</div>
  );
}

export default Home;