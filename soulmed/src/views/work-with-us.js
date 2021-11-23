import classNames from "classnames";
import { useState } from "react";
import "../css/work-with-us.css";
import NavBar from "../components/nav-bar";
import Map from "../inputs/map";

const WokrWithUs = () => {
  const [index, setIndex] = useState(0);
  const [mapData, setMapData] = useState({
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  });

  return (
    <>
      <NavBar />

      <div className="main-div">
        <div className="w-100 wizard-div d-flex align-items-center justify-content-between">
          <div className="wizard-line"></div>

          <div className="step1 wizard-step d-flex flex-column justify-content-center align-items-center">
            <div
              onClick={() => setIndex(0)}
              className={classNames("step", {
                selected_step: index === 0,
              })}
            ></div>
            <span>Welcome</span>
          </div>

          <div className="step2 wizard-step d-flex flex-column justify-content-center align-items-center">
            <div
              onClick={() => setIndex(1)}
              className={classNames("step", {
                selected_step: index === 1,
              })}
            ></div>{" "}
            <span>Identification</span>
          </div>

          <div className="step3 wizard-step d-flex flex-column justify-content-center align-items-center">
            <div
              onClick={() => setIndex(2)}
              className={classNames("step", {
                selected_step: index === 2,
              })}
            ></div>{" "}
            <span>Organization</span>
          </div>

          <div className="step4 wizard-step d-flex flex-column justify-content-center align-items-center">
            <div
              onClick={() => setIndex(3)}
              className={classNames("step", {
                selected_step: index === 3,
              })}
            ></div>{" "}
            <span>Summary</span>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="account-details">
            {index === 0 && <div className="welcome">Welcome</div>}
            {index === 1 && (
              <div className="d-flex flex-column identification-div">
                <div className="form-group d-flex p-4  align-items-center">
                  <label>Add ID or passport</label>
                  <div>
                    <label for="files" className="upload-btn">
                      Select Image
                    </label>
                    <input id="files" className="d-none" type="file" />
                  </div>
                </div>

                <div className="form-group d-flex p-4  align-items-center">
                  <label>Choose Profession</label>
                  <div>
                    <select className="input">
                      <option>op1</option>
                      <option>op2</option>
                      <option>op3</option>
                    </select>
                  </div>
                </div>
                <div className="form-group d-flex p-4  align-items-center">
                  <label>Choose Speciality</label>
                  <div>
                    <select className="input">
                      <option>op1</option>
                      <option>op2</option>
                      <option>op3</option>
                    </select>
                  </div>
                </div>
                <div className="form-group d-flex p-4  align-items-center">
                  <label>Graduation year</label>
                  <div className="d-flex">
                    <input
                      type="number"
                      min={1}
                      max={31}
                      className="input"
                      placeholder="dd"
                    />
                    <input
                      type="number"
                      min={1}
                      max={12}
                      className="input"
                      placeholder="mm"
                    />

                    <input
                      type="number"
                      min={1900}
                      max={new Date().getFullYear()}
                      className="input"
                      placeholder="yyyy"
                    />
                  </div>
                </div>
                <div className="form-group d-flex p-4  align-items-center">
                  <label>Years of experience</label>
                  <div>
                    <select className="input">
                      <option>1-2</option>
                      <option>3-5</option>
                      <option>{">"} 5</option>
                    </select>
                  </div>
                </div>
                <div className="form-group d-flex p-4  align-items-center">
                  <label>Add Certifications</label>
                  <div>
                    <label for="files" className="upload-btn">
                      Select Image
                    </label>
                    <input multiple id="files" className="d-none" type="file" />
                  </div>
                </div>
                <div className="form-group d-flex p-4  align-items-center">
                  <label>Add Location</label>
                  <div>
                    <Map />
                  </div>
                </div>
              </div>
            )}
            {index === 2 && <div className="organization">Organization</div>}
            {index === 3 && <div className="summary">Summary</div>}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => setIndex(index === 0 ? 0 : index - 1)}>
            Back
          </button>

          <button onClick={() => setIndex(index === 3 ? 3 : index + 1)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};
export default WokrWithUs;
