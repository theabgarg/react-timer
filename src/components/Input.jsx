import React from "react";

const Input = (props) => {
  return (
    <>
      <div style={{ display: "inline-block" }}>
        <div className="input-details">
          <img src={props.imgURL} alt={props.imgALT} />
          {props.label && <label htmlFor="">{props.label}</label>}
        </div>
        <input
          type={props.type}
          className={props.styles}
          value={props.inputValue}
          onChange={props.onChangeFunction}
        />
      </div>
    </>
  );
};

export default Input;
