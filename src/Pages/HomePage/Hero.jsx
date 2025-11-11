import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import useAxios from '../../Hooks/useAxios';

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true)
  const axiosInstance = useAxios()

  useEffect(() => {
    axiosInstance.get('/movies')
      .then(data => {
        setMovies(data.data.slice(0, 5));
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, [axiosInstance]);

  const shouldLoop = movies.length > 1;

  if (loading) {
    return <p className='min-h-screen flex justify-center items-center'><span className="loading loading-spinner loading-xl"></span></p>
  }
  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          type: 'bullets',
          dynamicBullets: true
        }}
        navigation={true}
        loop={shouldLoop}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        className="hero-swiper"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]">
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400/1f2937/ffffff?text=No+Image';
                  }}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              <div className="absolute bottom-16 left-4 right-4 md:bottom-20 md:left-10 md:right-auto text-white z-50 max-w-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg leading-tight">
                  {movie.title}
                </h2>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-sm sm:text-base opacity-90 bg-primary/20 px-2 py-1 rounded">
                    {movie.genre}
                  </span>
                  <span className="text-sm sm:text-base opacity-90">
                    {movie.releaseYear}
                  </span>
                  <span className="text-sm sm:text-base opacity-90">
                    ⭐ {movie.rating}
                  </span>
                </div>

                <p className="text-xs sm:text-sm opacity-80 mb-1">
                  🎬 Directed by: {movie.director}
                </p>
                <p className="text-xs sm:text-sm opacity-80">
                  ⏱️ {movie.duration} minutes
                </p>

                <p className="hidden md:block text-sm opacity-90 mt-3 line-clamp-2">
                  {movie.plotSummary}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;