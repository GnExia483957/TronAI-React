import React, { useState } from 'react';
import './Modal.css'; // Import CSS for styling

const Modal = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Modal Title</h2>
        <p>This is a sliding modal example.</p>
      </div>
    </div>
  );
};

const chatModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="app">
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default chatModal;