import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImage from '../../assets/images/Tron-Icon.png'; // Adjust the import path as necessary


const Navbar = () => {
    return (
        <header>
            <div id="logo">
                <img id="logo-image" src={logoImage} alt="logo" />
                <a id="nav-title" href="index.html">
                    <div id="title">TRON.AI</div>
                </a>
            </div>

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