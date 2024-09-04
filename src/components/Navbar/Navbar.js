import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <header>
            <h1><Link to="/">Home</Link></h1>
            <nav>
                <Link to="/News">News</Link>
                <Link to="/AI">AI</Link>
                <Link to="/Agent">Agent</Link>
            </nav>
        </header>
    );
};

export default Navbar;