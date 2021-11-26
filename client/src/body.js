import React, { useEffect, useState } from "react";
import "./chat.css";

const Body = ({ ...props }) => {
  const [message, setMessage] = useState("");
  const [peersNewMessages, setPeersNewMessages] = useState(
    props.peersNewMessages
  );
  const [currentPeerId, setCurrentPeerId] = useState(-1);
  const setPeerInfo = (key) => {
    props.onChangePeer(key);
    setCurrentPeerId(key);
  };
  const onSend = () => {
    props.onSend(message, currentPeerId);
    setMessage("");
  };
  const messageModified = (value) => {
    setMessage(value);
    if (value !== "") {
      props.setMessageModified(true, currentPeerId);
    } else {
      props.setMessageModified(false, currentPeerId);
    }
  };
  useEffect(() => {
    setPeersNewMessages(props.peersNewMessages);
  }, [props.peersNewMessages]);

  return (
    <div className="container">
      <div className="page-title">
        <div className="row gutters">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <h5 className="title">
              <img src="../../soulmed/src/logo.png" alt="" />
            </h5>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card m-0">
              <div className="row no-gutters">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                  <div className="users-container">
                    <ul className="users">
                      {Object.keys(props.data).map((key, keyIndex) => {
                        if (
                          key === currentPeerId &&
                          peersNewMessages.messages &&
                          peersNewMessages.messages.get(key)
                        ) {
                          peersNewMessages.messages.set(key, null);
                        }
                        return (
                          props.userId !== key && (
                            <li
                              key={key}
                              onClick={() => setPeerInfo(key)}
                              className="person"
                              data-chat="person1"
                            >
                              <div className="user d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <img
                                    src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                                    alt="Retail Admin"
                                  />
                                  <div className="name-time mx-3 d-flex flex-column">
                                    <span className="name">
                                      {props.data[key]}
                                    </span>
                                    {peersNewMessages.messages &&
                                      peersNewMessages.messages.get(key) && (
                                        <em className="new_messages">
                                          {peersNewMessages.messages.get(key) +
                                            " new messages"}{" "}
                                        </em>
                                      )}
                                    {props.typingPeers.typings &&
                                      props.typingPeers.typings.get(key) && (
                                        <em>typing...</em>
                                      )}
                                  </div>
                                </div>

                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    onClick={() => props.onVideoClick(key)}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    onClick={() => props.onAudioClick(key)}

                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </li>
                          )
                        );
                      })}
                    </ul>
                  </div>
                </div>
                {currentPeerId !== -1 &&
                  (props.peerMessages.length === 0 ||
                    (props.peerMessages.length !== 0 &&
                      (props.peerMessages[0].from === currentPeerId ||
                        props.peerMessages[0].to === currentPeerId))) && (
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                      <div className="selected-user">
                        <span>
                          To:{" "}
                          <span className="name">
                            {props.data[currentPeerId]}
                          </span>
                        </span>
                      </div>
                      <div className="chat-container">
                        <ul className="chat-box chatContainerScroll">
                          {props.peerMessages.map((message) => {
                            return props.userId === message.from ? (
                              <li className="chat-left">
                                <div className="chat-avatar">
                                  <img
                                    src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                                    alt="Retail Admin"
                                  />
                                  <div className="chat-name">
                                    {props.data[message.from]}
                                  </div>
                                </div>
                                <div className="chat-text">
                                  {message.message}
                                </div>
                                <div className="chat-hour">
                                  {message.date}{" "}
                                  <span className="fa fa-check-circle"></span>
                                </div>
                              </li>
                            ) : (
                              <li className="chat-right">
                                <div className="chat-hour">
                                  {message.date}
                                  <span className="fa fa-check-circle"></span>
                                </div>
                                <div className="chat-text">
                                  {message.message}
                                </div>
                                <div className="chat-avatar">
                                  <img
                                    src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                                    alt="Retail Admin"
                                  />
                                  <div className="chat-name">
                                    {props.data[message.from]}
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="form-group mt-3 mb-0">
                          <textarea
                            className="form-control"
                            rows="3"
                            value={message}
                            placeholder="Type your message here..."
                            onChange={(e) => messageModified(e.target.value)}
                          ></textarea>
                          <button onClick={() => onSend()}>Send</button>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
