import React from "react";
import "./index.css";

type Props = {
  label: string;
  type: number;
};

export const Filter: React.FC<Props> = ({ label, type }) => (
  <label className="filter">
    <input name={label} value={type} type="checkbox" />
    {label}
  </label>
);
