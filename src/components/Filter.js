import React from "react";

const Filter = ({ value, onChange }) => (
  <label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="🔍Search"
      style={{ textAlign: "center" }}
    />
  </label>
);

export default Filter;
