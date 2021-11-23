import React, { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import "../../css/doctor-dashboard.css";
import Calendar from "../../inputs/calendar";
import { util } from "../../public/util";
import { doctorController } from "../../controllers/doctor";
import Layout from "./layout";
import DoctorAppointments from "../../components/doctor-appointments";
import DoctorRecentActivities from "../../components/doctor-recent-activities";

const DoctorDashboard = () => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    doctorController
      .getAllDoctorAppointments(5)
      .then((response) => {
        setAppointmentsList(response);
      })
      .then(() => {
        doctorController
          .getDoctorSchedule(5)
          .then((response) => {
            let list = response.data;
            for (let i = 0; i < list.length; i++) {
              list[i]["is_schedule"] = true;
            }
            setScheduleList(list);
          })
          .then(() => {
            isLoading(false);
          });
      });
  }, []);

  return (
    <Layout doctorId={5} pageName="Dashboard" pageIndex={0}>
      <div className="row gx-0 d-flex justify-content-between ">
        <div className="col-sm-11 col-md-11 col-lg-6 calendar">
          <div className="main_div">
            <div className="div_header">
              <h3>Calendar</h3>
            </div>
            <div className="div_content">
              <Calendar isDoctor={true} allowEdit={false} doctorId={5} />
            </div>
          </div>
        </div>
        <div className="col-sm-11 mt-lg-0 ml-lg-2 mt-md-4 mt-sm-4 col-md-11 col-lg-5 appointments ">
          <div className="main_div">
            <div className="div_header">
              <h3>Today's Appointments</h3>
            </div>
            <div className="div_content">
              <DoctorAppointments appointments={appointmentsList} />
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="recent-activities col-sm-11 col-md-11 col-lg-12">
        <div className="main_div">
          <div className="div_header">
            <h3>Recent Activities</h3>
          </div>
          <div className="div_content">
            <DoctorRecentActivities appointments={appointmentsList} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
