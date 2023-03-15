import React from 'react';
import {
    FaPlusCircle,
    FaFileImage,
    FaGift,
    FaPaperPlane,
} from 'react-icons/fa';

const MessageSend = ({ newMessage, handleInputValue, submitInput }) => {
    const emojis = [
        '😀',
        '😃',
        '😄',
        '😁',
        '😆',
        '😅',
        '😂',
        '🤣',
        '😊',
        '😇',
        '🙂',
        '🙃',
        '😉',
        '😌',
        '😍',
        '😝',
        '😜',
        '🧐',
        '🤓',
        '😎',
        '😕',
        '🤑',
        '🥴',
        '😱',
    ];

    return (
        <div className="message-send-section">
            <input type="checkbox" id="emoji" />
            <div className="file hover-attachment">
                <div className="add-attachment">Add Attachment</div>
                <FaPlusCircle />
            </div>

            <div className="file hover-image">
                <div className="add-image">Add Image</div>
                <input type="file" id="pic" className="form-control" />
                <label htmlFor="pic">
                    {' '}
                    <FaFileImage />{' '}
                </label>
            </div>

            <div className="file hover-gift">
                <div className="add-gift">Add gift</div>
                <FaGift />
            </div>

            <div className="message-type">
                <input
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Aa"
                    className="form-control"
                    value={newMessage}
                    onChange={handleInputValue}
                />

                <div className="file hover-gift">
                    <label htmlFor="emoji"> ❤️ </label>
                </div>
            </div>

            <div className="file" onClick={submitInput}>
                <FaPaperPlane />
            </div>

            <div className="emoji-section">
                <div className="emoji">
                    {emojis.map((item, idex) => (
                        <span key={idex}>{item}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MessageSend;
