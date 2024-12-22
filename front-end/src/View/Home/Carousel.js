import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0
  };
  return (
    
    <div className="slider-container">
      <h1>Hello</h1>
      
    <Slider {...settings}>
      <div className='card' for='c1'>
        <h1>hi</h1>
        <p>h2llo fehwuoijfwe jiwenueih</p>
      </div>
      <div className='card' for='c2'>
        <h1>hi</h1>
      </div>
      <div className='card' for='c3'>
        <h1>hi</h1>
      </div>
      <div className='card' for='c4'>
        <h1>hi</h1>
      </div>
      <div className='card' for='c5'>
        <h1>hi</h1>
      </div>
      <div className='card' for='c6'>
        <div className='card-body'>ojewcoiei</div>
      </div>
      <div className='card' for='c7'>
        <div className='card-body'>jofeqioe</div>
      </div>
      
    </Slider>
    </div>
  );
}

export default Carousel
