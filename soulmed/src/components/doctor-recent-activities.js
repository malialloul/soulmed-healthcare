import "../css/doctor-recent-activities.css";
import avatar from "../avatar.jpg";
import CustomPagination from "../inputs/custom-pagination";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Modal } from "react-bootstrap";

const DoctorRecentActivities = ({ ...props }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.appointments.filter((item) => item.status !== 0));
  }, [props.appointments]);

  const [modal, showModal] = useState(false);
  const [currentActivityModal, setCurrentActivityModal] = useState({
    title: "Appointment 1",
    start: "2021-11-11T11:00:00",
    end: "2021-11-11T11:30:00",
    id: 1,
    doctor_fk: 5,
    patient_fk: 1,
    status: 0,
    location:"AUBMC",
    type:"PHYSICAL"
  });
  const itemClicked = (id) => {
    console.log(props.appointments.filter((item) => item.id === id)[0])
    setCurrentActivityModal(
      props.appointments.filter((item) => item.id === id)[0]
    );
    showModal(true);
  };

  const activityModal = (
    <Modal
      show={modal}
      onHide={() => showModal(false)}
      size="md"
      centered
    >
      <Modal.Body>
        
        <div className="activity">
          <div className="d-flex flex-column align-items-center">
            <h3>{currentActivityModal.start.split("T")[0]}</h3>
            <img src={avatar} className="patient-profile-img mt-4" alt="" />
            <span className="px-3 patient_name mt-4">patient</span>
          </div>
          <br />
          <div className="d-flex flex-column align-items-start">
            <table>
              <tbody>
                <tr>
                  <th>
                    <td>Appointment Title</td>
                    <td>{currentActivityModal.title}</td>
                  </th>
                </tr>
                <tr>
                  <th>
                    <td>Start Time</td>
                    <td>{currentActivityModal.start.split("T")[1]}</td>
                  </th>
                </tr>
                <tr>
                  <th>
                    <td>End Time</td>
                    <td>{currentActivityModal.end.split("T")[1]}</td>
                  </th>
                </tr>
                <tr>
                  <th>
                    <td>Location</td>
                    <td>{currentActivityModal.location}</td>
                  </th>
                </tr>
                <tr>
                  <th>
                    <td>Type</td>
                    <td>{currentActivityModal.type}</td>
                  </th>
                </tr>
                <tr>
                  <th>
                    <td>Status</td>
                    <td
                      className={classNames("", {
                        done: currentActivityModal.status === 1,
                        cancelled: currentActivityModal.status === 2,
                      })}
                    >
                      {currentActivityModal.status === 1 ? "Done" : "Cancelled"}
                    </td>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );

  return props.appointments.filter((item) => item.status !== 0).length === 0 ? (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h3>No Recent Activities</h3>
      </div>
    </div>
  ) : (
    <div className="p-4">
      {modal && activityModal}
      <table className="w-100">
        <tr>
          <th>Appointment Date</th>
          <th>Appointment Patient Name</th>
          <th>Appointment Description</th>
          <th>Appointment Status</th>
          <th>Show more</th>
        </tr>
        {props.appointments
          .filter((item) => item.status !== 0)
          .map((apmt) => {
            return (
              <tr>
                <td>{apmt.start.split("T")[0]}</td>
                <td>Patient</td>
                <td>{apmt.title}</td>
                <td
                  className={classNames("", {
                    done: apmt.status === 1,
                    cancelled: apmt.status === 2,
                  })}
                >
                  {apmt.status === 1 ? (
                    <strong>Done</strong>
                  ) : (
                    <strong>Cancelled</strong>
                  )}
                </td>
                <td>
                  <a onClick={() => itemClicked(apmt.id)} href="#">
                    Show more
                  </a>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default DoctorRecentActivities;
