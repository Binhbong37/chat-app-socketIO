import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomeComing = () => {
    const navigate = useNavigate();
    const { authenticate } = useSelector((state) => state.auth);

    useEffect(() => {
        if (authenticate) {
            navigate('/');
        }
    }, [authenticate, navigate]);
    return (
        <div className="homePage">
            <h3>Welcome to may app chat</h3>
            <div className="linkPage">
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Sign Up</Link>
            </div>
        </div>
    );
};

export default HomeComing;
