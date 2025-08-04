import React from "react";
import "./helper.css";
const Input = ({ props }) => {
  const { value, dispatch, label, type, required } = props;
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        value={value}
        className="input"
        type={type}
        onChange={(e) => dispatch({ type: label, val: e.target.value })}
        required={required}
      />
    </div>
  );
};

export default Input;
