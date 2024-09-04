import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <header>
            <h1>TronAI</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/AI">AI</Link>
            </nav>
        </header>
    );
};

export default Navbar;