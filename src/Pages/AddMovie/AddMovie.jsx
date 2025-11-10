import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';
import { number } from 'framer-motion';

const AddMovie = () => {
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const posterUrl = e.target.posterUrl.value;
        const ratingStr = e.target.rating.value;
        const rating = Number(ratingStr)
        const genre = e.target.genre.value;
        const duration = e.target.duration.value;
        const plotSummary = e.target.plotSummary.value;
        const addedBy = user?.email
        const newMovie = { title, posterUrl, rating, genre, duration, plotSummary, addedBy }

        axiosInstance.post('/movies', newMovie)
            .then(data => {
                if (data.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Movie Added Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    e.target.reset();
                }
            })

    }
    return (
        <div className="card bg-base-100 w-full max-w-sm md:max-w-md shrink-0 shadow-2xl mx-auto my-5">
            <div className="card-body">
                <form onSubmit={handleSubmit} className="fieldset">
                    <div>
                        <label className="font-medium">Movie title</label>
                        <input name='title' type="text" className="input w-full" placeholder="Enter movie title" required />
                    </div>
                    <div>
                        <label className="font-medium">Poster URL</label>
                        <input name='posterUrl' type="text" className="input w-full" placeholder="Poster URL" required />
                    </div>
                    <div className='flex gap-3'>
                        <div className='flex-1'>
                            <label className="font-medium">Rating</label>
                            <input name='rating' type="number" step="0.1" min="0" max="10" className="input" placeholder="Rating (0-10)" required />
                        </div>
                        <div className='flex-1'>
                            <label className="font-medium">Genre</label>
                            <input name='genre' type="text" className="input" placeholder="Action, Drama, Sci-Fi" required />
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='flex-1'>
                            <label className="font-medium">Duration</label>
                            <input name='duration' type="text" className="input" placeholder="Enter Duration(160m)" required />
                        </div>
                        <div className='flex-1'>
                            <label className="font-medium">Added By</label>
                            <input type="email" className="input w-full" placeholder="Email" value={user?.email || ''} readOnly />
                        </div>
                    </div>
                    <label className='font-medium'>Storyline</label>
                    <textarea className='input h-20 w-full' name="plotSummary" placeholder='Once more to reverse the damage caused by Thanos'></textarea>
                    <button className="btn bg-red-500 text-white mt-4">Add Movie</button>
                </form>
            </div>
        </div>
    );
};

export default AddMovie;