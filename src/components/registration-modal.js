import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import SelectYears from "../inputs/select-years";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/registration-modal.css"

const RegistrationModal = ({ ...props }) => {
  const [showCustomGender, setShowCustomGender] = useState(false);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="signup-title">
            <span className="title">Sign Up</span> <br />
            <span className="subtitle">It's quick and easy.</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="signup-form">
          <form action="">
            <div className="d-flex justify-content-between">
              <input type="text" placeholder="First Name" className="input" />
              <input type="text" placeholder="Last Name" className="input" />
            </div>
            <div className="form-group d-flex">
              <input
                type="text"
                placeholder="Mobile Number or email"
                className="input full-width"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="New Password"
                className="input full-width"
              />
            </div>
            <div className="form-group">
              <span>Birthday</span>
              <br />
              <div className="d-flex justify-content-between">
                <select>
                  <option>Jan</option>
                  <option>Feb</option>
                  <option>Mar</option>
                  <option>Apr</option>
                  <option>May</option>
                  <option>Jun</option>
                  <option>Jul</option>
                  <option>Aug</option>
                  <option>Sep</option>
                  <option>Oct</option>
                  <option>Nov</option>
                  <option>Dec</option>
                </select>

                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>

                <SelectYears />
              </div>
            </div>
            <div className="form-group">
              <span>Gender</span>
              <br />
              <div className="d-flex justify-content-between">
                <div class="form-check rounded d-flex align-items-center justify-content-between">
                  <label>Female</label>
                  <input
                    type="radio"
                    name="gender"
                    id="flexRadioDefault1"
                    onClick={() => setShowCustomGender(false)}
                  />
                </div>
                <div class="form-check rounded d-flex align-items-center justify-content-between">
                  <label>Male</label>
                  <input
                    onClick={() => setShowCustomGender(false)}
                    type="radio"
                    name="gender"
                  />
                </div>
                <div class="form-check rounded d-flex align-items-center justify-content-between">
                  <label>Custom</label>
                  <input
                    onClick={() => setShowCustomGender(true)}
                    type="radio"
                    name="gender"
                  />
                </div>
                <br />
                <br />
              </div>
              {showCustomGender && (
                <>
                  <select className="select-gender w-100" data-width="100%">
                    <option disabled>Select your pronoun</option>
                    <option>She: "Wish her a happy birthday!"</option>
                    <option>He: "Wish him a happy birthday!"</option>
                    <option>They: "Wish them a happy birthday!"</option>
                  </select>{" "}
                  <br />
                  <span>Your pronoun is visible to everyone</span>
                  <br />
                  <br />
                  <div className="form-group d-flex">
                    <input
                      type="text"
                      placeholder="Gender (Optional)"
                      className="input full-width"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="signup-btn d-flex justify-content-center">
              <button className="btn">Sign Up</button>
            </div>
          </form>
          <br />
          <span>
            By clicking Sign Up, you agree to our <a href="">Terms</a>,{" "}
            <a href="">Data Policy</a> and <a href="">Cookie Policy</a>. You may
            receive SMS notifications from us and can opt out at any time.
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegistrationModal;
