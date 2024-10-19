import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import MySvgImage from './TV - 1.svg'; // SVG import path
import NextPage from './NextPage';
import RouteNavigator from './RouteNavigator';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/next');
    };

    return (
<div
  style={{
    position: 'fixed',
    top: 0,
    left: -13,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
  }}
  onClick={handleClick}
>
  <img
    src={MySvgImage}
    alt="My SVG"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }}
  />
</div>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/next" element={<NextPage />} />
                <Route path="/router-navigator" element={<RouteNavigator />} />
            </Routes>
        </Router>
    );
};

export default App;
