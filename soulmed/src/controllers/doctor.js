import axios from "axios";
import Geocode from "react-geocode";
import configData from "../configData.json";

const SERVER_URL = "localhost";
const SERVER_PORT = "5000";

const apiURL = "http://" + SERVER_URL + ":" + SERVER_PORT;

const getAllDoctorAppointments = (doctor_id) => {
  return axios
    .get(apiURL + "/doctors-appointments?doctor_fk=" + doctor_id)
    .then((response) => {
      let list = response.data;
      for (let i = 0; i < list.length; i++) {
        doctorController.getPatientInfo(list[i].patient_fk).then((res) => {
          list[i]["patient_name"] = res.data[0].name;
        });
      }
      return list;
    });
};

const getPatientInfo = (patient_id) => {
  return axios.get(apiURL + "/patients?id=" + patient_id);
};

const getDoctorSchedule = (doctor_id) => {
  return axios.get(apiURL + "/doctors-schedule?doctor_fk=" + doctor_id);
};

const getDoctorInfo = (doctor_id) => {
  return axios.get(apiURL + "/info/" + doctor_id);
};

const addDoctorAppointmentSchedule = (body) => {
  return axios.post(apiURL + "/doctors-schedule", body).then((reponse) => {
    console.log(reponse.data);
  });
};

const addDoctorAppointment = (body) => {
  return axios.post(apiURL + "/doctors-appointments", body).then((reponse) => {
    console.log(reponse.data);
  });
};



export const doctorController = {
  getAllDoctorAppointments,
  addDoctorAppointmentSchedule,
  getPatientInfo,
  getDoctorSchedule,
  getDoctorInfo,
  addDoctorAppointment
};
