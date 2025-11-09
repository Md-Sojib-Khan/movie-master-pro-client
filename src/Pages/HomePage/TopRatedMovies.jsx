import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const TopRatedMovies = () => {
  const [topMovies, setTopMovies] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get('/movies/top-rated')
      .then(data => {
        setTopMovies(data.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, [axiosInstance]);

  return (
    <div className='w-11/12 mx-auto my-10'>
      <h1 className='text-xl font-bold mb-5 border-l-4 border-red-500 pl-2'>Top Rated Movies</h1>
      <div>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={6}
          navigation={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {topMovies.map((movie, index) => (
            <SwiperSlide key={movie._id || index}>
              <div className='h-[350px]'>
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title}
                  className='w-full h-[300px] object-cover rounded-lg'
                />
                <h3 className='font-medium text-center'>{movie.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopRatedMovies;