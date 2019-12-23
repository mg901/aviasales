import React from 'react';
import './index.css';

type Props = {
  label?: string;
  type?: number;
  onClick: () => void;
};

export const Filter: React.FC<Props> = ({ label, type, onClick }) => (
  <li>
    <label className="filter">
      <input name={label} value={type} type="checkbox" onClick={onClick} />
      {label}
    </label>
  </li>
);
