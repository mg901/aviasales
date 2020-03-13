import React from 'react';
import { Event } from 'effector';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void | Event<React.MouseEvent<HTMLButtonElement, MouseEvent>>;
};

export const Button: React.FC<Props> = ({
  type = 'button',
  active,
  className = '',
  children,
  onClick,
}) => (
  <button
    type={type}
    className={`btn ${className}`}
    data-active={active}
    onClick={onClick}>
    {children}
  </button>
);
