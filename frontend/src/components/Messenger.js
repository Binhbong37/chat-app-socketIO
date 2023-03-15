import React, { useEffect, useState } from 'react';
import { FaEllipsisH, FaEdit, FaSistrix, FaSignOutAlt } from 'react-icons/fa';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import { useDispatch, useSelector } from 'react-redux';
// import { getFriends,messageSend,getMessage,ImageMessageSend,seenMessage,updateMessage,getTheme,themeSet } from '../store/actions/messengerAction';
import { getFriends } from '../store/actions/messengerAction';
// import {userLogout } from '../store/actions/authAction';

// import toast,{Toaster} from 'react-hot-toast';
// import {io} from 'socket.io-client';
// import useSound from 'use-sound';
// import notificationSound from '../audio/notification.mp3';
// import sendingSound from '../audio/sending.mp3';

const Messenger = () => {
    const [currentFriends, setCurrentFriends] = useState('');
    console.log({ currentFriends });
    const dispatch = useDispatch();
    const { friends } = useSelector((state) => state.messenger);
    const { myInfo } = useSelector((state) => state.auth);
    console.log(friends);
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
                                    <img
                                        src={`./image/${myInfo.image}`}
                                        alt={myInfo.userName}
                                    />
                                </div>
                                <div className="name">
                                    <h3>{myInfo.userName}</h3>
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
                            {friends && friends.length > 0
                                ? friends.map((fr) => (
                                      <div
                                          key={fr._id}
                                          className="hover-friend"
                                          onClick={() => setCurrentFriends(fr)}
                                      >
                                          <Friends friends={fr} />
                                      </div>
                                  ))
                                : 'No Friend'}
                        </div>
                    </div>
                </div>
                {currentFriends ? (
                    <RightSide currentFriends={currentFriends} />
                ) : (
                    'Please select your friend'
                )}
            </div>
        </div>
    );
};

export default Messenger;
