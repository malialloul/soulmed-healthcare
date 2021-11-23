import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { util } from "../public/util";

const DropDown = ({ ...props }) => {
  const [data, setData] = useState([]);
 

  

  const [visible, isVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (visible && ref.current && !ref.current.contains(e.target)) {
        isVisible(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [visible]);

  return (
    <div ref={ref} onClick={() => isVisible(!visible)}>
      {props.children}
      {visible && (
        <ul className="search-dropdown rounded col-3 d-flex flex-column ">
          <li>eee</li>
        </ul>
      )}
    </div>
  );
};

export default DropDown;
