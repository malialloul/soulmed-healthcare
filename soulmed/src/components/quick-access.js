import appointment from "../appointment.png";

import "../css/quick-access.css";

const QuickAccess = () => {
  return (
    <div className="main-div">
      <h1>Quick Access</h1>
      <em>Start using our website</em>
      <br />
      <br />
      <div className="container d-flex flex-wrap">
        <div className="d-flex col-6 access-card flex-column align-items-center justify-content-center">
          <div className="card-img d-flex align-items-center justify-content-center">
            <img src={appointment} alt="" className="img-fluid" />
          </div>
          <br />
          <span className="label">Take an appointment</span>
        </div>

        <div className="d-flex col-6  access-card flex-column align-items-center justify-content-center">
          <div className="card-img d-flex align-items-center justify-content-center">
            <img src={appointment} alt="" className="img-fluid" />
          </div>
          <br />
          <span className="label">Find a hospital</span>
        </div>

        <div className="d-flex col-6 access-card flex-column align-items-center justify-content-center">
          <div className="card-img d-flex align-items-center justify-content-center">
            <img src={appointment} alt="" className="img-fluid" />
          </div>
          <br />
          <span className="label">Urgent medical assistance </span>
        </div>

        <div className="d-flex col-6 access-card flex-column align-items-center justify-content-center">
          <div className="card-img d-flex align-items-center justify-content-center">
            <img src={appointment} alt="" className="img-fluid" />
          </div>
          <br />
          <span className="label">Labs</span>
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
