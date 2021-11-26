import { useRef, useEffect, useState } from "react";
import "../css/login-model.css";
import RegistrationModal from "./registration-modal";
import { Modal } from "react-bootstrap";
import io from "socket.io-client";
import { userContoller } from "../controllers/user-controller";
import { useForm, Controller } from "react-hook-form";
import { userService } from "../services/userService";

const LoginModel = ({ ...props }) => {
  const [modalRegistrationShow, setModalRegistrationShow] = useState(false);
  const [modalLoginShow, setModalLoginShow] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const { register, handleSubmit, reset, formState, watch, control } = useForm({
    mode: "onChange",
  });

  const { errors, isDirty, isSubmitting, isValid } = formState;

  const onSubmitHandler = (data) => {
    setModalLoginShow(false);
    const userLoginData = userService.loginUser(data);
    console.log(userLoginData);
    reset();
  };

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
    //  setModalRegistrationShow(false);
    //setModalLoginShow(false);
    //setSubmitted(true);
    //props.submit(true);
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
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="form-group">
                <input
                  type="text"
                  {...register("username")}
                  placeholder="Email address or username"
                  className="input full-width"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  className="input full-width"
                />
              </div>
              <div className="login">
                <input
                  className="btn"
                  type="submit"
                  disabled={!isDirty || !isValid}
                  value="Login"
                />
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
