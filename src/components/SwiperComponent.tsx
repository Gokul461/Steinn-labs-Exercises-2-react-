import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import img1 from '../assets/mslide1.png';
import img2 from '../assets/mslide2.png';
import img3 from '../assets/mslide3.png';
import './swiper.css';

const SwiperComponent: React.FC = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className="rounded-lg shadow-lg"
      >
        <SwiperSlide>
          <img src={img1} alt="Slide 1" className="w-full h-auto rounded-lg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="Slide 2" className="w-full h-auto rounded-lg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="Slide 3" className="w-full h-auto rounded-lg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
