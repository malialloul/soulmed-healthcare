import "../css/doctor-appointments.css";
import avatar from "../avatar.jpg";
import no_appointments from "../no-appointments.png";
import { util } from "../public/util";
import CustomPagination from "../inputs/custom-pagination";
import { useEffect, useState } from "react";

const DoctorAppointments = ({ ...props }) => {
  return props.appointments.filter((item) =>
    util.sameDay(new Date(item.start), new Date())
  ).length === 0 ? (
    <div className="d-flex justify-content-center align-items-center h-auto">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src={no_appointments} alt="" className="no_appointments" />
      </div>
    </div>
  ) : (
    <CustomPagination
      data={props.appointments.filter((item) =>
        util.sameDay(new Date(item.start), new Date())
      )}
    >
      {props.appointments
        .filter((item) => util.sameDay(new Date(item.start), new Date()))
        .map((apmt, i) => {
          return (
            <div className="appointment" key={"apmt" + i}>
              <div className="d-flex justify-content-between">
                <div>
                  <img src={avatar} className="patient-profile-img" alt="" />
                  <span className="px-3">patient</span>
                </div>
                <span>{apmt.title}</span>
              </div>
              <div className="content d-flex justify-content-center">
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <td>Start Time</td>
                        <td>{apmt.start.split("T")[1]}</td>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <td>End Time</td>
                        <td>{apmt.end.split("T")[1]}</td>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
    </CustomPagination>
  );
};

export default DoctorAppointments;
