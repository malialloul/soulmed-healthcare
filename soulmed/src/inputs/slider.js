import React, { useEffect, useState } from "react";
import "../css/slider.css"
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

const SliderAnimation = ({ ...props }) => {

  return (
    <Slider autoplay={3000}>
      {props.content.map((item, index) => (
        <div
          key={index}
          className="image-div"
          style={{ background: `url('${item.image}') no-repeat center`,}}
        >
          <div className="center">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <button>{item.button}</button>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SliderAnimation;
