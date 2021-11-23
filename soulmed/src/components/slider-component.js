import React from "react";
import Slider from "../inputs/slider";
import logo from "../assets/images/logo.png";
import avatar from "../avatar.jpeg";
import soulmed from "../soulmed-bg.jpg";

const SliderComponent = ({ ...props }) => {
  return (
    <Slider classNames="d-block w-100">
      <img src={soulmed} alt="" />
      <img src={avatar} alt="" />
      <img src={logo} alt="" />
      <img src={logo} alt="" />
      <img src={logo} alt="" />
    </Slider>
  );
};

export default SliderComponent;
