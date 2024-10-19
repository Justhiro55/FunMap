import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NextPage: React.FC = () => {
    const navigate = useNavigate();

    const buttonStyle = {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
        textAlign: 'center' as const,
        cursor: 'pointer',
        marginRight: '10px',
    };

    const handleNavigateToRouterNavigator = () => {
        navigate('/router-navigator');
    };

    return (
        <div>
            <h1>다음 화면입니다!</h1>
            <p>여기에서 추가 내용을 넣을 수 있습니다.</p>
            <Link to="/" style={buttonStyle}>
                戻るボタン
            </Link>
            <button onClick={handleNavigateToRouterNavigator} style={buttonStyle}>
                RouteNavigatorへ
            </button>
        </div>
    );
};

export default NextPage;
