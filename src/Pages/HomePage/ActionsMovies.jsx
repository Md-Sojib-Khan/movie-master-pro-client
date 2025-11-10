import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import MovieCard from '../../Components/MovieCard';

const ActionsMovies = () => {
    const [actionMovies, setActionMovies] = useState([]);
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get('/movies/action')
            .then(data => {
                setActionMovies(data.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, [axiosInstance]);
    return (
        <div className='w-11/12 mx-auto my-10'>
            <h1 className='text-xl font-bold mb-5 border-l-4 border-red-500 pl-2'>Actions Movies</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {
                    actionMovies.map(movie => <MovieCard movie={movie} key={movie._id}></MovieCard>)
                }
            </div>
        </div>
    );
};

export default ActionsMovies;