import { useState, useEffect, useRef } from "react";

const DropDown = ({ ...props }) => {
  const [data, setData] = useState([]);
  const [shownIndices, setShownIndices] = useState([]);

  useEffect(() => {
    if (props.data.length > 0) {
      setData(props.data);
      setShownIndices(Array.from({ length: props.data.length }, (_, i) => i));
    }
  }, [props.data]);

  useEffect(() => {
    if (props.searchText !== "") {
      setShownIndices([]);
      let list = [];
      props.data.map((item, i) => {
        Object.keys(item).map((innerAttr, index) => {
          if ((item[innerAttr] + "").indexOf(props.searchText) >= 0) {
            list.push(i);
          }
        });
      });
      setShownIndices(list);
    } else {
      setShownIndices(Array.from({ length: props.data.length }, (_, i) => i));
    }
  }, [props.searchText]);

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
    <div ref={ref} onClick={() => isVisible(!visible)} className="col-4">
      {props.children}
      {visible && data.length > 0 && (
        <ul className="search-dropdown rounded col-3 d-flex flex-column ">
          {data.map((item, index) => {
            return (
              shownIndices.indexOf(index) >= 0 && (
                <li key={"item" + index} className="dropdown-content">
                  {item.name}
                </li>
              )
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
