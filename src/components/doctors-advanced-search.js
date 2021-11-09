import "../css/doctors-advanced-search.css";
import avatar from "../avatar.jpg";
import { util } from "../public/util";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "../inputs/calendar";
const DoctorsAdvancedSearch = ({ ...props }) => {
  return (
    <div className="d-flex flex-column">
      {props.data.map((doctorInfo, i) => {
        return (
          <div className="row col-12 mb-4" key={"doctor" + i}>
            <div className="col-2 d-flex justify-content-center align-items-center">
              <img src={avatar} className="doctor-profile" alt="" />
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center col-2">
              <h1>{doctorInfo.name}</h1>
              <span></span>
              <h2>{doctorInfo.location.length} Location/s</h2>
              <h2>${doctorInfo.Price}</h2>
            </div>
            <div className="d-flex justify-content-between col-7 doctor-details">
              <div className="d-flex">Calendar</div>
              <div className="d-flex flex-column doctor-buttons">
                <Link to={"/view-profile/" + doctorInfo.id}>
                  <button>View Profile</button>
                </Link>
                <button>Add to favorite</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DoctorsAdvancedSearch;
