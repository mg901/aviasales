import React from 'react';
import './index.css';

type Props = {
  title: string;
  checked: boolean;
  value?: number;
  onChange: () => void;
};

export const Checkbox: React.FC<Props> = ({
  value,
  title,
  checked,
  onChange,
}) => (
  <label className="checkbox-wrap">
    <input
      type="checkbox"
      value={value}
      checked={checked}
      className="checkbox"
      onChange={onChange}
    />
    {title}
  </label>
);
