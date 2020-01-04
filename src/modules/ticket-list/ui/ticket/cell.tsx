import React from 'react';
import './index.css';

type Props = {
  title: string;
  content: string;
};

export const Cell: React.FC<Props> = ({ title, content }) => (
  <div className="ticket__cell">
    <div className="ticket__cell-title">{title}</div>
    <div className="ticket__cell-content">{content}</div>
  </div>
);
