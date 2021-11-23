import React, { useContext } from "react";
import Slider from "@material-ui/core/Slider";
import "../css/price-range.css";
const PriceRange = ({ ...props }) => {
  const [value, setValue] = React.useState([props.min, props.max]);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.onChange(value);
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <Slider
        min={props.min}
        max={props.max}
        step={1}
        value={value}
        className="slider"
        onChange={handleChange}
      />
      <div className="d-flex justify-content-center">
        Between ${value[0]} and ${value[1]}
      </div>
    </div>
  );
};

export default PriceRange;
