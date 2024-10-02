import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <header>
            <h1><Link to="/">Tron.AI</Link></h1>
            <nav>
                <Link to="/News">News</Link>
                {/* <Link to="/AI">AI</Link> */}
                {/* <Link to="/Agent">Agent</Link>
                <Link to="/Test">Test</Link> */}

            </nav>
        </header>
    );
};

export default Navbar;