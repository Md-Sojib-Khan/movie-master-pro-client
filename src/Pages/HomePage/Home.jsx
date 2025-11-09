import React from 'react';
import Hero from './Hero';
import TopRatedMovies from './TopRatedMovies';
import RecentlyAdded from './RecentlyAdded';
import ActionsMovies from './ActionsMovies';
import DramaMovies from './DramaMovies';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <TopRatedMovies></TopRatedMovies>
            <RecentlyAdded></RecentlyAdded>
            <ActionsMovies></ActionsMovies>
            <DramaMovies></DramaMovies>
        </div>
    );
};

export default Home;