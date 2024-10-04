import React from 'react';
import News from '../components/News/News';
import Search from '../components/Search/Search';



const Home = () => {
    return (
        <div>
            <div id="spacing">
                <News />
            </div>
            <Search />
        </div>
    );
};

export default Home;