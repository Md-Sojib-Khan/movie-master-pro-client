import React from 'react';
import { FaFilm, FaStar, FaUsers, FaHeart, FaAward, FaRocket, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router';

const About = () => {
    return (
        <div className="min-h-screen bg-base-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-secondary py-16">
                <div className="container mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About MovieMaster Pro</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Your ultimate destination for discovering, tracking, and sharing your favorite movies
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            At MovieMaster Pro, we believe every movie tells a story worth sharing. 
                            Our platform is built for movie enthusiasts to explore, organize, and celebrate 
                            the magic of cinema together.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                    <FaFilm className="text-3xl text-primary" />
                                </div>
                                <h3 className="card-title text-xl mb-2">Vast Collection</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Explore thousands of movies across all genres, from classics to latest releases.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                                    <FaStar className="text-3xl text-secondary" />
                                </div>
                                <h3 className="card-title text-xl mb-2">Rate & Review</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Share your thoughts and ratings to help others discover great movies.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                                    <FaHeart className="text-3xl text-accent" />
                                </div>
                                <h3 className="card-title text-xl mb-2">Personal Collection</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Create your own movie library and wishlist to track what you want to watch.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-base-200 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Impact in Numbers</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="stat-value text-4xl text-primary mb-2">10,000+</div>
                            <div className="stat-title">Movies</div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">In our database</p>
                        </div>
                        <div className="text-center">
                            <div className="stat-value text-4xl text-secondary mb-2">5,000+</div>
                            <div className="stat-title">Active Users</div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Movie enthusiasts</p>
                        </div>
                        <div className="text-center">
                            <div className="stat-value text-4xl text-accent mb-2">50,000+</div>
                            <div className="stat-title">Reviews</div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">And counting</p>
                        </div>
                        <div className="text-center">
                            <div className="stat-value text-4xl text-warning mb-2">100+</div>
                            <div className="stat-title">Countries</div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Worldwide reach</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team/Values Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose MovieMaster Pro?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                                    <FaAward className="text-xl text-primary" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Trusted Platform</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Built with love for movie lovers by movie lovers. We maintain the highest 
                                    standards of accuracy and quality.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                                    <FaRocket className="text-xl text-secondary" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Always Improving</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    We constantly update our platform with new features based on user feedback 
                                    and industry trends.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                                    <FaUsers className="text-xl text-accent" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Our platform grows with our community. User contributions make our database 
                                    richer every day.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
                                    <FaGlobe className="text-xl text-warning" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Global Access</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Access your movie collection from anywhere, on any device. Your cinematic 
                                    journey travels with you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Join Our Movie Community</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        Start your cinematic journey today. Discover new movies, share your favorites, 
                        and connect with fellow movie lovers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register" className="btn btn-primary btn-lg">
                            Get Started Free
                        </Link>
                        <Link to="/all-movies" className="btn btn-outline btn-lg">
                            Browse Movies
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    MovieMaster Pro - Where every movie finds its audience
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    © {new Date().getFullYear()} MovieMaster Pro. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default About;