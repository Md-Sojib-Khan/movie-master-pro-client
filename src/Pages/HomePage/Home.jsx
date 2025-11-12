import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import TopRatedMovies from './TopRatedMovies';
import RecentlyAdded from './RecentlyAdded';
import ActionsMovies from './ActionsMovies';
import DramaMovies from './DramaMovies';
import AboutPlatefrom from './AboutPlatefrom';
import useAxios from '../../Hooks/useAxios';
import { useNavigate } from 'react-router';

const Home = () => {
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [allUsers, setAllUsers] = useState([])
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/movies')
            .then(res => {
                setAllMovies(res.data);
                setFilteredMovies(res.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, [axiosInstance]);

    useEffect(() => {
        axiosInstance.get('/all-users')
            .then(res => {
                setAllUsers(res.data)
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && filteredMovies.length > 0) {
            navigate(`/movies/${filteredMovies[0]._id}`);
            setShowSuggestions(false);
        }
    };

    return (
        <div>
            <Hero></Hero>
            <div className='md:flex justify-between items-center w-11/12 mx-auto mt-10 text-center'>
                <div>
                    <h1 className='text-xl font-bold'>Total(<span className='text-red-500'>{allMovies.length}</span>)Movies</h1>
                </div>
                <div className="relative w-full max-w-md mx-auto">
                    <input type="text" value={searchTerm} onChange={handleSearch} onKeyDown={handleKeyDown} placeholder="Search movies..." className="input input-bordered w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border-2" />

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
                <div>
                    <h1 className='text-xl font-bold hidden md:inline-block'>Total(<span className='text-red-500'>{allUsers.length}</span>)Users</h1>
                </div>
            </div>
            <TopRatedMovies></TopRatedMovies>
            <RecentlyAdded></RecentlyAdded>
            <ActionsMovies></ActionsMovies>
            <DramaMovies></DramaMovies>
            <AboutPlatefrom></AboutPlatefrom>
        </div>
    );
};

export default Home;