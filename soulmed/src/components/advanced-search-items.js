import laptop1 from "../laptop1.jpeg";
import "../css/products-custom-pagination.css";
import LeftChevron from "../icons/left-chevron";
import RightChevron from "../icons/right-chevron";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Outlet, Link } from "react-router-dom";

const AdvancedSearchItems = ({ ...props }) => {
  const maxPageSize = props.length;
  const [pageSize, setPageSize] = useState(3);
  const pageNumbers = Array.from(
    { length: props.data.length / pageSize },
    (_, i) => i + 1
  );
  const [dataList, setDataList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const next = () => {
    if (pageNumber !== props.data.length / pageSize) {
      setPageNumber(pageNumber + 1);
    }
  };

  const previous = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  useEffect(() => {
    let list = props.data.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize
    );
    setDataList(list);
  }, [pageNumber, props.data, pageSize]);

  return (
    <div className="container-fluid">
      <div className="view">
        <span>View</span>
        <select onChange={(e) => setPageSize(parseInt(e.target.value))}>
          {Array.from(
            { length: props.data.length },
            (_, i) => (i+1) * 3
          ).map((size, i) => {
            return <option key={i} value={size}>{size}</option>;
          })}
        </select>
      </div>
      <div className="d-flex row">
       {props.children}
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <div
          onClick={() => previous()}
          className={classNames(
            "col-1 d-flex align-items-center justify-content-center",
            {
              disabled: pageNumber === 1,
            }
          )}
        >
          <LeftChevron />
        </div>
        {pageNumbers.map((i) => {
          return (
            <div
              key={i}
              onClick={() => setPageNumber(i)}
              className={classNames("pageNumber", {
                pageNumberSelected: i === pageNumber,
              })}
            >
              {i}
            </div>
          );
        })}
        <div
          onClick={() => next()}
          className={classNames(
            "col-1 d-flex align-items-center justify-content-center",
            {
              disabled: pageNumber === props.data.length / 3,
            }
          )}
        >
          <RightChevron />
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchItems;
