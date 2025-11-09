import React from 'react';
import Hero from './Hero';
import TopRatedMovies from './TopRatedMovies';
import RecentlyAdded from './RecentlyAdded';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <TopRatedMovies></TopRatedMovies>
            <RecentlyAdded></RecentlyAdded>
        </div>
    );
};

export default Home;