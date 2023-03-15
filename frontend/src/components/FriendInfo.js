import React from 'react';
import { FaCaretSquareDown } from 'react-icons/fa';

const FriendInfo = ({ friendInfo }) => {
    return (
        <div className="friend-info">
            <input type="checkbox" id="gallery" />
            <div className="image-name">
                <div className="image">
                    <img
                        src={`/image/${friendInfo.image}`}
                        alt={friendInfo.userName}
                    />
                </div>
                <div className="active-user">Active</div>

                <div className="name">
                    <h4>{friendInfo.userName}</h4>
                </div>
            </div>

            <div className="others">
                <div className="custom-chat">
                    <h3>Coustomise Chat </h3>
                    <FaCaretSquareDown />
                </div>

                <div className="privacy">
                    <h3>Privacy and Support </h3>
                    <FaCaretSquareDown />
                </div>

                <div className="media">
                    <h3>Shared Media </h3>
                    <label htmlFor="gallery">
                        {' '}
                        <FaCaretSquareDown />{' '}
                    </label>
                </div>
            </div>

            <div className="gallery">
                <img src="/image/5.jpg" alt="coverP" />
                <img src="/image/5.jpg" alt="coverP" />
                <img src="/image/5.jpg" alt="coverP" />
                <img src="/image/5.jpg" alt="coverP" />
                <img src="/image/5.jpg" alt="coverP" />
            </div>
        </div>
    );
};

export default FriendInfo;
