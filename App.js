import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import MySvgImage from 'src/TV - 1.svg'; // 추가한 SVG 이미지 경로

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ position: 'relative', width: '500px', height: '500px' }}>
            <img 
                src={MySvgImage} 
                alt="My SVG" 
                style={{ width: '100%', height: '100%' }} 
            />
            <button 
                onClick={() => navigate('/next')} // move to next page
                style={{
                    position: 'absolute',
                    top: '50px',
                    left: '50px',
                }}
            >
                button
            </button>
        </div>
    );
};

const NextPage = () => {
    return <h1>다음 페이지</h1>;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/next" element={<NextPage />} />
            </Routes>
        </Router>
    );
};

export default App;
