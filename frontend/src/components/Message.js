// import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
// import { FaRegCheckCircle } from 'react-icons/fa';

const Message = ({ message, currentFriends, scrollRef, typingMessage }) => {
    const { myInfo } = useSelector((state) => state.auth);
    return (
        <>
            <div className="message-show">
                {message && message.length > 0
                    ? message.map((mess) =>
                          mess.senderId === myInfo.id ? (
                              <div
                                  key={mess._id || mess.time}
                                  className="my-message"
                                  ref={scrollRef}
                              >
                                  <div className="image-message">
                                      <div className="my-text">
                                          <p className="message-text">
                                              {mess.message.text === '' ? (
                                                  <img
                                                      src={`/image/${mess.message.image}`}
                                                      alt="inputImage"
                                                  />
                                              ) : (
                                                  mess.message.text
                                              )}
                                          </p>
                                      </div>
                                  </div>
                                  <div className="time">07 March 2023</div>
                              </div>
                          ) : (
                              <div
                                  key={mess._id || mess.time}
                                  className="fd-message"
                                  ref={scrollRef}
                              >
                                  <div className="image-message-time">
                                      <img
                                          src={`/image/${currentFriends.image}`}
                                          alt={currentFriends.userName}
                                      />
                                      <div className="message-time">
                                          <div className="fd-text">
                                              <p className="message-text">
                                                  {mess.message.text === '' ? (
                                                      <img
                                                          src={`/image/${mess.message.image}`}
                                                          alt="inputImage"
                                                      />
                                                  ) : (
                                                      mess.message.text
                                                  )}
                                              </p>
                                          </div>
                                          <div className="time">
                                              07 March 2023
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          )
                      )
                    : ''}
            </div>
            {typingMessage &&
            typingMessage.msg &&
            typingMessage.senderId === currentFriends._id ? (
                <div className="typing-message">
                    <div className="fd-message">
                        <div className="image-message-time">
                            <img
                                src={`/image/${currentFriends.image}`}
                                alt={currentFriends.userName}
                            />
                            <div className="message-time">
                                <div className="fd-text">
                                    <p className="time">Typing ...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
};

// const Message = ({ message, currentfriend, scrollRef, typingMessage }) => {
//     const { myInfo } = useSelector((state) => state.auth);
//     return (
//         <>
//             <div className="message-show">
//                 {message && message.length > 0 ? (
//                     message.map((m, index) =>
//                         m.senderId === myInfo.id ? (
//                             <div ref={scrollRef} className="my-message">
//                                 <div className="image-message">
//                                     <div className="my-text">
//                                         <p className="message-text">
//                                             {' '}
//                                             {m.message.text === '' ? (
//                                                 <img
//                                                     src={`./image/${m.message.image}`}
//                                                     alt="imgCover"
//                                                 />
//                                             ) : (
//                                                 m.message.text
//                                             )}{' '}
//                                         </p>

//                                         {index === message.length - 1 &&
//                                         m.senderId === myInfo.id ? (
//                                             m.status === 'seen' ? (
//                                                 <img
//                                                     className="img"
//                                                     src={`./image/${currentfriend.image}`}
//                                                     alt=""
//                                                 />
//                                             ) : m.status === 'delivared' ? (
//                                                 <span>
//                                                     {' '}
//                                                     <FaRegCheckCircle />{' '}
//                                                 </span>
//                                             ) : (
//                                                 <span>
//                                                     {' '}
//                                                     <FaRegCheckCircle />{' '}
//                                                 </span>
//                                             )
//                                         ) : (
//                                             ''
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="time">
//                                     {moment(m.createdAt)
//                                         .startOf('mini')
//                                         .fromNow()}
//                                 </div>
//                             </div>
//                         ) : (
//                             <div ref={scrollRef} className="fd-message">
//                                 <div className="image-message-time">
//                                     <img
//                                         src={`./image/${currentfriend.image}`}
//                                         alt=""
//                                     />
//                                     <div className="message-time">
//                                         <div className="fd-text">
//                                             <p className="message-text">
//                                                 {' '}
//                                                 {m.message.text === '' ? (
//                                                     <img
//                                                         src={`./image/${m.message.image}`}
//                                                         alt="igmBg"
//                                                     />
//                                                 ) : (
//                                                     m.message.text
//                                                 )}{' '}
//                                             </p>
//                                         </div>
//                                         <div className="time">
//                                             {moment(m.createdAt)
//                                                 .startOf('mini')
//                                                 .fromNow()}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )
//                     )
//                 ) : (
//                     <div className="friend_connect">
//                         <img src={`./image/${currentfriend.image}`} alt="" />
//                         <h3>{currentfriend.userName} Connect You </h3>
//                         <span>
//                             {' '}
//                             {moment(currentfriend.createdAt)
//                                 .startOf('mini')
//                                 .fromNow()}{' '}
//                         </span>
//                     </div>
//                 )}
//             </div>
//             {typingMessage &&
//             typingMessage.msg &&
//             typingMessage.senderId === currentfriend._id ? (
//                 <div className="typing-message">
//                     <div className="fd-message">
//                         <div className="image-message-time">
//                             <img
//                                 src={`./image/${currentfriend.image}`}
//                                 alt=""
//                             />
//                             <div className="message-time">
//                                 <div className="fd-text">
//                                     <p className="time">Typing Message.... </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 ''
//             )}
//         </>
//     );
// };

export default Message;
