import React from 'react';
import './index.css';

type Props = {
  active: boolean;
  title: string;
  onClick: () => void;
};

export const Tab: React.FC<Props> = ({ active, title, onClick }) => (
  <button className="tab" data-active={active} onClick={onClick}>
    {title}
  </button>
);
