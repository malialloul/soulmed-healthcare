import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import SelectYears from "../inputs/select-years";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/registration-modal.css";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { util } from "../public/util";
import classNames from "classnames";
import { userService } from "../services/userService";

const RegistrationModal = ({ ...props }) => {
  const { register, handleSubmit, reset, formState, watch, control } = useForm({
    mode: "onChange",
  });
  const { errors, isDirty, isSubmitting, isValid } = formState;
  const password = useRef();
  password.current = watch("password", "");

  const onSubmitHandler = (data) => {
    let userRegiterationResponse = userService.registerUser(data);
    alert("Your username: "+userRegiterationResponse["userName"]);
    reset();
  };

  const [termsChecked, setTermsChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCustomDiv, setShowCustomDiv] = useState(false);
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [customGenderName, setCustomGenderName] = useState("");

  const options = [
    { value: "1", label: 'She: "Wish her a happy birthday!"' },
    {
      value: "2",
      label: 'He: "Wish him a happy birthday!"',
    },
    {
      value: "3",
      label: 'They: "Wish them a happy birthday!"',
    },
  ];
  const setUserGender = (gender) => {
    setGender(gender);
    setShowCustomDiv(false);
  };
  const customHandler = () => {
    setGender("custom");
    setShowCustomDiv(true);
  };
  const modal = (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showTermsModal}
      onHide={() => setShowTermsModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="signup-title">
            <span className="title">Sign Up</span> <br />
            <span className="subtitle">It's quick and easy.</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );

  return (
    <>
      {modal}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter ">
            <div className="signup-title d-flex justify-content-center w-100">
              <span className="title">Register Now</span> <br />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="signup-form">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="form-group d-flex justify-content-between">
                {/* <div className="flex-column d-flex">
<select
  placeholder="prefix"
  {...register("prefix", {
    validate: (value) => value !== "",
  })}
>
  <option value="" selected disabled>
    Prefix
  </option>
  <option>Mr.</option>
  <option>Ms.</option>
  <option>Mrs.</option>
  <option>Dr.</option>
  <option>Prof.</option>
</select>
<div className="error">
  {errors.prefix && <p>Select a prefix</p>}
</div>
</div>*/}
                <div className="form-group d-flex flex-column w-100">
                  <div className="d-flex">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="input full-width"
                      {...register("firstname", {
                        pattern: /^[A-Za-z]+$/i,

                        validate: (value) =>
                          value !== "" && util.isValidName(value),
                      })}
                    />
                  </div>
                  <div className="error">
                    {errors.firstname?.type === "pattern" &&
                      "Invalid Format, special characters are not allowed"}
                  </div>
                </div>

                <div className="form-group d-flex flex-column w-100">
                  <div className="d-flex">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="input full-width"
                      {...register("lastname", {
                        pattern: /^[A-Za-z]+$/i,

                        validate: (value) =>
                          value !== "" && util.isValidName(value),
                      })}
                    />
                  </div>
                  <div className="error">
                    {errors.lastname?.type === "pattern" &&
                      "Invalid Format, special characters are not allowed"}
                  </div>
                </div>
              </div>

              <div className="form-group d-flex flex-column">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="input full-width"
                  {...register("email", {
                    pattern: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
                    validate: (value) =>
                      value !== "" && util.isValidEmail(value),
                  })}
                />
                <div className="error">
                  {errors.email?.type === "pattern" && "Invalid email format"}
                </div>
              </div>

              <div className="form-group d-flex flex-column">
                <input
                  type="password"
                  placeholder="New Password"
                  className="input full-width"
                  {...register("password", {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    validate: (value) =>
                      value !== "" && util.isValidPassword(value),
                  })}
                />
                <div className="error">
                  {errors.password?.type === "pattern" &&
                    "Invalid format, please retype password"}
                </div>
              </div>

              <div className="form-group d-flex flex-column">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input full-width"
                  {...register("confirm_password", {
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                />
                <div className="error">
                  {errors.confirm_password && (
                    <p>{errors.confirm_password.message}</p>
                  )}
                </div>
              </div>

              <Controller
                control={control}
                {...register("birthdate", {
                  validate: (value) =>
                    value !== "" &&
                    value !== null &&
                    new Date() - new Date(value) >= 0,
                })}
                render={({ field: { onChange, value } }) => {
                  return (
                    <DatePicker
                      className="dob full-width"
                      onChange={onChange}
                      required
                      selected={value}
                      placeholderText="dd/mm/yyy"
                    />
                  );
                }}
              />

              <div className="form-group d-flex flex-column">
                <select
                  {...register("country", {
                    validate: (value) => value !== "",
                  })}
                  required
                  className="w-100"
                >
                  <option disabled selected value="">
                    Select your country
                  </option>
                  <option>Lebanon</option>
                  <option>US</option>
                  <option>France</option>
                </select>
                <div className="error">
                  {errors.country && <p>Select a country</p>}
                </div>
              </div>

              <div className="form-group d-flex flex-column">
                <div className="d-flex">
                  <input type="text" className="input" disabled value="+961" />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="input full-width"
                    {...register("phoneNumber", {
                      pattern: /^[0-9]*$/,
                      validate: (value) =>
                        value !== "" && util.isValidPhoneNumber(value),
                    })}
                  />
                </div>
                <div className="error">
                  {errors.phoneNumber?.type === "pattern" && "Invalid format"}
                </div>
              </div>

              <div className="form-group flex-column">
                <span>Register as</span>
                <div className="d-flex">
                  <div className="form-group form-check">
                    <input
                      type="radio"
                      value="patient"
                      checked={role === "patient"}
                      onClick={() => setRole("patient")}
                      {...register("role1", {
                        validate: (value) => role !== "",
                      })}
                    />
                    <label>Patient</label>
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="radio"
                      value="doctor"
                      checked={role === "doctor"}
                      onClick={() => setRole("doctor")}
                      {...register("role2", {
                        validate: (value) => role !== "",
                      })}
                    />
                    <label>Doctor</label>
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="radio"
                      checked={role === "organization"}
                      value="organization"
                      onClick={() => setRole("organization")}
                      {...register("role3", {
                        validate: (value) => role !== "",
                      })}
                    />
                    <label>Organization</label>
                  </div>
                </div>
              </div>

              <div className="form-group flex-column">
                <span>Gender</span>
                <div className="d-flex">
                  <div className="form-group form-check">
                    <input
                      type="radio"
                      value="male"
                      checked={gender === "male"}
                      onClick={() => setUserGender("male")}
                      {...register("gender1", {
                        validate: (value) => gender !== "",
                      })}
                    />
                    <label>Male</label>
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="radio"
                      value="female"
                      checked={gender === "female"}
                      onClick={() => setUserGender("female")}
                      {...register("gender2", {
                        validate: (value) => gender !== "",
                      })}
                    />
                    <label>Female</label>
                  </div>
                  <div className="form-group form-check">
                    <input
                      onClick={() => customHandler()}
                      type="radio"
                      checked={showCustomDiv === true}
                      value="custom"
                    />
                    <label>Custom</label>
                  </div>
                </div>
                {showCustomDiv && (
                  <div className="flex-col">
                    <select
                      {...register("promoun", {
                        validate: (value) => gender !== "" || !showCustomDiv,
                      })}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option disabled>Select your pronoun</option>
                      {options.map((option, i) => {
                        return (
                          <option key={option.value} value={option.label}>
                            {option.label}
                          </option>
                        );
                      })}
                    </select>

                    <label>Your pronoun is visible to everyone</label>
                    <br />
                    <br />
                    <input
                      className="input full-width"
                      {...register("costumGenderName")}
                      placeholder="Gender (optional)"
                      onChange={(e) => setCustomGenderName(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <br />
              <div className="d-flex flex-column justify-items-center w-100 p-4">
                <div className="d-flex align-items-center justify-content-center w-full p-3">
                  <input
                    type="checkbox"
                    value="terms_and_conditions"
                    className={classNames("check", {})}
                    onClick={(e) => setTermsChecked(e.target.checked)}
                    {...register("terms_and_conditions", {
                      validate: (value) => termsChecked === true,
                    })}
                  />
                  <label className="ms-2">
                    I agree with the{" "}
                    <a href="#" onClick={() => setShowTermsModal(true)}>
                      {" "}
                      terms and condition{" "}
                    </a>
                  </label>
                </div>
                <div className="form-group flex-column w-full">
                  <div className="d-flex align-items-center justify-content-center w-full">
                    <input type="checkbox" className="check" />
                    <label className="ms-2">
                      I want to receive <a href="#"> the new letter </a>
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-center">
                <div className="signup-btn d-flex justify-content-center">
                  <input
                    className="btn"
                    type="submit"
                    disabled={!isDirty || !isValid}
                    value="Register"
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegistrationModal;
