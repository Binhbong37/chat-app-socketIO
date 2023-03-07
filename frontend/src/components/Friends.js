import React from 'react';

// import { FaRegCheckCircle } from 'react-icons/fa';

const Friends = (props) => {
    return (
        <div className="friend">
            <div className="friend-image">
                <div className="image">
                    <img src={'/image/8.jpg'} alt="" />
                </div>
            </div>

            <div className="friend-name-seen">
                <div className="friend-name">
                    <h4>Binh</h4>
                    <div className="msg-time"></div>
                </div>
            </div>
        </div>
    );
};

export default Friends;
