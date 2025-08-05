import React from "react";
import "./Helper.css";
const Checkbox = ({ props }) => {
  const { value, dispatch, id } = props;
  return (
    <div>
      <input
        id={id}
        checked={value}
        className="checkbox"
        type="checkbox"
        onChange={(e) => dispatch({  type:'check', id: id, val: e.target.checked })}
      />
    </div>
  );
};

export default Checkbox;
