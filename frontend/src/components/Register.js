import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../store/actions/authAction';
import { useAlert } from 'react-alert';
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authType';
const Register = () => {
    const navigate = useNavigate();
    const alert = useAlert();

    const { authenticate, error, successMessage } = useSelector(
        (state) => state.auth
    );

    const dispatch = useDispatch();

    const [state, setstate] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: '',
    });

    const [loadImage, setLoadImage] = useState(
        'https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png'
    );

    const inputHandle = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const fileHandle = (e) => {
        // Lấy data lưu và state ở trên
        if (e.target.files.length !== 0) {
            setstate({
                ...state,
                [e.target.name]: e.target.files[0],
            });
        }

        // Hiển thị ra màn hình ô nhỏ
        const reader = new FileReader();
        reader.onload = () => {
            setLoadImage(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const register = (e) => {
        e.preventDefault();
        const { userName, email, password, confirmPassword, image } = state;
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('image', image);

        dispatch(userRegister(formData));
    };

    useEffect(() => {
        if (authenticate) {
            navigate('/');
        }
        if (successMessage) {
            alert.success(successMessage);
            console.log('Success useEfffect');
            dispatch({ type: SUCCESS_MESSAGE_CLEAR });
        }

        if (error.length > 0) {
            error.map((err) => alert.error(err));
            dispatch({ type: ERROR_CLEAR });
        }
    }, [successMessage, error]);

    return (
        <div className="register">
            <div className="card">
                <div className="card-header">
                    <h3>Sign Up</h3>
                </div>

                <div className="card-body">
                    <form onSubmit={register}>
                        <div className="form-group">
                            <input
                                type="text"
                                onChange={inputHandle}
                                name="userName"
                                value={state.userName}
                                className="form-control"
                                placeholder="User Name"
                                id="username"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                onChange={inputHandle}
                                name="email"
                                value={state.email}
                                className="form-control"
                                placeholder="Email"
                                id="email"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                onChange={inputHandle}
                                name="password"
                                value={state.password}
                                className="form-control"
                                placeholder="Password"
                                id="password"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                onChange={inputHandle}
                                name="confirmPassword"
                                value={state.confirmPassword}
                                className="form-control"
                                placeholder="Confirm Password"
                                id="confirmPassword"
                            />
                        </div>

                        <div className="form-group">
                            <div className="file-image">
                                <div className="image">
                                    {loadImage ? (
                                        <img src={loadImage} alt="igm" />
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className="file">
                                    <label htmlFor="image">Select Image</label>
                                    <input
                                        type="file"
                                        onChange={fileHandle}
                                        name="image"
                                        className="form-control"
                                        id="image"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                value="register"
                                className="btn"
                            />
                        </div>

                        <div className="form-group">
                            <span>
                                <Link to="/login">
                                    {' '}
                                    Login with your account{' '}
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
