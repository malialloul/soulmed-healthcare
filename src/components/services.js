import React, { useRef, useState } from "react";
import avatar from "../avatar.jpeg";
import appointment from "../appointment.png";

import "../css/services.css";
import Pagination from "../inputs/scroll-pagination";

const Services = () => {
  return (
    <div className="services">
      <h1>Find what you need</h1>
      <em>We make it Simple, how it Works?</em>
      <br />
      <br />
      <Pagination>
        <div className="d-flex col-4 service-card flex-column align-items-center justify-content-center">
          <div className="card-img d-flex align-items-center justify-content-center">
            <img src={appointment} alt="" className="img-fluid" />
          </div>
          <br />
          <span>
            Find a doctor and take an appointment physically or Virtally
          </span>
        </div>
        <div className="d-flex col-4 service-card flex-column align-items-center justify-content-center">
          <div className="card-img d-flex align-items-center justify-content-center">
            <img src={appointment} alt="" className="img-fluid" />
          </div>
          <br />
          <span>
            Find a doctor and take an appointment physically or Virtally
          </span>
        </div>

        <div className="d-flex col-4 service-card flex-column align-items-center justify-content-center">
          <div className="card-img d-flex align-items-center justify-content-center">
            <img src={appointment} alt="" className="img-fluid" />
          </div>
          <br />
          <span>
            Find3 a doctor and take an appointment physically or Virtally
          </span>
        </div>

        <div className="d-flex col-4 service-card flex-column align-items-center justify-content-center">
          <div className="card-img d-flex align-items-center justify-content-center">
            <img src={appointment} alt="" className="img-fluid" />
          </div>
          <br />
          <span>
            Find4 a doctor and take an appointment physically or Virtally
          </span>
        </div>

        <div className="d-flex col-4 service-card flex-column align-items-center justify-content-center">
          <div className="card-img d-flex align-items-center justify-content-center">
            <img src={appointment} alt="" className="img-fluid" />
          </div>
          <br />
          <span>
            Find a doctor and take an appointment physically or Virtally
          </span>
        </div>

        <div className="d-flex col-4 service-card flex-column align-items-center justify-content-center">
          <div className="card-img d-flex align-items-center justify-content-center">
            <img src={appointment} alt="" className="img-fluid" />
          </div>
          <br />
          <span>
            Find a doctor and take an appointment physically or Virtally
          </span>
        </div>
      </Pagination>
    </div>
  );
};

export default Services;
