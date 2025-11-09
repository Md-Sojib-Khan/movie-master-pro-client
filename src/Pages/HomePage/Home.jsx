import React from 'react';
import Hero from './Hero';
import TopRatedMovies from './TopRatedMovies';
import RecentlyAdded from './RecentlyAdded';
import ActionsMovies from './ActionsMovies';
import DramaMovies from './DramaMovies';
import AboutPlatefrom from './AboutPlatefrom';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <TopRatedMovies></TopRatedMovies>
            <RecentlyAdded></RecentlyAdded>
            <ActionsMovies></ActionsMovies>
            <DramaMovies></DramaMovies>
            <AboutPlatefrom></AboutPlatefrom>
        </div>
    );
};

export default Home;