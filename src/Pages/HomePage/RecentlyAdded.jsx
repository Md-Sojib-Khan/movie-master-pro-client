import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';


const RecentlyAdded = () => {
    const [recentMovies, setRecentMovies] = useState([]);
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get('/movies/recently-add')
            .then(data => {
                setRecentMovies(data.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, [axiosInstance]);

    const breakpoints = {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
  };

  const shouldLoop = recentMovies.length > 6;
    return (
        <div className='w-11/12 mx-auto my-10'>
      <h1 className='text-xl font-bold mb-5 border-l-4 border-red-500 pl-2'>Top Rated Movies</h1>
      <div>
        <Swiper
          modules={[Navigation, Autoplay]}
          breakpoints={breakpoints}
          navigation={true}
          loop={shouldLoop}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
          onAfterInit={(swiper) => {
            swiper.autoplay.start();
          }}
        >
          {recentMovies.map((movie, index) => (
            <SwiperSlide key={movie._id || index}>
              <div className="w-48 h-80 hover:bg-linear-to-br from-[#00ff75] to-[#3700ff] rounded-2xl transition-all duration-300 p-0.5 hover:shadow-[0px_0px_30px_1px_rgba(0,255,117,0.30)] group">
                <div className="w-full h-full bg-[#1a1a1a] rounded-[19px] transition-all duration-200 group-hover:scale-98 group-hover:rounded-2xl overflow-hidden">
                  <img 
                    src={movie.posterUrl} 
                    alt={movie.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium text-white text-center line-clamp-2">{movie.title}</h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    );
};

export default RecentlyAdded;