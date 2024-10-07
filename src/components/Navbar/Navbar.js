import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import agentImage from '../../assets/images/Agent-Icon.png';

const Navbar = () => {
    return (
            <nav>
                <Link to="/">News</Link>
                <Link to="/AI">AI</Link>
                <Link to="/Agent"><img id="agent-image" src={agentImage} alt="logo" /></Link>
                <Link to="/Test">Test</Link>
            </nav>
    );
};

export default Navbar;