import React, { useEffect, useState } from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css'; 
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/css/pagination'; 
import 'swiper/css/navigation'; 
import 'swiper/css/autoplay'; 
import axios from 'axios';

const Hero = () => { 
  const [movies, setMovies] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:3000/movies')
      .then(data => {
        setMovies(data.data.slice(0, 5));
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

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
        loop 
        autoplay={{ delay: 3000 }}
        className="hero-swiper"
      > 
        {movies.map((movie, index) => ( 
          <SwiperSlide key={index}>
            <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]">
              {/* Movie Poster with object-contain to maintain aspect ratio */}
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
              
              {/* Overlay gradient with better visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {/* Movie info - Responsive positioning and sizing */}
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
                
                {/* Plot summary for larger screens */}
                <p className="hidden md:block text-sm opacity-90 mt-3 line-clamp-2">
                  {movie.plotSummary}
                </p>
              </div>

              {/* Additional overlay for better text readability */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            </div>
          </SwiperSlide> 
        ))} 
      </Swiper> 

      {/* Custom CSS for Swiper Default Styles */}
      <style jsx global>{`
        /* Pagination - Bottom Center (Default Position) */
        .hero-swiper .swiper-pagination {
          bottom: 20px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
        }

        .hero-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 8px;
          height: 8px;
          margin: 0 4px !important;
          transition: all 0.3s ease;
        }

        .hero-swiper .swiper-pagination-bullet:hover {
          opacity: 0.8;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          background: #3B82F6;
          opacity: 1;
          width: 20px;
          border-radius: 4px;
        }

        /* Navigation - Center Vertical Sides (Default Position) */
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white;
          background: rgba(0, 0, 0, 0.3);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }

        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.6);
          transform: scale(1.1);
        }

        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }

        .hero-swiper .swiper-button-prev {
          left: 10px;
        }

        .hero-swiper .swiper-button-next {
          right: 10px;
        }

        /* Hide navigation on mobile for better UX */
        @media (max-width: 768px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            display: none;
          }
          
          .hero-swiper .swiper-pagination {
            bottom: 10px !important;
          }
        }

        /* Larger screens - adjust navigation position */
        @media (min-width: 1024px) {
          .hero-swiper .swiper-button-prev {
            left: 20px;
          }

          .hero-swiper .swiper-button-next {
            right: 20px;
          }
        }
      `}</style>
    </div> 
  ); 
}; 

export default Hero;