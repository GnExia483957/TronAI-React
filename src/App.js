import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home';
import AI from './Pages/AI';

const App = () => {
    return (
        <Router>
            <div className="body"></div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AI />} />
            </Routes>
        </Router>
    );
};

export default App;