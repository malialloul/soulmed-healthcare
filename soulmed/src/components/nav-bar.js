import React, { useState } from "react";
import logo from "../logo.png";
import avatar from "../avatar.jpeg";
import { Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import LoginModel from "./login-model";
import DropDown from "../inputs/dropdown";
import Bell from "../icons/bell";

const NavBar = ({ ...props }) => {
  const [t, i18n] = useTranslation();
  const [modalLoginShow, setModalLoginShow] = useState(false);
  const [submit, onSubmit] = useState(false);
  const isSubmitted = () => {
    props.onSubmit(true);
    onSubmit(true);
  };
  const logged = false;
  const role = "patient";
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <LoginModel
          show={modalLoginShow}
          onHide={() => setModalLoginShow(false)}
          submit={() => isSubmitted()}
        />
        <div className="container-fluid">
          <Link to="/" className="nav-link">
            <img className="logo" src={logo} alt="" />
          </Link>
          

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul
              className={classNames("navbar-nav mb-2 mb-lg-0", {
                "ms-auto": i18n.language === "en",
                "me-auto": i18n.language === "ar",
              })}
            >
              <li
                className={classNames("nav-item nav-page", {
                  selected_tab: props.selectedTab === "donate",
                })}
              >
                <a className="nav-link" href="#">
                  {t("donate")}
                </a>
              </li>
              <li
                className={classNames("nav-item nav-page", {
                  selected_tab: props.selectedTab === "products",
                })}
              >
                {" "}
                <Link to="/products" className="nav-link">
                  Products
                </Link>
              </li>

              <li
                className={classNames("nav-item nav-page", {
                  selected_tab: props.selectedTab === "contact_us",
                })}
              >
                {" "}
                <a className="nav-link" href="#">
                  Contact Us
                </a>
              </li>
              <li
                className={classNames("nav-item nav-page", {
                  selected_tab: props.selectedTab === "help",
                })}
              >
                {" "}
                <a className="nav-link" href="#">
                  Help
                </a>
              </li>
              {submit && (
                <li className="user d-flex align-items-center">
                  <Link to="/work-with-us" className="nav-link">
                    Want to work with us?
                  </Link>
                </li>
              )}
              {logged ? (
                <li className="nav-item dropdown d-flex flex-column">
                  <a
                    className="nav-link dropdown-toggle d-flex justify-content-center align-items-center"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={avatar} className="profile-pic  " alt="" />
                  </a>

                  {role === "patient" ? (
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <a className="dropdown-item dropdown" href="#">
                        Dashboard or feed
                      </a>
                      <a className="dropdown-item" href="#">
                        Inbox
                      </a>
                      <a className="dropdown-item" href="#">
                        Profile Settings
                      </a>
                      <a className="dropdown-item" href="#">
                        Account Settings
                      </a>
                      <a className="dropdown-item" href="#">
                        Appointment list
                      </a>
                      <a className="dropdown-item" href="#">
                        Favorite Doctors
                      </a>
                      <a className="dropdown-item" href="#">
                        Purchases
                      </a>
                      <a className="dropdown-item" href="#">
                        Logout
                      </a>
                    </div>
                  ) : (
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <a className="dropdown-item dropdown" href="#">
                        Dashboard
                      </a>
                      <a className="dropdown-item" href="#">
                        Go online/offline
                      </a>
                      <a className="dropdown-item" href="#">
                        View my Profile
                      </a>
                      <a className="dropdown-item" href="#">
                        Profile Settings
                      </a>
                      <a className="dropdown-item" href="#">
                        Account list
                      </a>
                      <a className="dropdown-item" href="#">
                        Appointment Doctors
                      </a>
                      <a className="dropdown-item" href="#">
                        Appointment list
                      </a>
                      <a className="dropdown-item" href="#">
                        Articles
                      </a>
                      <a className="dropdown-item" href="#">
                        Payout Settings
                      </a>
                    </div>
                  )}
                </li>
              ) : (
                <li className="user d-flex align-items-center">
                  <a
                    className="nav-link"
                    onClick={() => setModalLoginShow(true)}
                    href="#"
                  >
                    Login/Register
                  </a>
                </li>
              )}
              <li className="user d-flex align-items-center">
                <DropDown>
                  <div className="notification">
                      <Bell />
                    <div className="notification-badge">5</div>
                  </div>
                </DropDown>
              </li>

              <li className="user d-flex align-items-center">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => i18n.changeLanguage("en")}
                >
                  EN
                </a>
                <span>/</span>
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => i18n.changeLanguage("ar")}
                >
                  AR
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
