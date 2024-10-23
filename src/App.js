import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './Pages/Home';
import AI from './Pages/AI';
import Test from './Pages/Test';


const App = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AI" element={<AI />} />
                <Route path="/Test" element={<Test />} />
            </Routes>
        </Router>
    );
};

export default App;