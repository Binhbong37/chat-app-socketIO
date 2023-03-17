import React from 'react';

const ActiveFriend = ({ userActive, setCurrentFriends }) => {
    return (
        <div
            className="active-friend"
            onClick={() =>
                setCurrentFriends({
                    _id: userActive.userInfo.id,
                    email: userActive.userInfo.email,
                    image: userActive.userInfo.image,
                    userName: userActive.userInfo.userName,
                })
            }
        >
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
