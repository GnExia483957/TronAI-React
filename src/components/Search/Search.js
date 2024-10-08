import React, { useState } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';


const Search = () => {
  const [inputValue, setInputValue] = useState('');

  const saveInput = () => {
    console.log(inputValue); // You can replace this with your desired functionality
  };


const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    console.log(inputValue); // You can replace this with your desired functionality

  }
};


  return (
    <div className="search-container">
      <div className="inner-search">
        <div className="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#FF0000"
            className="bi bi-search"
            viewBox="0 0 16 16"
            >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.394 1.394l3.75 3.75a1 1 0 0 0 1.415-1.415l-3.75-3.75zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
        <input
          className="btn"
          id="input-field"
          type="text"
          placeholder="Ask TronAI"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          />
        <Link to="/AI">
          <button id="toggleBtn" onClick={saveInput}>
            AI Analyze
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Search;