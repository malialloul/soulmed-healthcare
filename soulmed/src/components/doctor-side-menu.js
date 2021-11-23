import "../css/doctor-side-menu.css";
import RightChevron from "../icons/right-chevron";
import "../scripts/doctor-side-menu";
import { Link } from "react-router-dom";
import classNames from "classnames";

const DoctorSideMenu = ({ ...props }) => {
  return (
    <div className="vh-100" id="side-menu">
      <Link
        to={"/doctor/dashboard"}
        className={classNames("", {
          selected_item: props.pageIndex === 0,
        })}
      >
        <div
          className={classNames("side-menu-item", {
            selected_item: props.pageIndex === 0,
          })}
        >
          <span>Home</span>
        </div>
      </Link>
      <div className="side-menu-item">
        <span>Messages</span>
      </div>
      <div className="side-menu-item">
        <span>Appointments History</span>
      </div>
      <Link to={"/doctor/schedule-settings/" + props.doctorId}>
        <div
          className={classNames("side-menu-item", {
            selected_item: props.pageIndex === 3,
          })}
        >
          {" "}
          <span>Shcedule Settings</span>
        </div>
      </Link>

      <div className="side-menu-item">
        <span>Invoices</span>
      </div>
      <div className="side-menu-item">
        <span>Manage Payment Methods</span>
      </div>
      <div className="side-menu-item">
        <span>Saved Products</span>
      </div>
    </div>
  );
};

export default DoctorSideMenu;
