import React from 'react';
import './index.css';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export const Tab: React.FC<Props> = ({ onClick, children }) => (
  <button type="button" className="tab" onClick={onClick}>
    {children}
  </button>
);
