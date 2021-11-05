import React, { useRef, useState } from "react";
import avatar from "../avatar.jpeg";
import appointment from "../appointment.png";

import RightChevron from "../icons/right-chevron";
import LeftChevron from "../icons/left-chevron";

const ScrollPagination = ({ ...props }) => {
  const ref = useRef();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="d-flex">
      <div
        className="d-flex h-auto  align-items-center justify-content-center"
        onClick={() => scroll(-500)}
      >
        <LeftChevron />
      </div>
      <div ref={ref} className="container d-flex items">
        {props.children.map((item, i) => {
          return item;
        })}
      </div>
      <div
        className="d-flex h-auto  align-items-center justify-content-center"
        onClick={() => scroll(500)}
      >
        <RightChevron />
      </div>
    </div>
  );
};

export default ScrollPagination;
