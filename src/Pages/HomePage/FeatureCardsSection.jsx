import React from 'react';
import { Link } from 'react-router';
import { FaPlusCircle, FaList, FaHeart, FaUserFriends } from 'react-icons/fa';

const FeatureCardsSection = () => {
    const features = [
        {
            icon: <FaPlusCircle className="text-3xl" />,
            title: "Add Movies",
            description: "Easily add your favorite movies to your personal collection",
            link: "/dashboard/add-movie",
            color: "bg-primary text-primary-content"
        },
        {
            icon: <FaList className="text-3xl" />,
            title: "Manage Collection",
            description: "Organize and categorize your movie library efficiently",
            link: "/dashboard/my-collection",
            color: "bg-secondary text-secondary-content"
        },
        {
            icon: <FaHeart className="text-3xl" />,
            title: "Create Wishlist",
            description: "Save movies you want to watch in your personal wishlist",
            link: "/dashboard/my-wishlist",
            color: "bg-accent text-accent-content"
        },
        {
            icon: <FaUserFriends className="text-3xl" />,
            title: "Join Community",
            description: "Connect with fellow movie lovers and share recommendations",
            link: "/all-movies",
            color: "bg-info text-info-content"
        }
    ];

    return (
        <section className="py-12 bg-base-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">Why Choose MovieMaster Pro?</h2>
                <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                    Discover the features that make managing your movie collection effortless and enjoyable.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Link 
                            key={index} 
                            to={feature.link}
                            className="group block"
                        >
                            <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 h-full">
                                <div className="card-body items-center text-center p-6">
                                    <div className={`w-20 h-20 rounded-full ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                    <div className="card-actions mt-4">
                                        <button className="btn btn-sm btn-outline">Explore</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureCardsSection;