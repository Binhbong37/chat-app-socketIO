import React from 'react';

const ActiveFriend = ({ userActive }) => {
    return (
        <div className="active-friend">
            <div className="image-active-icon">
                <div className="image">
                    <img
                        src={`/image/${userActive.userInfo.image}`}
                        alt="AtiveU"
                    />
                    <div className="active-icon"></div>
                </div>
            </div>
        </div>
    );
};

export default ActiveFriend;
