import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './RouteNavigator.css';

const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '15px 30px',
    backgroundColor: '#cc0000',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'pointer',
    border: 'none',
    fontSize: '24px',
};

const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '110vh',
    width: '110vw',
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
};

const imageStyle: React.CSSProperties = {
    maxWidth: '150%',
    maxHeight: '150%',
    objectFit: 'contain',
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '2%', paddingLeft: '15%' }}>
        <img src="/RouteF4.png" alt="Route F4" style={imageStyle} />
      </div>
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2%', paddingRight: '15%' }}>
        <img src="/RouteF3.png" alt="Route F3" style={imageStyle} />
      </div>

      {/* QRコードとTOPボタン */}
      <div style={{ position: 'absolute', right: '18%', top: '82%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'black', marginBottom: '60px' }}>QRコード</span>
        <button onClick={() => navigate('/')} style={buttonStyle}>TOP</button>
      </div>

      {/* 4↑3 */}
      <div style={{ position: 'absolute', right: '3%', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontSize: '180px', color: '#cc0000', fontWeight: 'bold', lineHeight: '0.9' }}>4</span>
        <span style={{ fontSize: '130px', color: '#cc0000', lineHeight: '0.9' }}>↑</span>
        <span style={{ fontSize: '110px', color: 'black', fontWeight: 'bold', lineHeight: '0.9' }}>3</span>
      </div>
    </div>
  );
};

const RouteNavigatorContent: React.FC = () => {
  return (
    <div style={{ ...containerStyle, justifyContent: 'center', alignItems: 'center' }}>
      <h1>Route Navigator</h1>
      <p>This is the Route Navigator page.</p>
      <Link to="/" style={buttonStyle}>
        戻るボタン
      </Link>
    </div>
  );
};

const RouteNavigator: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/route-navigator" element={<RouteNavigatorContent />} />
    </Routes>
  );
};

export default RouteNavigator;
