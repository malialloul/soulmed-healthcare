import { useEffect, useState } from "react";
import "../css/login-model.css";
import RegistrationModal from "./registration-modal";
import { Modal } from "react-bootstrap";

const LoginModel = ({ ...props }) => {
  const [modalRegistrationShow, setModalRegistrationShow] = useState(false);
  const [modalLoginShow, setModalLoginShow] = useState(false);

  useEffect(() => {
    setModalLoginShow(props.show);
  }, [props]);

  const [submitted, setSubmitted] = useState(false);

  const createNewAccount = (e) => {
    e.preventDefault();
    setModalLoginShow(false);
    setModalRegistrationShow(true);
  };

  const registerSubmit = () => {
    setModalRegistrationShow(false);
    setModalLoginShow(false);
    setSubmitted(true);
    props.submit(true);
  };

  return (
    <>
      <Modal
        show={submitted ? false : modalLoginShow}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="signup-title">
              <span className="title">Login</span> <br />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
      </Modal>

      <RegistrationModal
        onSubmit={() => registerSubmit()}
        show={modalRegistrationShow}
        onHide={() => setModalRegistrationShow(false)}
      />
    </>
  );
};

export default LoginModel;
