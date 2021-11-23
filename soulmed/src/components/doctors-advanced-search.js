import "../css/doctors-advanced-search.css";
import avatar from "../avatar.jpg";
import { util } from "../public/util";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "../inputs/calendar";
import { Modal } from "react-bootstrap";
import { doctorController } from "../controllers/doctor";
import CustomPagination from "../inputs/custom-pagination";

const DoctorsAdvancedSearch = ({ ...props }) => {
  const [calendarId, setCalendarId] = useState(5);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  const loadCalendar = (e, id) => {
    e.preventDefault();
    setCalendarId(5);
    setShowCalendar(true);
  };

  return (
    <div className="container d-flex align-items-center">
      {showCalendar && (
        <>
          <div className="calendar_div d-flex flex-column">
            <div onClick={() => setShowCalendar(false)} className="close_btn">
              X
            </div>

            <Calendar allowEdit={true} doctorId={calendarId} />
          </div>
        </>
      )}

      <CustomPagination data={props.data}>
        {props.data.map((doctorInfo, i) => {
          return (
            <div className="doctor-card mx-2 w-25 d-flex align-items-center flex-column">
              <>
                <img src={avatar} className="doctor-image" alt="" />
                <br />
                <div className="d-flex w-100 flex-column align-items-center doctor_info justify-content-center">
                  <span>{doctorInfo.name}</span>
                  <br />
                  <table className="doctor-table">
                    <tbody>
                      <tr>
                        <td className="w-100">Appointment Price</td>
                        <td>{doctorInfo.Price}</td>
                      </tr>
                      <tr>
                        <td>Work Offices #</td>
                        <td>{doctorInfo.location.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <br />

                <div className="d-flex w-100 align-items-center justify-content-between">
                  <button
                    onClick={() => navigate("/view-profile/" + doctorInfo.id)}
                  >
                    View Profile
                  </button>

                  <button>Add to Favorites</button>
                </div>
              </>
              <br />
              <div className="d-flex w-100 justify-content-center align-items-center">
                <button onClick={(e) => loadCalendar(e, doctorInfo.id)}>
                  View Calendar
                </button>
              </div>
              <div className="d-flex w-100 justify-content-center align-items-center">
                <button onClick={(e) => window.open("http://localhost:3002", "_blank")}>
                  Call
                </button>
              </div>
            </div>
          );
        })}
      </CustomPagination>
    </div>
  );
};

export default DoctorsAdvancedSearch;
