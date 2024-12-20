import React, { useState, useEffect } from 'react';
import '../styles/AI-styles.css';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';


const AI = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [results, setResults] = useState([]);

  const getValue = (value) => {
    if (value.trim() !== "") {
      clearDivs();
      aiSearch(value);
    } else {
      errorInput();
    }
  };

  useEffect(() => {
    const savedInputValue = localStorage.getItem('userInput');
    if (savedInputValue && savedInputValue.trim() !== '') {
      setInputValue(savedInputValue);
      getValue(savedInputValue);
    }
  }, []); // This effect only needs to run once on mount
  
  const toggleLoading = () => {
    setLoading(( prev ) => !prev);
  };

  const clearDivs = () => {
    setOutput('');
    setResults([]);
  };

  const errorInput = () => {
    console.log("There is no input");
    toggleLoading();
  };

  const aiSearch = (query) => {
    toggleLoading();
    let encodedQuery = encodeURI(query);
    fetch('https://tronai.io/v1/g_query?query=' + encodedQuery, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        toggleLoading();
        typeText(data.data.answer);
        appendSearchResults(data.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const typeText = (text) => {
    const words = text.split(' ');
    let index = -1;
    const interval = 50; // Adjust the typing speed (in milliseconds)

    const typeWord = () => {
      if (index < words.length-1) {
        setOutput((prev) => prev + (prev ? ' ' : '') + words[index]);
        index++;
        setTimeout(typeWord, interval);
      }
    };
    typeWord();
  };

  const appendSearchResults = (data) => {
    const newResults = data.pages.map(page => ({
      link: page.link,
      title: page.title,
      snippet: page.snippet
    }));
    
    setResults(newResults);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    localStorage.setItem('inputValue', e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getValue(inputValue);
    }
  };

  const handleButtonClick = () => {
    getValue(inputValue);
  };

  return (
    <div className="AI-outer-container">
      <div className="search-container">
        <div className="inner-search">
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16" height="16" fill="#FF0000" className="bi bi-search" viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.394 1.394l3.75 3.75a1 1 0 0 0 1.415-1.415l-3.75-3.75zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
  
          <input
            id="myInput"
            type="text"
            placeholder="Ask TronAI"
            value={inputValue}
            spellCheck="false"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleButtonClick} id="toggleBtn">AI Analyze</button>
        </div>
      </div>
  
      {loading && (
        <LoadingAnimation />
      )}
  
      {!loading && ( // Only render these divs when not loading
        <div className="output">
          <div className="AI-Container">
            <div id="ai-header">Generated Answer</div>
            <div id="ai-text">{output}</div>
          </div>
          <div className="result-container">
            <div id="reference-header">Reference Documentation</div>
            {results.map((result, index) => (
              <div key={index} className="AI-Search-Results">
                <a id="search-link" href={result.link} target="_blank" rel="noopener noreferrer">
                  <div id="results-link">{result.link}</div>
                  <div id="results-header">{result.title}</div>
                  <div id="results-description">{result.snippet}</div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AI;