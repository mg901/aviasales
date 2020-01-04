import React from 'react';
import './index.css';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Card: React.FC<Props> = ({ className, children }) => (
  <div className={`card ${className}`}>{children}</div>
);
