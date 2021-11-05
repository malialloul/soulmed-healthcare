import logo from "../logo.png";
import avatar from "../avatar.jpeg";
import { Outlet, Link } from "react-router-dom";
import {useTranslation} from "react-i18next";
import classNames from "classnames";

const NavBar = () => {
  const [t, i18n] = useTranslation("common");

  const logged = true;
  const role = "patient"
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img className="logo" src={logo} alt="" />
        </a>
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
          <ul className={classNames("navbar-nav mb-2 mb-lg-0", {
            "ms-auto": i18n.language === "en",
            "me-auto": i18n.language === "ar",
          })}>
            <li className="nav-item nav-page">
              <Link to="/" className="nav-link">
                {t("common.home")}
              </Link>
            </li>
            <li className="nav-item nav-page">
              <a className="nav-link" href="#">
                Donate
              </a>
            </li>
            <li className="nav-item nav-page">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>

            <li className="nav-item nav-page">
              <a className="nav-link" href="#">
                Contact Us
              </a>
            </li>
            <li className="nav-item nav-page">
              <a className="nav-link" href="#">
                Help
              </a>
            </li>
            {logged ? (
              <li className="nav-item dropdown d-flex flex-column">
                <a
                  className="nav-link dropdown-toggle d-flex justify-content-center align-items-center"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={avatar} className="profile-pic  " alt="" />
                </a>

                {
                  role === "patient" ? 
                  <div
                  className="dropdown-menu dropdown-menu-end"
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
                :
                <div
                className="dropdown-menu dropdown-menu-end"
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
                }
               
              </li>
            ) : (
              <li className="user d-flex align-items-center">
                <a className="nav-link" href="#">
                  Login
                </a>
                <span>/</span>
                <a className="nav-link" href="#">
                  Register
                </a>
              </li>
            )}
            <li className="user d-flex align-items-center">
              <a className="nav-link" href="#" onClick={() => i18n.changeLanguage('en')}>
                EN
              </a>
              <span>/</span>
              <a className="nav-link" href="#" onClick={() => i18n.changeLanguage('ar')}>
                AR
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
