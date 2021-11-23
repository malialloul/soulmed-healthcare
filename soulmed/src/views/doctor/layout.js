import DoctorSideMenu from "../../components/doctor-side-menu";
import NavBar from "../../components/nav-bar";

const Layout = ({ ...props }) => {
  return (
    <>
      <NavBar />
      <div className="d-flex container-fluid">
        <DoctorSideMenu doctorId={props.doctorId} pageIndex={props.pageIndex} />
        <div className="body-content container vh-100">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Layout;
