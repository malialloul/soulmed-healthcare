import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doctorController } from "../../controllers/doctor";
import Layout from "./layout";
import "../../css/schedule-settings.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { util } from "../../public/util";
import axios from "axios";

const ScheduleSettings = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [schedueList, setSchdeuleList] = useState([]);
  const [doctorData, setDoctorData] = useState({
    id: -1,
    name: "",
    country: "",
    profession_fk: -1,
    city: "",
    Price: "",
    location: [],
  });
  const [timingIndexCount, setTimingIndexCount] = useState(-1);
  const [addTimingDisbaled, setAddTimingDisabled] = useState(false);
  useEffect(() => {
    doctorController
      .getDoctorInfo(id)
      .then((response) => {
        setDoctorData(response.data);
      })
      .then(() => {
        doctorController
          .getDoctorSchedule(id)
          .then((res) => {
            setSchdeuleList(res.data);
            setTimingIndexCount(
              res.data.length > 0 ? res.data[res.data.length - 1].id + 1 : 1
            );
          })
          .then(() => {
            setLoading(false);
          });
      });
  }, []);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [timingArray, setTimingarray] = useState([]);
  const addTiming = () => {
    setAddTimingDisabled(true);
    let temp = timingArray;
    temp = [...temp, { id: timingIndexCount, start: "", end: "", type: 0 }];
    setTimingarray(temp);

    setTimingIndexCount(timingIndexCount + 1);
    console.log(timingArray);
  };
  const deleteTiming = (id, index) => {
    if (index === timingArray.length - 1) {
      setAddTimingDisabled(false);
    }
    let temp = timingArray;
    temp = timingArray.filter((timing) => timing.id !== id);
    setTimingarray(temp);
  };

  const modifyStartTiming = (index, value) => {
    let temp = [...timingArray];
    temp[index].start = value;

    setTimingarray(temp);
  };
  const modifyEndTiming = (index, value) => {
    let temp = [...timingArray];
    temp[index].end = value;

    setTimingarray(temp);
    if (
      temp[temp.length - 1].start !== "" &&
      temp[temp.length - 1].end !== ""
    ) {
      setAddTimingDisabled(false);
    }
  };
  const modifyAppointmentsType = (index, value) => {
    let temp = [...timingArray];
    temp[index].type = value;

    setTimingarray(temp);
  };

  const [location, setLocation] = useState("");
  const [daysSelected, setDaysSelected] = useState([]);
  const [previousWeekSchedule, setPreviousWeekSchedule] = useState(true);

  const navigate = useNavigate();

  const importPreviousWeekScheduke = async () => {
    let thisWeekScheduleList = [];
    let count = 0;

    for (let i = -7; i < 0; i++) {
      let previousWeekDay = new Date(util.getDayDate(i));

      for (let j = 0; j < schedueList.length; j++) {
        if (util.sameDay(new Date(schedueList[j].start), previousWeekDay)) {
          let daySchedule = {
            start: moment(
              new Date(schedueList[j].start).setDate(
                previousWeekDay.getDate() + 7
              )
            ).format("YYYY-MM-DDTkk:mm:ss"),
            end: moment(
              new Date(schedueList[j].end).setDate(
                previousWeekDay.getDate() + 7
              )
            ).format("YYYY-MM-DDTkk:mm:ss"),
            doctor_fk: schedueList[j].doctor_fk,
            location: schedueList[j].location,
            type: schedueList[j].type,
          };

          thisWeekScheduleList.push(daySchedule);
        }
      }
    }
    console.log(thisWeekScheduleList)
    for (let j = 0; j < thisWeekScheduleList.length; j++) {
      await doctorController.addDoctorAppointmentSchedule(thisWeekScheduleList[j]);
    }
    alert("Schedule Imported Successfully");
   // navigate("/doctor/dashboard/");
  };

  const sendScheduleRequests = () => {
    if (checkScheduleDataValidity()) {
      sendRequestData().then(() => {
        alert("Schedule Updated");
        navigate("/doctor/dashboard");
      });
    } else {
      alert("Fill all fields, time overlappings and time ranges validity");
    }
  };

  const sendRequestData = async () => {
    let count = 0;

    for (let i = 0; i < daysSelected.length; i++) {
      let list = getDaySchedule(i, count);
      count += list.length + 1;
      console.log(list);
      for (let j = 0; j < list.length; j++) {
        await doctorController.addDoctorAppointmentSchedule(list[j]);
      }
    }
  };

  const getDaySchedule = (daySelectedIndex, count) => {
    let newTimingDates = [];
    let increment = count;
    for (let i = 0; i < timingArray.length; i++) {
      newTimingDates = [
        ...newTimingDates,
        {
          doctor_fk: parseInt(id),
          start:
            moment(
              util.getDayDate(
                daysOfWeek.indexOf(daysSelected[daySelectedIndex])
              )
            ).format("YYYY-MM-DD") +
            "T" +
            timingArray[i].start,
          end:
            moment(
              util.getDayDate(
                daysOfWeek.indexOf(daysSelected[daySelectedIndex])
              )
            ).format("YYYY-MM-DD") +
            "T" +
            timingArray[i].end,
          location: location,
          type: parseInt(timingArray[i].type),
        },
      ];
      increment++;
    }

    return newTimingDates;
  };

  const checkScheduleDataValidity = () => {
    let overlapping = false;
    let emptyFields = false;
    let validIntervals = true;
    let newEvent = {};
    let newTimingArray = [];
    for (let i = 0; i < timingArray.length; i++) {
      newEvent = {
        start:
          moment(util.getDayDate(daysOfWeek.indexOf(daysSelected[0]))).format(
            "YYYY-MM-DD"
          ) +
          "T" +
          timingArray[i].start,
        end:
          moment(util.getDayDate(daysOfWeek.indexOf(daysSelected[0]))).format(
            "YYYY-MM-DD"
          ) +
          "T" +
          timingArray[i].end,
      };
      newTimingArray.push(newEvent);
    }
    for (let j = 0; j < newTimingArray.length; j++) {
      if (util.isOverlapping(newTimingArray[j], newTimingArray)) {
        overlapping = true;
      }

      if (
        !util.isValidTimingInterval(
          newTimingArray[j].start,
          newTimingArray[j].end
        )
      ) {
        validIntervals = false;
      }
    }

    if (
      overlapping ||
      emptyFields ||
      location === "" ||
      daysSelected.length === 0 ||
      !validIntervals
    ) {
      return false;
    }
    return true;
  };

  const handleChange = (e, data) => {
    const { name, checked } = e.target;
    if (checked) {
      // if cheked and selectall checkbox add all fileds to selectedList
      if (name === "allSelect") {
        let temp = daysOfWeek;
        setDaysSelected(temp);
      } else {
        // if cheked and specific checkbox add specific field to selectedList
        setDaysSelected([...daysSelected, name]);
      }
    } else {
      // if uncheked and selectall checkbox add remove all fileds from selectedList
      if (name === "allSelect") {
        setDaysSelected([]);
      } else {
        // if uncheked and specific checkbox remove specific field from selectedList
        let tempSelected = daysSelected.filter((item, i) => item !== name);

        setDaysSelected(tempSelected);
      }
    }
  };

  return (
    <Layout pageName="Schedule Settings" pageIndex={3}>
      {!loading && (
        <div className="d-flex justify-content-center">
          <div className="col-12 schedule-div">
            <div className="main_div">
              <div className="div_header">
                <h3>
                  Weekly Schedule (From{" "}
                  {util.getDayDate(0).toString().substring(0, 15)} into{" "}
                  {util.getDayDate(6).toString().substring(0, 15)})
                </h3>
              </div>
              <br />
              <div className="div_content">
                <div className="d-flex flex-column">
                  <span>
                    Do you want to import the schedule of previous week?
                  </span>
                  <div className="d-flex input align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center">
                      <input
                        onChange={(e) =>
                          setPreviousWeekSchedule(
                            e.target.checked ? true : false
                          )
                        }
                        type="radio"
                        name="pws"
                        checked={previousWeekSchedule}
                      />
                      <label>YES</label>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mx-4">
                      <input
                        onChange={(e) =>
                          setPreviousWeekSchedule(
                            e.target.checked ? false : true
                          )
                        }
                        type="radio"
                        checked={!previousWeekSchedule}
                        name="pws"
                      />
                      <label>NO</label>
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <input
                      type="button"
                      value={"Import"}
                      className="input"
                      onClick={() => importPreviousWeekScheduke()}
                    />
                  </div>
                </div>
                {!previousWeekSchedule && (
                  <>
                    <div className="d-flex flex-column">
                      <span>Location</span>
                      <select onChange={(e) => setLocation(e.target.value)}>
                        <option selected disabled>
                          Select your location
                        </option>
                        {doctorData.location.map((l, i) => {
                          return <option key={"location" + i}>{l}</option>;
                        })}
                      </select>
                    </div>
                    <br />
                    <div className="d-flex flex-column">
                      <span>Appointment Schedule</span>
                      <input
                        type="button"
                        className="input"
                        value="Add Timing"
                        disabled={addTimingDisbaled}
                        onClick={() => addTiming()}
                      />
                      <div className="d-flex w-100 flex-column justify-content-center">
                        {timingArray.map((time, index) => {
                          return (
                            <div
                              key={"time" + index}
                              className="d-flex  justify-content-between"
                            >
                              <input
                                className="input"
                                placeholder={"Start Time "}
                                type="time"
                                value={timingArray[index].start}
                                onChange={(e) =>
                                  modifyStartTiming(index, e.target.value)
                                }
                              />
                              <input
                                className="input"
                                placeholder="End Time"
                                type="time"
                                value={timingArray[index].end}
                                onChange={(e) =>
                                  modifyEndTiming(index, e.target.value)
                                }
                              />
                              <select
                                onChange={(e) =>
                                  modifyAppointmentsType(index, e.target.value)
                                }
                                value={timingArray[index].type}
                                className="input"
                              >
                                <option selected disabled>
                                  Select type
                                </option>
                                <option value={0}>Physical</option>
                                <option value={1}>Virtual</option>
                                <option value={2}>Physical or Virtual</option>
                                <option value={3}>Meeting</option>
                                <option value={4}>Lunch Break</option>
                              </select>
                              <input
                                type="button"
                                value={"X"}
                                className="input close"
                                onClick={() => deleteTiming(time.id, index)}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <br />
                      <div className="d-flex flex-column">
                        <label>Select your preffered days</label>
                        <div className="d-flex  align-items-center justify-content-center mx-4">
                          <input
                            name="allSelect"
                            onChange={(e) => handleChange(e)}
                            type="checkbox"
                            checked={daysSelected.length === 7}
                          />
                          <label>Select All</label>
                        </div>
                        <br />
                        <div className="d-flex  align-items-center justify-content-center flex-wrap">
                          {daysOfWeek.map((day, i) => {
                            return (
                              <div
                                key={"day" + i}
                                className="d-flex input align-items-center justify-content-center mx-4"
                              >
                                <input
                                  name={day}
                                  onChange={(e) => handleChange(e)}
                                  type="checkbox"
                                  value={day}
                                  checked={daysSelected.some(
                                    (item, j) => item === day
                                  )}
                                />
                                <label>{day}</label>
                              </div>
                            );
                          })}
                        </div>
                        <div className="d-flex flex-column">
                          <input
                            type="button"
                            value={"Validate"}
                            className="input"
                            onClick={() => sendScheduleRequests()}
                          />
                        </div>
                      </div>
                      <br />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ScheduleSettings;
