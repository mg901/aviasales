import React from 'react';
import './index.css';

type Props = {
  children: React.ReactNode;
};

export const Sidebar: React.FC<Props> = ({ children }) => (
  <div className="sidebar__wrap">
    <div className="sidebar__title">Количество пересадок</div>
    <ul className="sidebar__list">{children}</ul>
  </div>
);
