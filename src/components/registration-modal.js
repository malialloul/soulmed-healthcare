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

const RegistrationModal = ({ ...props }) => {
  const schema = yup.object().shape({
    firstName: yup.string().email().required(),
  });
  const { register, handleSubmit, reset, formState, watch, control } = useForm({
    mode: "onChange",
  });
  const { errors, isDirty, isSubmitting, isValid } = formState;
  const password = useRef();
  password.current = watch("password", "");

  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
  };

  const isValidEmail = (email) =>
    // eslint-disable-next-line no-useless-escape
    /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const isValidPassword = (password) => {
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  };

  const isValidPhoneNumber = (phone_number) => {
    /^[0-9]*$/.test(phone_number);
  };

  const [termsChecked, setTermsChecked] = useState(false);
  const modal = (
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
      <Modal.Body></Modal.Body>
    </Modal>
  );

  return (
    <>
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

              <div className="form-group d-flex flex-column">
                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input full-width"
                    {...register("firstName", {
                      pattern: /^[A-Za-z]+$/i,

                      validate: (value) =>
                        value !== "" && new RegExp(/^[A-Za-z]+$/i).test(value),
                    })}
                  />
                </div>
                <div className="error">
                  {errors.firstName?.type === "pattern" &&
                    "Invalid Format, special characters are not allowed"}
                </div>
              </div>

              <div className="form-group d-flex flex-column">
                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input full-width"
                    {...register("lastName", {
                      pattern: /^[A-Za-z]+$/i,

                      validate: (value) =>
                        value !== "" && new RegExp(/^[A-Za-z]+$/i).test(value),
                    })}
                  />
                </div>
                <div className="error">
                  {errors.lastName?.type === "pattern" &&
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
                  validate: (value) => value !== "" && isValidEmail(value),
                })}
              />
              <div className="error">
                {errors.email?.type === "pattern" && "Invalid email format"}
              </div>
            </div>

            <div className="form-group d-flex flex-column">
              <input
                type="text"
                placeholder="New Password"
                className="input full-width"
                {...register("password", {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  validate: (value) => value !== "" && isValidPassword(value),
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
                    value === password.current || "The passwords do not match",
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
              {...register("dob", {
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
                  {...register("phone_number", {
                    pattern: /^[0-9]*$/,
                    validate: (value) =>
                      value !== "" && isValidPhoneNumber(value),
                  })}
                />
              </div>
              <div className="error">
                {errors.phone_number?.type === "pattern" && "Invalid format"}
              </div>
            </div>

            <div className="form-group flex-column">
              <span>Terms and conditions</span>
              <div className="d-flex align-items-center form-check w-full">
                <input
                  type="checkbox"
                  value="terms_and_conditions"
                  onClick={(e) => setTermsChecked(e.target.checked)}
                  {...register("terms_and_conditions", {
                    validate: (value) => termsChecked,
                  })}
                />
                <label>
                  I agree with the{" "}
                  <a href="#" onClick={modal}>
                    {" "}
                    terms and condition{" "}
                  </a>
                </label>
              </div>
            </div>

            <div className="form-group flex-column w-full">
              <span>Newsletter subscription</span>
              <div className="d-flex align-items-center form-check w-full">
                <input type="checkbox" />
                <label>
                  I agree with the <a href="#"> terms and condition </a>
                </label>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center">
              <div className="signup-btn d-flex justify-content-center">
                <input
                  className="btn"
                  type="submit"
                  disabled={!isDirty || !isValid}
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
