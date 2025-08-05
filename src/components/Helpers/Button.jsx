import React from "react";
import "./Helper.css";

const Button = ({ props, children }) => {
  const { onClick, color } = props;
  return (
    <button className={`btn btn-${color}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
