import React from 'react';

// import { FaRegCheckCircle } from 'react-icons/fa';

const Friends = ({ friends }) => {
    return (
        <div className="friend">
            <div className="friend-image">
                <div className="image">
                    <img
                        src={`image/${friends.image}`}
                        alt={friends.userName}
                    />
                </div>
            </div>

            <div className="friend-name-seen">
                <div className="friend-name">
                    <h4>{friends.userName}</h4>
                    <div className="msg-time"></div>
                </div>
            </div>
        </div>
    );
};

export default Friends;
