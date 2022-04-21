import React from "react";

const Button = (props) => {
  return (
    <button className={props.styles} onClick={() => props.clickFunction()}>
      {props.name}
    </button>
  );
};

export default Button;
