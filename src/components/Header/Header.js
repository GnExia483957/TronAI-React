import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../../assets/images/Tron-Icon.png'; // Adjust the import path as necessary


const Header = () => {
    return (
        <header>

            <div id="logo">
                <img id="logo-image" src={logoImage} alt="logo" />
                <Link to="/"><div id="title">TRON.AI</div></Link>                   
            </div>

        </header>
    );
};

export default Header;