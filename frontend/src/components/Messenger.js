import React, { useEffect, useState, useRef } from 'react';
import { FaEllipsisH, FaEdit, FaSistrix, FaSignOutAlt } from 'react-icons/fa';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import { useDispatch, useSelector } from 'react-redux';
import {
    MESSAGE_SEND_SUCCESS_CLEAR,
    SOCKET_MESSAGE,
    UPDATE_FRIEND_MESSAGE,
    SEEN_MESSAGE,
    DELIVARED_MESSAGE,
    UPDATE,
    MESSAGE_GET_SUCCESS_CLEAR,
    SEEN_ALL,
} from '../store/types/messengerType';
import {
    getFriends,
    messageSend,
    getMessage,
    ImageMessageSend,
    seenMessage,
    updateMessage,
    themeSet,
    getTheme,
} from '../store/actions/messengerAction';
import { userLogout } from '../store/actions/authAction';

import toast, { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';
import useSound from 'use-sound';
import notificationSound from '../audio/notification.mp3';
import sendingSound from '../audio/sending.mp3';

const Messenger = () => {
    const scrollRef = useRef();
    const socket = useRef();

    const [currentFriends, setCurrentFriends] = useState('');

    // take message
    const [newMessage, setNewMessage] = useState('');
    const [acitveUser, setActiveUser] = useState([]);

    // socket Mess
    const [socketMessage, setSocketMessage] = useState('');
    // typing Mess
    const [typingMessage, setTypingMessage] = useState('');
    // Show/hide Logout
    const [hide, setHide] = useState(true);

    const dispatch = useDispatch();
    const {
        friends,
        message,
        mesageSendSuccess,
        message_get_success,
        themeMood,
    } = useSelector((state) => state.messenger);

    const { myInfo } = useSelector((state) => state.auth);
    // sound
    const [notificationPlay] = useSound(notificationSound);
    const [sendingPlay] = useSound(sendingSound);
    useEffect(() => {
        console.log('UE getFriends');
        dispatch(getFriends());
    }, [dispatch]);

    // Get if have Friends
    useEffect(() => {
        console.log('UE check Friends');
        if (friends && friends.length > 0) {
            setCurrentFriends(friends[0].fndInfo);
        }
    }, [friends]);

    // getMess
    useEffect(() => {
        console.log('UE getMess');
        dispatch(getMessage(currentFriends._id));
    }, [dispatch, currentFriends?._id]);

    // Scroll
    useEffect(() => {
        console.log('UE Scroll');
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    // message_get_success
    useEffect(() => {
        console.log('UE Mess_get_sucess');
        if (message.length > 0) {
            if (
                message[message.length - 1].senderId !== myInfo.id &&
                message[message.length - 1].status === 'seen'
            ) {
                dispatch({
                    type: UPDATE,
                    payload: {
                        id: currentFriends._id,
                    },
                });
                socket.current.emit('seen', {
                    senderId: currentFriends._id,
                    reseverId: myInfo.id,
                });
                dispatch(
                    seenMessage({
                        _id: message[message.length - 1]._id,
                    })
                );
            }
        }
        dispatch({
            type: MESSAGE_GET_SUCCESS_CLEAR,
        });
    }, [message_get_success, currentFriends?._id]);

    // Add emojo
    const emoji = (emu) => {
        setNewMessage(`${newMessage}` + emu);

        socket.current.emit('typingMessage', {
            senderId: myInfo.id,
            reseverId: currentFriends._id,
            msg: emu,
        });
    };

    // Add image
    const imageChat = (e) => {
        if (e.target.files.length !== 0) {
            sendingPlay();
            const imageName = e.target.files[0].name;
            const newImageName = Date.now() + imageName;
            socket.current.emit('sendMessage', {
                senderId: myInfo.id,
                senderName: myInfo.userName,
                reseverId: currentFriends._id,
                time: new Date(),
                message: {
                    text: '',
                    image: newImageName,
                },
            });
            const formData = new FormData();
            formData.append('senderName', myInfo.userName);
            formData.append('imageName', newImageName);
            formData.append('reseverId', currentFriends._id);
            formData.append('image', e.target.files[0]);
            dispatch(ImageMessageSend(formData));
        }
    };
    // handle new massage
    const handleInputValue = (e) => {
        setNewMessage(e.target.value);
        socket.current.emit('typingMessage', {
            senderId: myInfo.id,
            reseverId: currentFriends._id,
            msg: e.target.value,
        });
    };

    // take submit
    const submitInput = (e) => {
        e.preventDefault();
        sendingPlay();
        const data = {
            senderName: myInfo.userName,
            reseverId: currentFriends._id,
            message: newMessage ? newMessage : '❤️',
        };

        socket.current.emit('typingMessage', {
            senderId: myInfo.id,
            reseverId: currentFriends._id,
            msg: '',
        });
        dispatch(messageSend(data));
        setNewMessage('');
    };

    // Socket
    useEffect(() => {
        socket.current = io('ws://localhost:8000');
        socket.current.on('getMessage', (data) => {
            setSocketMessage(data);
        });

        socket.current.on('typingMessageGet', (data) => {
            setTypingMessage(data);
        });

        socket.current.on('msgSeenResponse', (msg) => {
            dispatch({
                type: SEEN_MESSAGE,
                payload: {
                    msgInfo: msg,
                },
            });
        });

        socket.current.on('msgDelivaredResponse', (msg) => {
            dispatch({
                type: DELIVARED_MESSAGE,
                payload: {
                    msgInfo: msg,
                },
            });
        });

        socket.current.on('seenSuccess', (data) => {
            dispatch({
                type: SEEN_ALL,
                payload: data,
            });
        });
    }, [dispatch]);

    // senMess Socket
    useEffect(() => {
        console.log('EF SOCKET SendMess');
        if (socketMessage && currentFriends) {
            if (
                socketMessage.senderId === currentFriends._id &&
                socketMessage.reseverId === myInfo.id
            ) {
                dispatch({
                    type: SOCKET_MESSAGE,
                    payload: {
                        message: socketMessage,
                    },
                });

                dispatch(seenMessage(socketMessage));

                socket.current.emit('messageSeen', socketMessage);

                dispatch({
                    type: UPDATE_FRIEND_MESSAGE,
                    payload: {
                        msgInfo: socketMessage,
                        status: 'seen',
                    },
                });
            }
        }
        setSocketMessage('');
    }, [socketMessage]);
    // EMIT SOCKET
    useEffect(() => {
        console.log('EF SOCKET addUser');
        socket.current.emit('addUser', myInfo.id, myInfo);
    }, [myInfo]);

    // Nhận lại data từ socket

    useEffect(() => {
        console.log('EF SOCKET getUser');
        socket.current.on('getUser', (users) => {
            const filterUser = users.filter((u) => u.userId !== myInfo.id);
            setActiveUser(filterUser);
        });
    }, []);

    // mesageSendSuccess
    useEffect(() => {
        if (mesageSendSuccess) {
            socket.current.emit('sendMessage', message[message.length - 1]);
            dispatch({
                type: UPDATE_FRIEND_MESSAGE,
                payload: {
                    msgInfo: message[message.length - 1],
                },
            });

            dispatch({
                type: MESSAGE_SEND_SUCCESS_CLEAR,
            });
        }
    }, [mesageSendSuccess]);

    // TOAST
    useEffect(() => {
        console.log('TOST');
        if (
            socketMessage &&
            socketMessage.senderId !== currentFriends._id &&
            socketMessage.reseverId === myInfo.id
        ) {
            notificationPlay();
            toast.success(`${socketMessage.senderName} send a new message`);
            dispatch(updateMessage(socketMessage));
            socket.current.emit('delivaredMessage', socketMessage);
            dispatch({
                type: UPDATE_FRIEND_MESSAGE,
                payload: {
                    msgInfo: socketMessage,
                    status: 'delivared',
                },
            });
        }
    }, [socketMessage]);

    // LOGOUT
    const logout = () => {
        dispatch(userLogout());
        socket.current.emit('logout', myInfo.id);
    };

    // DARKMODE
    useEffect(() => {
        dispatch(getTheme());
    }, []);

    return (
        <div className={themeMood === 'dark' ? 'messenger theme' : 'messenger'}>
            <Toaster
                position={'top-right'}
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '18px',
                    },
                }}
            />
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
                                <div
                                    className="icon"
                                    onClick={() => setHide((prev) => !prev)}
                                >
                                    <FaEllipsisH />
                                </div>
                                <div className="icon">
                                    <FaEdit />
                                </div>

                                <div
                                    className={
                                        hide
                                            ? 'theme_logout'
                                            : 'theme_logout show'
                                    }
                                >
                                    <h3>Dark mode</h3>
                                    <div className="on">
                                        <label htmlFor="dark">ON</label>
                                        <input
                                            type={'radio'}
                                            value="dark"
                                            id="dark"
                                            name="theme"
                                            onChange={(e) =>
                                                dispatch(
                                                    themeSet(e.target.value)
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="of">
                                        <label htmlFor="white">OFF</label>
                                        <input
                                            type={'radio'}
                                            value="white"
                                            id="white"
                                            name="theme"
                                            onChange={(e) =>
                                                dispatch(
                                                    themeSet(e.target.value)
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="logout" onClick={logout}>
                                        <FaSignOutAlt /> Logout
                                    </div>
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
                        {/* <div className="active-friends">
                            {acitveUser && acitveUser.length > 0
                                ? acitveUser.map((userActive) => (
                                      <ActiveFriend
                                          key={userActive.socketId}
                                          userActive={userActive}
                                          setCurrentFriends={setCurrentFriends}
                                      />
                                  ))
                                : ''}
                        </div> */}
                        <div className="friends">
                            {friends && friends.length > 0
                                ? friends.map((fr) => (
                                      <div
                                          key={fr.fndInfo._id}
                                          className={
                                              currentFriends._id ===
                                              fr.fndInfo._id
                                                  ? 'hover-friend active'
                                                  : 'hover-friend'
                                          }
                                          onClick={() =>
                                              setCurrentFriends(fr.fndInfo)
                                          }
                                      >
                                          <Friends
                                              friends={fr}
                                              myId={myInfo.id}
                                              acitveUser={acitveUser}
                                          />
                                      </div>
                                  ))
                                : 'No Friend'}
                        </div>
                    </div>
                </div>
                {currentFriends ? (
                    <RightSide
                        currentFriends={currentFriends}
                        handleInputValue={handleInputValue}
                        newMessage={newMessage}
                        submitInput={submitInput}
                        message={message}
                        scrollRef={scrollRef}
                        emoji={emoji}
                        imageChat={imageChat}
                        acitveUser={acitveUser}
                        typingMessage={typingMessage}
                    />
                ) : (
                    'Please select your friend'
                )}
            </div>
        </div>
    );
};

export default Messenger;
