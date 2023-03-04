import React from 'react';
import { Link } from 'react-router-dom';

const HomeComing = () => {
    return (
        <div>
            <h1>Page Home welcome to may app chat</h1>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Sign Up</Link>
        </div>
    );
};

export default HomeComing;
