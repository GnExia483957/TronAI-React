import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home';
import AI from './Pages/AI';
import Agent from './Pages/Agent';
import News from './components/News/News';
import Test from './Pages/Test';


const App = () => {
    return (
        <Router>
            <div className="body"></div>
            <Navbar />
            <News />
            {/* <Agent /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AI" element={<AI />} />
                {/* <Route path="/Test" element={<Test />} /> */}
            </Routes>
        </Router>
    );
};

export default App;