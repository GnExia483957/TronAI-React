import React from 'react';
import News from '../components/News/News';
import Search from '../components/Search/Search';



const Home = () => {
    return (
        <div>
            <div id="spacing">
                <News />
            </div>
            <div className="outer-search-container">
            <Search />
            </div>
        </div>
    );
};

export default Home;