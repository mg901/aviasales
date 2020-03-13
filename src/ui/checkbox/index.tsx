import React from 'react';
import { Event } from 'effector';
import './index.css';

type Props = {
  title: string;
  checked: boolean;
  value?: number;
  onChange: () => void | Event<React.ChangeEvent<HTMLInputElement>>;
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
