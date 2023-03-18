import React from 'react';
import moment from 'moment';

// import { FaRegCheckCircle } from 'react-icons/fa';

const Friends = ({ friends, myId }) => {
    const { fndInfo, msgInfo } = friends;

    return (
        <div className="friend">
            <div className="friend-image">
                <div className="image">
                    <img
                        src={`image/${fndInfo.image}`}
                        alt={fndInfo.userName}
                    />
                </div>
            </div>

            <div className="friend-name-seen">
                <div className="friend-name">
                    <h4>{fndInfo.userName}</h4>
                    <div className="msg-time">
                        {msgInfo && msgInfo.senderId === myId.id ? (
                            <span>You </span>
                        ) : (
                            <span>{fndInfo.userName + ' '}</span>
                        )}
                        {msgInfo && msgInfo.message.text ? (
                            <span>{msgInfo.message.text.slice(0, 10)} </span>
                        ) : msgInfo.message.image ? (
                            <span>Sent a image </span>
                        ) : (
                            <span>Connect you</span>
                        )}
                        <span>
                            {msgInfo
                                ? moment(msgInfo.createdAt)
                                      .startOf('mini')
                                      .fromNow()
                                : moment(fndInfo.createdAt)
                                      .startOf('mini')
                                      .fromNow()}
                        </span>
                    </div>
                </div>
                {myId.id === msgInfo?.senderId ? (
                    <div className="seen-unseen-icon">
                        <img src={`/image/${fndInfo.image}`} alt="seen" />
                    </div>
                ) : (
                    <div className="seen-unseen-icon">
                        <div className="seen-icon"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Friends;
