import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")
    const { user, logOutUser } = useContext(AuthContext);

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/all-movies'}>All Movies</NavLink></li>
        <li><NavLink to={'/my-collection'}>My Collection</NavLink></li>
        <li><NavLink to={'/add-movie'}>Add Movie</NavLink></li>
    </>

    const handleSignOut = () => {
        logOutUser()
            .then(() => toast.success('Sign-out successful'))
            .catch(e => toast(e.code))
    }

    useEffect(() => {
        const html = document.querySelector('html')
        html.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])


    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light")
    }

    return (
        <div className="navbar bg-base-100 shadow-sm md:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost text-xl">MovieMaster Pro</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-3">
                <input
                    onChange={(e) => handleTheme(e.target.checked)}
                    type="checkbox"
                    defaultChecked={localStorage.getItem('theme') === "dark"}
                    className="toggle" />
                {
                    user
                        ? <div className="dropdown dropdown-end dropdown-hover cursor-pointer">
                            <div tabIndex={0} role="button" >
                                <img className='w-10 h-10 object-cover rounded-full border-2 border-white' src={user?.photoURL ? user?.photoURL : "img"} alt="" />
                            </div>
                            <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-20 w-52 p-2 shadow-sm space-y-2">
                                <li><a className='font-medium'>{user.displayName}</a></li>
                                <li><Link to={'/my-wishlist'} className='font-medium'>My Wishlist</Link></li>
                                <li><button onClick={handleSignOut} className="btn bg-red-500 btn-sm rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border-0 text-white font-medium">LogOut</button></li>
                            </ul>
                        </div>

                        : <div className='flex gap-2'>
                            <Link to={'/login'} className="btn bg-red-500 btn-sm rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border-0 text-white font-medium">Login</Link>
                            <Link to={'/register'} className="btn bg-red-500 btn-sm rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border-0 text-white font-medium">Register</Link>
                        </div>
                }

            </div>
        </div>
    );
};

export default Navbar;