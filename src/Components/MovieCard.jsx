import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const MovieCard = ({ movie }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="group cursor-pointer"
        >
            <div className="bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 rounded-2xl transition-all duration-300 p-0.5 hover:shadow-[0px_0px_30px_1px_rgba(239,68,68,0.3)]">
                <div className="card bg-gray-900 rounded-[19px] overflow-hidden border border-gray-700">

                    {/* Image */}
                    <figure className="relative overflow-hidden">
                        <motion.img
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ scale: 1.15 }}
                            className="w-full h-72 object-cover"
                            src={movie.posterUrl}
                            alt={movie.title}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450/1f2937/ffffff?text=No+Image';
                            }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold shadow-lg"
                        >
                            ⭐ {movie.rating}
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            className="absolute bottom-3 left-0 right-0 flex justify-center gap-2"
                        >
                            <Link
                                to={`https://www.youtube.com/results?search_query=${movie.title}+trailer`}
                                target="_blank"
                                className="btn btn-sm btn-primary rounded-full px-4"
                            >
                                🎬 Watch Trailer
                            </Link>
                        </motion.div>
                    </figure>

                    {/* Body */}
                    <div className="card-body p-4 text-white">
                        <h2 className="card-title text-lg font-bold mb-2 line-clamp-1">
                            {movie.title}
                        </h2>

                        <div className="flex flex-wrap gap-1 mb-3">
                            <div className="badge bg-red-500 text-white badge-sm">{movie.genre}</div>
                            <div className="badge badge-outline badge-sm">📅 {movie.releaseYear}</div>
                            <div className="badge badge-outline badge-sm">⏱️ {movie.duration}m</div>
                        </div>

                        <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                            {movie.plotSummary}
                        </p>

                        <div className="card-actions justify-between items-center">
                            <div className="text-xs text-gray-400">
                                🎬 {movie.director}
                            </div>

                            <motion.div whileTap={{ scale: 0.9 }}>
                                <Link
                                    to={`/movies/${movie._id}`}
                                    className="btn bg-red-500 btn-sm rounded-full px-6 hover:shadow-lg border-0 text-white font-medium"
                                >
                                    Details
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieCard;
