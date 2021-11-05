import avatar from "../avatar.jpeg";
import appointment from "../appointment.png";

import "../css/advisory-board.css";

const AdvisoryBoard = () => {
  return (
    <div className="advisory">
      <h1>Advisory Board</h1>
      <em>Here are our Advisories</em>
      <br />
      <br />
      <div className="container d-flex">
        <div className="d-flex col-4 advisory-card flex-column align-items-center justify-content-center">
          <div className="card-img d-flex align-items-center justify-content-center">
            <img src={appointment} alt="" className="img-fluid" />
          </div>
          <br />
          <span>
            Find a doctor and take an appointment physically or Virtally
          </span>
        </div>

        <div className="d-flex col-4 advisory-card flex-column align-items-center justify-content-center">
          <div className="card-img d-flex align-items-center justify-content-center">
            <img src={appointment} alt="" className="img-fluid" />
          </div>
          <br />
          <span>
            Find a doctor and take an appointment physically or Virtally
          </span>
        </div>

        <div className="d-flex col-4 advisory-card flex-column align-items-center justify-content-center">
          <div className="card-img d-flex align-items-center justify-content-center">
            <img src={appointment} alt="" className="img-fluid" />
          </div>
          <br />
          <span>
            Find a doctor and take an appointment physically or Virtally
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryBoard;
