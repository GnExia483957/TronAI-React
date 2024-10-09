import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import agentImage from '../../assets/images/Agent-Icon.png';

import '../Modal/Modal.css';
import Agent from '../Agent/Chatbot'


const Modal = ({ isOpen, onClose }) => {
    return (
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <Agent/>
        </div>
      </div>
    );
  };


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
  
    return (
      <nav>
        <Link to="/">News</Link>
        {/* <Link to="/AI">AI</Link> */}
        {/* <Link to="/Test">Test</Link> */}
        <div onClick={openModal}><img id="agent-image" src={agentImage} alt="logo" /></div>
        <Modal isOpen={isOpen} onClose={closeModal} />
      </nav>
    );
};

export default Navbar;