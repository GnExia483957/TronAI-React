import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <header>
            <div id="logo"><Link to="/">Tron.AI</Link></div>
            <nav>
                <Link to="/">News</Link>
                <Link to="/AI">AI</Link>
                <Link to="/Agent">Agent</Link>
                {/* <Link to="/Test">Test</Link> */}

            </nav>
        </header>
    );
};

export default Navbar;