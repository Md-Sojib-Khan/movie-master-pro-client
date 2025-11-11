import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { AuthContext } from '../../Context/AuthContext';
import { FaClock, FaEdit, FaStar, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';

const MyCollection = () => {
    const [myMovies, setMyMovies] = useState([]);
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext)

    useEffect(() => {
        axiosInstance.get(`/movies?email=${user?.email}`)
            .then(data => setMyMovies(data.data))
    }, [user, axiosInstance])

    const handleDelete = (id) =>{
        console.log(id,"delete clicked")
    }
    return (
        <div className='w-11/12 mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 my-5 gap-5'>
                {
                    myMovies.map(movie => <div key={movie._id} className="card card-side bg-base-100 shadow-sm p-3 hover:scale-102 transition-transform hover:shadow-xl">
                        <figure className='w-full'>
                            <img
                                className='w-full'
                                src={movie.posterUrl}
                                alt="Movie" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{movie.title}</h2>
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
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-3">
                                    <FaClock className="text-red-500 text-lg" />
                                    <span className="font-semibold">Duration</span>
                                </div>
                                <p className=" font-medium text-lg">{movie.duration} minutes</p>
                            </div>
                            <p>{movie.plotSummary}</p>
                            <div className=" flex items-center gap-3">
                                <Link to={`/movies/update/${movie._id}`} className="btn btn-warning btn-sm md:btn-md gap-2 hover:scale-105 transition-transform"><FaEdit />Edit Movie</Link>
                                <button onClick={()=>handleDelete(movie._id)} className="btn btn-error btn-sm md:btn-md gap-2 hover:scale-105 transition-transform"><FaTrash />Delete Movie</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyCollection;