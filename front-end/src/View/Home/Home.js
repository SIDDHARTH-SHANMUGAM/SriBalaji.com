import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

function Home() {
  
  const token = JSON.parse(sessionStorage.getItem('token'));
  const navigate = useNavigate();
  const gotoLogin = ()=>{
    navigate('/login');
  }
 

  const [onScrollBoolean, setScrollBoolean] = useState(false);
  const changeBackground = ()=>{
    if(window.scrollY<80)
      setScrollBoolean(false);
    else
      setScrollBoolean(true);
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
    <Navbar/>
    <div className={onScrollBoolean? 'homeContainer active':'homeContainer'}>
    {!token&&
      <div className='welcome drop-down'>
        <div className='head1 drop-up'> Sri Balaji Finance</div>
        <p className='drop-right sl'>We are here for Your Emergency. Grow with us</p>
        <div className='button-container'>
          <button className='button' onClick={gotoLogin}>Get Started </button>
        </div>
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
                  return <SwiperSlide className='swiper'>
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
    </div> {/* home container */}
  </div> //end
  
  );
}

export default Home;