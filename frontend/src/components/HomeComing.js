import React from 'react';
import { Link } from 'react-router-dom';

const HomeComing = () => {
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
