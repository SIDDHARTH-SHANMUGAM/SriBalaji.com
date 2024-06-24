import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Home() {
  
  const token = JSON.parse(sessionStorage.getItem('token'));
  const navigate = useNavigate();
  const gotoLogin = ()=>{
    navigate('/login');
  }
  return (
    <div className='con'>
        <Navbar/>
      <div className='homeContainer'>
        {!token&&
          <div className='makeLog align'>
            <h3> Welcome to Sri Balaji Finance</h3>
            <p>Unlock a personalized experience by logging in to your account. Your financial journey begins here, tailored just for you.</p>
            <button onClick={gotoLogin}>Start journey</button>
          </div>
        }
        {token&&<div className='empty'></div>}

        <div className='about'>
          <h1>About</h1>
          <div className='loc'>
            <p>your trusted partner in financial empowerment</p>
            <p>Established in 2016 by Balaji</p>
            <p>Our company is located at 13/657, Kudi Theru, Vilvanur, Idaiyapatti P/O, PN Palayam T/K, Salem D/T</p>
          </div>
        </div>
        <div className='loans'>
          <h1>Available Loans</h1>
          <table>
            <thead>
              <tr>
                <th>sl.No</th>
                <th>Loan</th>
                <th>Int Rate</th>
                <th>start amount</th>
                <th>amount limit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Monthly Loan</td>
                <td>3.7%</td>
                <td>10000</td>
                <td>50000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Yearly Loan</td>
                <td>3.7%</td>
                <td>75000</td>
                <td>200000</td>
              </tr>
              <tr>
                <td>3</td>
                <td>INT</td>
                <td>0.1%</td>
                <td>75000</td>
                <td>200000</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Emergency</td>
                <td>10%</td>
                <td>75000</td>
                <td>200000</td>
              </tr>
            </tbody>
          </table>
        </div>
          <div className='founder'>
            <h1>Our Founder- Mr K Shanmugam</h1>
          <div className='divs'>
            <img src='/asserts/appa.jpg'/>
            <p>Shanmugam, a seasoned professional with a deep understanding of the financial landscape, envisioned creating a platform that goes beyond traditional financial services. With a valid license and a passion for helping others achieve their financial goals, Balaji embarked on this journey to make a meaningful impact on the community.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
