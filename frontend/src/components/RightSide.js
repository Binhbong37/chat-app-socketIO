import React from 'react';
import { FaPhoneAlt, FaVideo, FaRocketchat } from 'react-icons/fa';
import FriendInfo from './FriendInfo';
import Message from './Message';
import MessageSend from './MessageSend';

const RightSide = ({
    currentFriends,
    handleInputValue,
    newMessage,
    submitInput,
    message,
    scrollRef,
    emoji,
    imageChat,
    acitveUser,
    typingMessage,
}) => {
    return (
        <div className="col-9">
            <div className="right-side">
                <input type={'checkbox'} id="dot" />
                <div className="row">
                    <div className="col-8">
                        <div className="message-send-show">
                            <div className="header">
                                <div className="image-name">
                                    <div className="image">
                                        <img
                                            src={`/image/${currentFriends.image}`}
                                            alt={currentFriends.userName}
                                        />
                                        {acitveUser &&
                                        acitveUser.length > 0 &&
                                        acitveUser.some(
                                            (u) =>
                                                u.userId === currentFriends._id
                                        ) ? (
                                            <div className="active-icon"></div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div className="name">
                                        <h3>{currentFriends.userName}</h3>
                                    </div>
                                </div>
                                <div className="icons">
                                    <div className="icon">
                                        <FaPhoneAlt />
                                    </div>
                                    <div className="icon">
                                        <FaVideo />
                                    </div>
                                    <div className="icon">
                                        <label htmlFor="dot">
                                            <FaRocketchat />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <Message
                                message={message}
                                currentFriends={currentFriends}
                                scrollRef={scrollRef}
                                typingMessage={typingMessage}
                            />
                            <MessageSend
                                newMessage={newMessage}
                                handleInputValue={handleInputValue}
                                submitInput={submitInput}
                                emoji={emoji}
                                imageChat={imageChat}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <FriendInfo
                            friendInfo={currentFriends}
                            acitveUser={acitveUser}
                            message={message}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSide;
