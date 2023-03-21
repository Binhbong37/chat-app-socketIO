import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SUCCESS_MESSAGE_CLEAR } from '../store/types/authType';
import { useAlert } from 'react-alert';

const HomeComing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { authenticate, successMessage } = useSelector((state) => state.auth);

    useEffect(() => {
        if (authenticate) {
            navigate('/');
        }

        if (successMessage) {
            alert.success(successMessage);
            dispatch({ type: SUCCESS_MESSAGE_CLEAR });
        }
    }, [authenticate, navigate, successMessage]);
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
