import React, { useEffect, useState } from 'react';
import './Home.css';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Login from '../Login/Login';
import Signin from '../Signin/Signin';

function Home() {
  
  const token = JSON.parse(sessionStorage.getItem('token'));
  const gotoLogin = ()=>{
    setLoginSwitch(true);
    setSigninSwitch(false);
  }
  const gotoSignin = ()=>{
    setSigninSwitch(true);
    setLoginSwitch(false);
  }
 

  const [onScrollBoolean, setScrollBoolean] = useState(false);
  
  const changeBackground = ()=>{
    if(window.scrollY>400)
      setScrollBoolean(true);
    else
    {
      if(token)
      {
        setScrollBoolean(true);
      }
      else
        setScrollBoolean(false);
    }
  }
  window.addEventListener('scroll', changeBackground);

  const obj = [
    { img: 'medical', text:'Medical', color:''},
    { img: 'education', text:'Education', color:''},
    { img: 'startups', text:'Startups', color:''},
    { img: 'marriage', text:'Wedding', color:''},
    { img: 'home', text:'Home Rennovation', color:''},
    { img: 'vaccation', text:'Vaccation', color:''},
    { img: 'vehicle', text:'Vehicle', color:''},
  ];

  const [active , setActive ] = useState();
  const [loginSwitch, setLoginSwitch] = useState();
  const [signinSwitch, setSigninSwitch] = useState();


  useEffect(() => {
    const elements = document.querySelectorAll('.avails');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('drop-left');
        } else {
          entry.target.classList.remove('drop-left');
        }
      });
    }, { threshold: 0 });

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);


  return (
  <div className='home-outer'>
    <div className={onScrollBoolean? 'homeContainer active':'homeContainer'}>
    {!token&&
        <div className='welcome drop-down'>
          <div className='head1 drop-up'> Sri Balaji Finance</div>
          <p className='drop-right greet'>We are here for Your Emergency. Grow with us</p>
          <div className='button-container'>
            <button className='button' onClick={gotoLogin}>Get Started </button>
          </div>
          {loginSwitch&&!signinSwitch&&
            <div className='login-container' >
              {loginSwitch&&<div className='mask' onClick={()=>{setLoginSwitch(false)}}></div>}
              <Login/>
              <div className='gotobrother drop-down' onClick={gotoSignin}>
                Need an Account
              </div>
            </div>
          }
          {!loginSwitch&&signinSwitch&&
            <div className='login-container mask'>
              {signinSwitch&&<div className='mask' onClick={()=>{setSigninSwitch(false)}}></div>}
              <Signin/>
              <div className='gotobrother drop-down' onClick={gotoLogin}>
                Already have one
              </div>
            </div>
          }
        </div>
    }
      <div className='avails'>
        <div className='max-w-5xl'>
          <h1 className="text-gray-900 font-bold text-xl mb-2 " style={{fontFamily: 'Laila', fontSize: '30px'}}>Loans Available</h1>
        </div>

        <div className=''>
          <div>
            
          </div>

        </div>
      </div>

      {/* Crousel */}
      <div className='carosel'>
          <h1 className='text-black text-center h-20' style={{fontFamily: 'Laila', fontSize: '30px', letterSpacing:'-1px'}}>Loans Available For</h1>
          <div className='max-w-5xl'>
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              loop = {true}
              centeredSlides = {true}
              speed={1000}
              autoplay={{ delay: 2000 }}
              modules={[Autoplay]} 
              onSlideChange={(cur) => setActive(cur.realIndex)}
            >
              {
                obj.map((ob, i)=>{
                  return <SwiperSlide key={i}  className='swiper'>
                    <div className={`card ${active === i && 'active2'}`}>
                      <img src={`asserts/${ob.img}.jpg`} alt={`${ob.text}`}/>
                      <h2 className='text'>{ob.text}</h2>
                    </div>
                  </SwiperSlide>;
                })
              }
            </Swiper> 
          </div>
      </div>
      <div className='avails'></div>
    </div>
  </div> //end
  
  );
}

export default Home;