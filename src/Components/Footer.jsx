import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='bg-[#001931] text-white'>
            <footer className=" py-10 w-11/12 mx-auto md:flex justify-between">
                <aside className='md:w-1/3 mb-5'>
                    <div className='flex items-center gap-1'>
                        {/* <img className='w-9' src={logoImg} alt="" /> */}
                        <h1 className='font-bold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>HERO.IO</h1>
                    </div>
                    <p>
                        Explore a universe of applications for your device. Find tools for productivity, creativity, entertainment, and more, all carefully curated for quality and security.

                        Your official destination for apps and games. We connect developers and users in a safe, trusted, and vibrant ecosystem.

                        The ultimate platform to find the perfect apps to power your passions and simplify your life. Download with confidence.
                    </p>
                </aside>
                <div className='flex justify-around mb-5 lg:space-x-28 md:space-x-14'>
                    <nav className='flex flex-col gap-2'>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav className='flex flex-col gap-2'>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                </div>
                <div className='flex justify-around lg:space-x-28 md:space-x-14'>
                    <nav className='flex flex-col gap-2'>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                    <div className='flex flex-col gap-2'>
                        <h6 className="footer-title">Connect</h6>
                        <a className="link link-hover flex items-center gap-1"><FaGithub />GitHub</a>
                        <a className="link link-hover flex items-center gap-1"><FaTwitter />Twitter</a>
                        <a className="link link-hover flex items-center gap-1"><FaLinkedin />LinkedIn</a>
                        <a className="link link-hover flex items-center gap-1"><FaYoutube />YouTube</a>
                    </div>
                </div>
            </footer>
            <footer className="footer sm:footer-horizontal footer-center p-4 border-t border-gray-500">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;