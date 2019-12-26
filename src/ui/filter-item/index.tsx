import React from 'react';
import './index.css';

type Props = {
  value: number;
  title: string;
  checked: boolean;
  onChange: () => void;
};

export const FilterItem: React.FC<Props> = ({
  value,
  title,
  checked,
  onChange,
}) => (
  <li>
    <label className="filter-item">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        className="filter-item__checkbox"
        onChange={onChange}
      />
      {title}
    </label>
  </li>
);
