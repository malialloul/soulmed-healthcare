import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { util } from "../public/util";

const SearchInput = ({ ...props }) => {
  const [data, setData] = useState([]);
  const showItem = (item) => {
    return util.showItem(item, props.searchText);
  };

  useEffect(() => {
    let list = [];
    for (let i = 0; i < props.data.length; i++) {
      if (showItem(props.data[i])) {
        list.push(props.data[i]);
      }
    }

    setData(list);
  }, [props.data, props.searchText]);

  useEffect(() => {
    if (props.onGetResults) {
      props.onGetResults(data);
    }
  }, [data]);


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
      {visible && (
        <ul className="search-dropdown rounded col-3 d-flex flex-column ">
          {props.data.map((item, index) => {
            if (showItem(item)) {
              let id = item.id;
              return (
                <Link to={"/view-profile/" + id}>
                  <li key={"item" + index} className="dropdown-content">
                    {item.name}
                  </li>
                </Link>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
