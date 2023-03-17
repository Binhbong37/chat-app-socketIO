import React, { useEffect, useState, useRef } from 'react';
import { FaEllipsisH, FaEdit, FaSistrix, FaSignOutAlt } from 'react-icons/fa';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import { useDispatch, useSelector } from 'react-redux';
import { SOCKET_MESSAGE } from '../store/types/messengerType';
// import { getFriends,messageSend,,,seenMessage,updateMessage,getTheme,themeSet } from '../store/actions/messengerAction';
import {
    getFriends,
    messageSend,
    getMessage,
    ImageMessageSend,
} from '../store/actions/messengerAction';
// import {userLogout } from '../store/actions/authAction';

// import toast,{Toaster} from 'react-hot-toast';
import { io } from 'socket.io-client';
// import useSound from 'use-sound';
// import notificationSound from '../audio/notification.mp3';
// import sendingSound from '../audio/sending.mp3';

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

    const dispatch = useDispatch();
    const { friends, message } = useSelector((state) => state.messenger);
    const { myInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log('UE getFriends');
        dispatch(getFriends());
    }, [dispatch]);

    // Get if have Friends
    useEffect(() => {
        console.log('UE check Friends');
        if (friends && friends.length > 0) {
            setCurrentFriends(friends[0]);
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
        const data = {
            senderName: myInfo.userName,
            reseverId: currentFriends._id,
            message: newMessage ? newMessage : '❤️',
        };

        socket.current.emit('sendMessage', {
            senderId: myInfo.id,
            senderName: myInfo.userName,
            reseverId: currentFriends._id,
            time: new Date(),
            message: {
                text: newMessage ? newMessage : '❤️',
                image: '',
            },
        });

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
    }, []);

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
                            {acitveUser && acitveUser.length > 0
                                ? acitveUser.map((userActive) => (
                                      <ActiveFriend
                                          key={userActive.socketId}
                                          userActive={userActive}
                                          setCurrentFriends={setCurrentFriends}
                                      />
                                  ))
                                : ''}
                        </div>
                        <div className="friends">
                            {friends && friends.length > 0
                                ? friends.map((fr) => (
                                      <div
                                          key={fr._id}
                                          className={
                                              currentFriends._id === fr._id
                                                  ? 'hover-friend active'
                                                  : 'hover-friend'
                                          }
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
