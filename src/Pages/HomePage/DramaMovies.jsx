import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import MovieCard from '../../Components/MovieCard';

const DramaMovies = () => {
    const [dramaMovies, setDramaMovies] = useState([]);
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get('/movies/drama')
            .then(data => {
                setDramaMovies(data.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, [axiosInstance]);
    return (
        <div className='w-11/12 mx-auto my-10'>
            <h1 className='text-xl font-bold mb-5 border-l-4 border-red-500 pl-2'>Drama Movies</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {
                    dramaMovies.map(movie => <MovieCard movie={movie}></MovieCard>)
                }
            </div>
        </div>
    );
};

export default DramaMovies;