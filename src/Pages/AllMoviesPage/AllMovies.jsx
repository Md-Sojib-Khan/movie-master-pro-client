import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import MovieCard from '../../Components/MovieCard';

const AllMovies = () => {
    const [allMovies, setAllMovies] = useState([]);
    const axiosInstance = useAxios()

    useEffect(() => {
        axiosInstance.get('/movies')
            .then(data => {
                setAllMovies(data.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, [axiosInstance]);
    return (
        <div className='w-11/12 mx-auto my-10'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {
                    allMovies.map(movie => <MovieCard movie={movie}></MovieCard>)
                }
            </div>
        </div>
    );
};

export default AllMovies;