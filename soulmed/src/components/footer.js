import logo from "../logo.png";
import "../css/footer.css";
import PaperAirPlane from "../icons/paper-airplane";
import Inbox from "../icons/inbox";
import Phone from "../icons/phone";
import Facebook from "../icons/facebook";
import Linkedin from "../icons/linkedin";
import YouTube from "../icons/youtube";

const Footer = () => {
  return (
    <div className="footer">
      <div className="d-flex footer-header">
        <div className="col-4">
          <img src={logo} alt="" className="footer-logo img-fluid" />
        </div>
        <div className="col-4"></div>
        <div className="col-4 d-flex justify-content-start">
          <h3>Our Core Values:</h3>
        </div>
      </div>
      <div className="d-flex footer-body">
        <div className="col-4 contact d-flex flex-column justify-content-start">
          <p>
            The spark of this Venture came from a personal experience. Having
            lived abroad for several years, we were unable to closely monitor
            our parents’ health on regular basis. We decided to take action. We
            started conducting our research until we found the solution which
            could help us stay updated about our beloveds’ health despite the
            distance and give guidance to help them on regular basis.
          </p>
          <br />
          <div className="contact-item justify-items-start d-flex">
            <PaperAirPlane />
            <p> Beirut Symposium 8th Floor</p>
          </div>
          <div className="contact-item d-flex">
            <Inbox />
            <p href="">info@soulmedlife.com</p>
          </div>
          <div className="contact-item d-flex">
            <Phone />
            <p>+961 1 511390</p>
          </div>
          <br />
          <div className="d-flex">
            <Facebook />
            <Linkedin />
            <YouTube />
          </div>
        </div>
        <div className="col-4 more-info">
          In 2018, after many years of combined medical knowledge and
          telemedicine research, SOULMED was created. SOULMED aims to cease the
          opportunities technology provides to bridge distances between patients
          and doctors, paving the way for a new form of remote healthcare and
          providing the best service for patients at the comfort of their homes
        </div>
        <div className="col-4">
        <ul>
            <li>
              <strong>Innovation</strong>
              <p>
                Exploiting new technology to make a difference in people’s daily
                lives.
              </p>
            </li>
            <li>
              <strong>Quality</strong>
              <p>
                Uncompromising ethical practices and highest medical standards
              </p>
            </li>
            <li>
              <strong>Flexibility</strong>
              User-friendly interface for both doctors and patients from any
              <p>device, anywhere, anytime.</p>
            </li>
            <li>
              <strong>Cost effectiveness</strong>
              <p>Best healthcare services at the most affordable cost.</p>
            </li>
            <li>
              <strong>Privacy {"&"} Security</strong>
              <p>
                Your personal records are protected and encrypted following the
                most stringent medical data security protocols.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
