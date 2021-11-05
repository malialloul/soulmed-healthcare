import { useState } from "react";
import "../css/login-model.css"
import RegistrationModal from "./registration-modal";

const LoginModel = () => {
  const [modalShow, setModalShow] = useState(false);
  const createNewAccount = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  return (
    <>
      <div className="login-form">
        <form action="">
          <div className="form-group">
            <input
              type="text"
              placeholder="Email address or phone number"
              className="input full-width"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="input full-width"
            />
          </div>
          <div className="login">
            <a href="#" className="btn">
              log in
            </a>
          </div>
          <div className="forgot">
            <a href="">Forgot Password?</a>
          </div>
          <div className="create-btn">
            <button onClick={(e) => createNewAccount(e)} className="btn">
              create new account
            </button>
          </div>
        </form>
      </div>
      <RegistrationModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default LoginModel;