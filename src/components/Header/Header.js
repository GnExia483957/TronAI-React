import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../../assets/images/Tron-Icon.png';


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