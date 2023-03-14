import React, { useEffect } from 'react';
import { FaEllipsisH, FaEdit, FaSistrix, FaSignOutAlt } from 'react-icons/fa';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import { useDispatch } from 'react-redux';
// import { getFriends,messageSend,getMessage,ImageMessageSend,seenMessage,updateMessage,getTheme,themeSet } from '../store/actions/messengerAction';
import { getFriends } from '../store/actions/messengerAction';
// import {userLogout } from '../store/actions/authAction';

// import toast,{Toaster} from 'react-hot-toast';
// import {io} from 'socket.io-client';
// import useSound from 'use-sound';
// import notificationSound from '../audio/notification.mp3';
// import sendingSound from '../audio/sending.mp3';

const Messenger = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriends());
    }, [dispatch]);

    return (
        <div className="messenger">
            <div className="row">
                <div className="col-3">
                    <div className="left-side">
                        <div className="top">
                            <div className="image-name">
                                <div className="image">
                                    <img src="/image/5.jpg" alt="coverP" />
                                </div>
                                <div className="name">
                                    <h3>Be Anh</h3>
                                </div>
                            </div>
                            <div className="icons">
                                <div className="icon">
                                    <FaEllipsisH />
                                </div>
                                <div className="icon">
                                    <FaEdit />
                                </div>
                            </div>
                        </div>
                        <div className="friend-search">
                            <div className="search">
                                <button>
                                    <FaSistrix />
                                </button>
                                <input
                                    placeholder="search"
                                    type={'text'}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="active-friends">
                            <ActiveFriend />
                        </div>
                        <div className="friends">
                            <div className="hover-friend active">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                        </div>
                    </div>
                </div>
                <RightSide />
            </div>
        </div>
    );
};

export default Messenger;
