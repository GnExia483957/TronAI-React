import React from 'react';
import './LoadingAnimation.css'

const LoadingAnimation = () => {

  return (
    <div className="outer-loading-container">
        <div className="loading-container">
            <div className="loading-text">Answer is Generating...</div>
            <div className="loading-box"></div>
        </div>
    </div> 
  );
};

export default LoadingAnimation;