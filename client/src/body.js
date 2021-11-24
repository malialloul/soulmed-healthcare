import React from "react";
import "./chat.css";

const Body = ({ ...props }) => {
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
                    <div className="chat-search-box">
                      <div className="input-group">
                        <input className="form-control" placeholder="Search" />
                        <div className="input-group-btn">
                          <button type="button" className="btn btn-info">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 20 20"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <ul className="users">
                      {Object.keys(props.data).map((key, i) => {
                        return (
                          props.userId !== key && (
                            <li className="person" data-chat="person1">
                              <div className="user d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <img
                                    src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                                    alt="Retail Admin"
                                  />
                                  <div className="name-time mx-3">
                                    <span className="name">{key}</span>
                                  </div>
                                </div>

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
                              </div>
                            </li>
                          )
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                  <div className="selected-user">
                    <span>
                      To: <span className="name">Abo 3leesh</span>
                    </span>
                  </div>
                  <div className="chat-container">
                    <ul className="chat-box chatContainerScroll">
                      <li className="chat-left">
                        <div className="chat-avatar">
                          <img
                            src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                            alt="Retail Admin"
                          />
                          <div className="chat-name">Ali</div>
                        </div>
                        <div className="chat-text">
                          Hello, I'm Ali.
                          <br />
                          How can I help you today?
                        </div>
                        <div className="chat-hour">
                          08:55 <span className="fa fa-check-circle"></span>
                        </div>
                      </li>
                      <li className="chat-right">
                        <div className="chat-hour">
                          08:56 <span className="fa fa-check-circle"></span>
                        </div>
                        <div className="chat-text">
                          Hi, Russell
                          <br /> I need more information about Developer Plan.
                        </div>
                        <div className="chat-avatar">
                          <img
                            src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                            alt="Retail Admin"
                          />
                          <div className="chat-name">Sam</div>
                        </div>
                      </li>
                    </ul>
                    <div className="form-group mt-3 mb-0">
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Type your message here..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
