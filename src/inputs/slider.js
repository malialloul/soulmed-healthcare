import classNames from "classnames";
import React, { useEffect, useState } from "react";
import RightChevron from "../icons/right-chevron";
import LeftChevron from "../icons/left-chevron";
import "../css/slider.css";

const Slider = ({ ...props }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);


  return (
    <div
      id="carouselHero"
      className="carousel slide d-flex"
      data-bs-ride="carousel"
    >
      <div
        className="d-flex align-items-center justify-content-center left"
        onClick={() =>
          visibleIndex === 0
            ? setVisibleIndex(props.children.length - 1)
            : setVisibleIndex(visibleIndex - 1)
        }
      >
        <LeftChevron />
      </div>

      <div className="carousel-inner">
        {props.children.map((child, i) => {
          let ch = React.cloneElement(child, {
            className: child.props.className + " " + props.classNames,
          });
          return (
            <div
              key={"slider" + i}
              className={classNames("carousel-item ", {
                active: visibleIndex === i,
              })}
            >
              {ch}
            </div>
          );
        })}
      </div>
      <div
        className="d-flex align-items-center justify-content-center right "
        onClick={() =>
          visibleIndex === props.children.length - 1
            ? setVisibleIndex(0)
            : setVisibleIndex(visibleIndex + 1)
        }
      >
        <RightChevron />
      </div>
    </div>
  );
};

export default Slider;
