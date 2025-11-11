import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import MovieCard from '../../Components/MovieCard';

const AllMovies = () => {
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(true);
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get('/movies')
            .then(res => {
                setAllMovies(res.data);
                setFilteredMovies(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, [axiosInstance]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setFilteredMovies(allMovies);
            setShowSuggestions(false);
            return;
        }

        const filtered = allMovies.filter(movie =>
            movie.title.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredMovies(filtered);
        setShowSuggestions(true);
    };

    const handleSelectSuggestion = (title) => {
        setSearchTerm(title);
        const filtered = allMovies.filter(movie =>
            movie.title.toLowerCase().includes(title.toLowerCase())
        );
        setFilteredMovies(filtered);
        setShowSuggestions(false);
    };

    if (loading) {
        return (
            <p className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-xl"></span>
            </p>
        );
    }

    return (
        <div className="w-11/12 mx-auto my-10">
            <div className="relative max-w-md mx-auto mb-8">
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search movies..." className="input input-bordered w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />

                {showSuggestions && searchTerm && (
                    <ul className="absolute left-0 right-0 bg-white text-black shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
                        {filteredMovies.length > 0 ? (
                            filteredMovies.slice(0, 6).map(movie => (
                                <li
                                    key={movie._id}
                                    className="px-4 py-2 cursor-pointer hover:bg-red-100 transition"
                                    onClick={() => handleSelectSuggestion(movie.title)}
                                >
                                    {movie.title}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-500">No matches found</li>
                        )}
                    </ul>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {filteredMovies.map(movie => (
                    <MovieCard movie={movie} key={movie._id} />
                ))}
            </div>
        </div>
    );
};

export default AllMovies;