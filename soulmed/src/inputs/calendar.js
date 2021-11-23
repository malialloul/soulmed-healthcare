import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { Modal } from "react-bootstrap";
import "../css/calendar.css";
import { format } from "date-fns";
import moment from "moment";
import { util } from "../public/util";
import "../scripts/calendar";
import { doctorController } from "../controllers/doctor";

const Calendar = ({ ...props }) => {
  const [appointmentText, setAppointmentText] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [datetime, setDatetime] = useState("");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showEventsListModal, setShowEventsListModal] = useState(false);
  const [scheduleEventSelected, setScheduleEventSelected] = useState(false);
  const [bookAppointmentSelected, setBookAppointmentSelected] = useState(false);
  const [loading, isLoading] = useState(true);
  const [data, setData] = useState({
    allFavs: [],
    favObj: {},
    start: "",
    end: "",
    view: "timeGridWeek",
    filledIn: false,
    events: [],
    type: 2,
    patient_fk: 1,
    doctor_fk: props.doctorId,
    location: "",
  });
  const setType = (val) => {
    let tempData = data;
    data.type = val;
    setData(tempData);
  };

  useEffect(() => {
    doctorController.getAllDoctorAppointments(5).then((apptms) => {
      doctorController
        .getDoctorSchedule(5)
        .then((schedule) => {
          let list = schedule.data;

          for (let j = 0; j < apptms.length; j++) {
            apptms[j]["backgroundColor"] =
              apptms[j].type === 0
                ? "chartreuse"
                : apptms[j].type === 1
                ? "coral"
                : apptms[j].type === 2
                ? "darkred"
                : apptms[j].type === 3
                ? "#ddd"
                : apptms[j].type === 4
                ? "pink"
                : "";
          }

          for (let i = 0; i < list.length; i++) {
            list[i]["is_schedule"] = true;
            list[i]["display"] = "background";
          }
          let tempData = data;

          if (apptms && schedule.data) {
            tempData.events = [...apptms, ...schedule.data];
          } else {
            if (apptms) {
              tempData.events = [...apptms.data];
            }
            if (schedule.data) {
              tempData.events = [...schedule.data];
            }
          }

          setData(tempData);
        })
        .then(() => {
          isLoading(false);
        });
    });
  }, []);

  const handleBookApptBtn = () => {
    setBookAppointmentSelected(true);
    setShowAppointmentModal(true);
  };

  //ask for appointment ouside range
  const createEvent = () => {
    let submitted = true;
    let tempData = data;
    let events = tempData.events;
    let checkEvents = tempData.events.filter((e) => !e.is_schedule);
    let checkSchedule = tempData.events.filter((e) => e.is_schedule);
    let startTime = "";
    let endTime = "";
    let newEvent = {};
    if (!bookAppointmentSelected) {
      startTime =
        data.view === "timeGridWeek" || data.view === "timeGridDay"
          ? new Date(tempData.start)
          : tempData.start + "T" + datetime;
      endTime =
        data.view === "timeGridWeek" || data.view === "timeGridDay"
          ? new Date(tempData.start)
          : new Date(tempData.start + "T" + datetime);
      endTime.setMinutes(endTime.getMinutes() + 30);
      endTime = moment(endTime).format("YYYY-MM-DDTkk:mm");
      startTime = moment(startTime).format("YYYY-MM-DDTkk:mm");
    } else {
      endTime = new Date(datetime);
      endTime.setMinutes(endTime.getMinutes() + 30);
      endTime = moment(endTime).format("YYYY-MM-DDTkk:mm");
      startTime = moment(datetime).format("YYYY-MM-DDTkk:mm");
    }
    newEvent = {
      title: appointmentText,
      start: startTime,
      end: endTime,
      id: checkEvents.length + 1,
      type: data.type,
      patient_fk: 1,
      status: 0,
    };

    if (appointmentText === "") {
      alert("Appointment description couldn't be empty");
      submitted = false;
    } else if (data.type === 2 || data.type === "") {
      alert("You should select a type");
      submitted = false;
    } else if (
      datetime === "" &&
      data.view !== "timeGridWeek" &&
      data.view !== "timeGridDay"
    ) {
      alert("You should set a date/time");
      submitted = false;
    } else if (util.isOverlapping(newEvent, checkEvents)) {
      alert("Appointment Overlapping, Try another time");
      submitted = false;
    } else if (!util.inSubRange(newEvent, checkSchedule)) {
      alert("Cannot add at this spot");
      submitted = false;
    }

    if (submitted) {
      doctorController.addDoctorAppointment(newEvent).then(() => {
        newEvent["backgroundColor"] =
          data.type === 0
            ? "chartreuse"
            : data.type === 1
            ? "coral"
            : data.type === 2
            ? "darkred"
            : data.type === 3
            ? "#ddd"
            : data.type === 4
            ? "pink"
            : "";

        events = [...events, newEvent];
        setDatetime("");
        setAppointmentText("");
        tempData.events = events;
        setData(tempData);
        setShowAppointmentModal(false);
        setBookAppointmentSelected(false);
        setScheduleEventSelected(false);
      });
    }
  };

  const handleDateSelect = (selectInfo) => {
    let tempEvent = { start: selectInfo.startStr, end: selectInfo.endStr };
    let checkSchedule = data.events.filter((e) => e.is_schedule);

    if (props.allowEdit && util.inSubRange(tempEvent, checkSchedule)) {
      let scheduleItem =
        checkSchedule[util.getSubrangeIndex(tempEvent, checkSchedule)];

      if (scheduleItem.type !== 4 && scheduleItem.type !== 3) {
        let tempData = data;
        tempData.start = selectInfo.startStr;
        tempData.end = selectInfo.endStr;
        tempData.type = parseInt(scheduleItem.type);
        tempData.location = tempData.type === 0 ? scheduleItem.location : "";

        setData(tempData);
        setShowAppointmentModal(true);
      }

      // setShowEventsListModal(true);
    }

    if (!props.allowEdit && selectInfo.view.type === "dayGridMonth") {
      let tempData = data;
      tempData.start = selectInfo.startStr;
      tempData.end = selectInfo.endStr;
      setData(tempData);
      setShowEventsListModal(true);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (props.allowEdit && clickInfo.event._def.extendedProps.is_schedule) {
      let tempData = data;
      tempData.start = moment(clickInfo.event._instance.range.start).format(
        "YYYY-MM-DD"
      );
      tempData.end = moment(clickInfo.event._instance.range.end).format(
        "YYYY-MM-DD"
      );
      tempData.type = clickInfo.event._def.extendedProps.type;
      setData(tempData);

      setScheduleEventSelected(true);
      setShowAppointmentModal(true);
    }
  };

  const workSpec = [
    {
      daysOfWeek: [1, 2, 3, 4],
      startTime: "08:00",
      endTime: "13:00",
    },
    {
      daysOfWeek: [5, 6],
      startTime: "09:00",
      endTime: "14:00",
      backgroundColor: "red",
    },
  ];

  const workMin = workSpec
    .map((item) => item.startTime)
    .sort()
    .shift();
  const workMax = workSpec
    .map((item) => item.endTime)
    .sort()
    .pop();
  const workDays = [...new Set(workSpec.flatMap((item) => item.daysOfWeek))];
  const hideDays = [...Array(7).keys()].filter(
    (day) => !workDays.includes(day)
  );

  const hideModal = () => {
    setShowAppointmentModal(false);
    let tempData = data;
    tempData.start = "";
    tempData.type = 2;
    setData(tempData);
    setBookAppointmentSelected(false);
  };

  return (
    !loading && (
      <div className="d-flex flex-column">
        <FullCalendar
          headerToolbar={{
            left: "prev,next,today",
            center: "title",
            right: "timeGridWeek,timeGridDay,dayGridMonth",
          }}
          initialView="timeGridWeek"
          firstDay={1}
          selectable={true}
          height={600}
          select={handleDateSelect}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          weekends={true}
          events={data.events}
          eventOverlap={true}
          allDaySlot={false}
          aspectRatio={1}
          navLinks={true}
          selectAllow={function (select) {
            return (
              moment(new Date(select.start)).format("YYYY-MM-DD") >=
              moment(new Date()).format("YYYY-MM-DD")
            );
          }}
          eventDidMount={function (event) {
            if (event.event._def.extendedProps.is_schedule) {
              let details = event.event._def.extendedProps;
              let backgroundColor = "";
              if (details.type === 0) {
                backgroundColor = "chartreuse";
              } else if (details.type === 1) {
                backgroundColor = "coral";
              } else if (details.type === 2) {
                backgroundColor = "darkred";
              } else {
                if (
                  (details.type === 3 || details.type === 4) &&
                  props.allowEdit
                ) {
                  backgroundColor = "red";
                } else {
                  if (details.type === 3) {
                    backgroundColor = "#ddd";
                  } else if (details.type === 4) {
                    backgroundColor = "pink";
                  }
                }
              }

              event.el.outerHTML =
                '<div title="' +
                (details.type !== 2 ? details.location : "") +
                '" class="fc-bg-event fc-event d-flex justify-content-center align-items-center fc-event-start fc-event-end fc-event-today fc-event-future" style="background-color:' +
                backgroundColor +
                ';color:black">' +
                (details.type !== 2 ? details.location : "") +
                "</div>";
            }
          }}
        dayCellDidMount = {function (cell) {
          console.log(cell)
        }}
          slotDuration={"00:30"}
          //   eventClick={handleEventClick}
        />
        <br />
        {(data.view === "timeGridWeek" || data.view === "timeGridDay") && (
          <div className="d-flex justify-content-between scale_keys">
            <div className="d-flex justify-content-center align-items-center">
              <div className="physical_appointment scale_key"></div>
              <span>Physical Appointment</span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="virtual_appointment scale_key"></div>
              <span>Virtual Appointment</span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="pv_appointment scale_key"></div>
              <span>Both</span>
            </div>
            {!props.allowEdit ? (
              <>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="meeting scale_key"></div>
                  <span>Meeting</span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="break scale_key"></div>
                  <span>Lunch Break</span>
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <div className="busy scale_key"></div>
                <span>Busy</span>
              </div>
            )}
          </div>
        )}

        <br />
        {props.allowEdit && (
          <button
            className="w-100 book_appmt"
            onClick={() => handleBookApptBtn()}
          >
            Book Appointment
          </button>
        )}

        <Modal
          show={showAppointmentModal}
          onHide={() => hideModal()}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <div className="signup-title">
                <span className="title">
                  Add Appointment{" "}
                  {data.location !== "" ? "at " + data.location : ""}
                  {!bookAppointmentSelected
                    ? " from " +
                      moment(data.start).format("kk:mm") +
                      " until " +
                      moment(data.end).format("kk:mm")
                    : ""}
                </span>{" "}
                <br />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <input
                type="text"
                placeholder="Appoitment description"
                className="input"
                onChange={(e) => setAppointmentText(e.target.value)}
              />

              {(bookAppointmentSelected || data.type === 2) && (
                <div className="d-flex justify-content-between align-items-center p-3 input">
                  <span>Appointment Type</span>

                  <div className="d-flex align-items-center">
                    <input
                      onChange={() => setType(0)}
                      type="radio"
                      value={0}
                      name="apmt_type"
                    />
                    <label>Physical</label>
                  </div>
                  <div className="d-flex align-items-center mx-2">
                    <input
                      onChange={() => setType(1)}
                      type="radio"
                      value={1}
                      name="apmt_type"
                    />
                    <label>Virtual</label>
                  </div>
                </div>
              )}

              <input
                className="input"
                defaultValue={startDate}
                type={
                  bookAppointmentSelected
                    ? "datetime-local"
                    : data.view === "dayGridMonth"
                    ? "time"
                    : "hidden"
                }
                step="1"
                onChange={(e) => setDatetime(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => createEvent()}>Add</button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showEventsListModal}
          onHide={() => setShowEventsListModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <div className="signup-title">
                <span className="title">
                  All Appointments for{" "}
                  {moment(new Date(data.start)).format("DD-MM-YYYY").toString()}
                </span>{" "}
                <br />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {data.events.filter(
              (aptm) =>
                util.sameDay(new Date(aptm.start), new Date(data.start)) &&
                !aptm.is_schedule
            ).length === 0 && <div>No Events on this day</div>}
            {data.events
              .filter(
                (aptm) =>
                  util.sameDay(new Date(aptm.start), new Date(data.start)) &&
                  !aptm.is_schedule
              )
              .map((apmt, i) => {
                return (
                  <div key={"ap" + i} className="d-flex flex-column">
                    <span>{apmt.title}</span>
                    <div className="d-flex">
                      <span>Start Time</span>
                      <span>
                        {new Date(apmt.start).getHours()}:
                        {new Date(apmt.start).getMinutes().toString().length ===
                        1
                          ? "0" + new Date(apmt.start).getMinutes()
                          : new Date(apmt.start).getMinutes()}
                      </span>
                    </div>
                    <div className="d-flex">
                      <span>End Time</span>
                      <span>
                        {new Date(apmt.end).getHours()}:
                        {new Date(apmt.end).getMinutes().toString().length === 1
                          ? "0" + new Date(apmt.end).getMinutes()
                          : new Date(apmt.end).getMinutes()}
                      </span>
                    </div>
                  </div>
                );
              })}
          </Modal.Body>
        </Modal>
      </div>
    )
  );
};

export default Calendar;
