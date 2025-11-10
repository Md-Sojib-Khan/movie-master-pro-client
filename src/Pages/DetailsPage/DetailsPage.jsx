import React, { useContext } from 'react';
import { useLoaderData, useNavigate, Link } from 'react-router';
import { FaStar, FaClock, FaCalendarAlt, FaLanguage, FaGlobe, FaUser, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext';

const DetailsPage = () => {
    const movie = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const isOwner = user && movie.addedBy === user.email;
    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-ghost btn-sm mb-6 hover:scale-105 transition-transform"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Movies
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Movie Poster */}
                    <div className="flex justify-center lg:justify-start">
                        <div className="relative group">
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="w-full max-w-md rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl"
                            />
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>

                    {/* Right Column - Movie Details */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                                {movie.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4">
                                <div className="badge bg-red-500 badge-lg text-white font-bold py-3 px-4">
                                    {movie.genre}
                                </div>
                                <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 py-1 px-3 rounded-full">
                                    <FaStar className="text-yellow-500" />
                                    <span className="font-bold">{movie.rating}</span>
                                    <span>/10</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons - Only for Owner */}
                        {isOwner ? (
                            <div className="flex gap-3 animate-fade-in">
                                <Link
                                    className="btn btn-warning btn-sm md:btn-md gap-2 hover:scale-105 transition-transform"
                                >
                                    <FaEdit />
                                    Edit Movie
                                </Link>
                                <button
                                    className="btn btn-error btn-sm md:btn-md gap-2 hover:scale-105 transition-transform"
                                >
                                    <FaTrash />
                                    Delete Movie
                                </button>
                            </div>
                        ) : 
                        <div className='space-x-3'>
                            <button className='btn btn-warning btn-sm md:btn-md gap-2 hover:scale-105 transition-transform'>Download</button>
                            <button className='btn btn-error btn-sm md:btn-md gap-2 hover:scale-105 transition-transform'>Wishlist</button>
                        </div>
                    }

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-300 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-2">
                                    <FaCalendarAlt className="text-red-500 text-lg" />
                                    <span className="font-semibold">Release Year</span>
                                </div>
                                <p className="font-medium text-lg">{movie.releaseYear}</p>
                            </div>

                            <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-300 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-2">
                                    <FaClock className="text-red-500 text-lg" />
                                    <span className="font-semibold">Duration</span>
                                </div>
                                <p className=" font-medium text-lg">{movie.duration} minutes</p>
                            </div>

                            <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-300 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-2">
                                    <FaLanguage className="text-red-500 text-lg" />
                                    <span className="font-semibold">Language</span>
                                </div>
                                <p className="font-medium text-lg">{movie.language}</p>
                            </div>

                            <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-300 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-2">
                                    <FaGlobe className="text-red-500 text-lg" />
                                    <span className="font-semibold">Country</span>
                                </div>
                                <p className="font-medium text-lg">{movie.country}</p>
                            </div>
                        </div>

                        <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-300">
                            <div className="flex items-center gap-3 mb-3">
                                <FaUser className="text-red-500 text-lg" />
                                <span className="font-semibold">Director</span>
                            </div>
                            <p className="font-medium text-lg">{movie.director}</p>
                        </div>

                        <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-300">
                            <h3 className="font-semibold mb-3">Cast</h3>
                            <div className="flex flex-wrap gap-2">
                                {movie.cast?.split(', ').map((actor, index) => (
                                    <span
                                        key={index}
                                        className="badge badge-outline badge-lg hover:text-red-500 transition-all cursor-pointer"
                                    >
                                        {actor}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
                            <h3 className="font-semibold mb-4 text-xl">Storyline</h3>
                            <p className="leading-relaxed text-lg">
                                {movie.plotSummary}
                            </p>
                        </div>

                        <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-300">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Added by:</span>
                                <span className="font-medium">{movie.addedBy}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;