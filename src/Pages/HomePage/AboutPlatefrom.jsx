import React from 'react';
import { FaFilm, FaStar, FaUsers, FaRocket, FaShieldAlt, FaMobileAlt } from 'react-icons/fa';

const AboutPlatform = () => {
  const features = [
    {
      icon: <FaFilm className="text-3xl" />,
      title: "Extensive Movie Library",
      description: "Access thousands of movies across all genres with detailed information and high-quality posters."
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Personal Collections",
      description: "Create and manage your own movie collections with custom categories and ratings."
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Community Driven",
      description: "Join a community of movie enthusiasts and share your reviews and recommendations."
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Advanced Filtering",
      description: "Find exactly what you're looking for with our powerful search and filtering system."
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Secure & Private",
      description: "Your data and collections are securely stored and completely private to you."
    },
    {
      icon: <FaMobileAlt className="text-3xl" />,
      title: "Fully Responsive",
      description: "Enjoy seamless experience across all devices - desktop, tablet, and mobile."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            About MovieMaster Pro
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your ultimate companion for discovering, organizing, and managing movies. 
            Built for cinephiles by cinephiles, we bring you the most comprehensive 
            movie management experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 ">
            <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300 hover:scale-105 transition ease-in-out">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Why Choose MovieMaster Pro?
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We understand the passion for cinema. That's why we've created a platform 
                that goes beyond just listing movies. With advanced features and intuitive 
                design, managing your movie journey has never been easier.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Curate personalized movie collections</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Advanced search with multiple filters</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Rate and review your favorite films</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Discover new movies based on your taste</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-primary/10 p-4 rounded-xl hover:scale-105 transition ease-in-out">
                <div className="text-2xl font-bold text-primary">1K+</div>
                <div className="text-sm text-gray-600">Movies</div>
              </div>
              <div className="bg-secondary/10 p-4 rounded-xl hover:scale-105 transition ease-in-out">
                <div className="text-2xl font-bold text-secondary">5K+</div>
                <div className="text-sm text-gray-600">Users</div>
              </div>
              <div className="bg-accent/10 p-4 rounded-xl hover:scale-105 transition ease-in-out">
                <div className="text-2xl font-bold text-accent">50K+</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-2xl text-white text-center hover:scale-105 transition ease-in-out">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold mb-4">Start Your Cinematic Journey</h3>
              <p className="opacity-90 mb-6">
                Join thousands of movie lovers who trust MovieMaster Pro for their movie management needs.
              </p>
              <button className="btn btn-outline btn-white hover:bg-red-500 hover:text-white">
                Explore Features
              </button>
            </div>
            
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center">
              <FaStar className="text-warning text-xl" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
              <FaUsers className="text-success text-lg" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-base-100 p-6 rounded-xl shadow-sm border border-base-300 hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 bg-base-200 rounded-2xl p-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Master Your Movie Experience?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join MovieMaster Pro today and transform how you discover, organize, and enjoy movies.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn bg-red-500 text-white btn-lg">
              Get Started Free
            </button>
            <button className="btn btn-outline btn-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPlatform;