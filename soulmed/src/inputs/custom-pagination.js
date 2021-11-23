import laptop1 from "../laptop1.jpeg";
import "../css/custom-pagination.css";
import LeftChevron from "../icons/left-chevron";
import RightChevron from "../icons/right-chevron";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Outlet, Link } from "react-router-dom";

const CustomPagination = ({ ...props }) => {
  const maxPageSize = props.length;
  const [pageSize, setPageSize] = useState(3);
  const pageNumbers = Array.from(
    { length: Math.ceil(props.data.length / pageSize) },
    (_, i) => i + 1
  );
  const [dataList, setDataList] = useState(props.children);

  const [pageNumber, setPageNumber] = useState(1);

  const next = () => {
    if (pageNumber !== props.children.length / pageSize) {
      setPageNumber(pageNumber + 1);
    }
  };

  const previous = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  useEffect(() => {
    let list = props.children.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize
    );
    setDataList(list);
  }, [pageNumber, props.children, pageSize]);

  const modifyView = (e) => {
    setPageNumber(1);
    setPageSize(parseInt(e.target.value));
  };
  return (
    <div className="container-fluid">
     <div className="d-flex justify-content-between">
     <div className="view d-flex align-items-center">
        <h3>View</h3>
        <select className="px-4 mx-4" onChange={(e) => modifyView(e)}>
          {Array.from({ length: props.data.length }, (_, i) => (i + 1) * 3).map(
            (size, i) => {
              return (
                <option key={i} value={size}>
                  {size}
                </option>
              );
            }
          )}
        </select>
      </div>
      <h3>Total Results: {props.data.length}</h3>
     </div>
      <br/>
      <div className="d-flex row justify-content-center">{dataList}</div>
      <br />
      {pageSize < props.data.length && (
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
      )}
    </div>
  );
};

export default CustomPagination;
