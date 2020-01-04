import React from 'react';
import { Button } from '../../../ui';
import './index.css';

type Props = {
  active: boolean;
  title: string;
  onClick: () => void;
};

export const Tab: React.FC<Props> = ({ active, title, onClick }) => (
  <Button className="tab" active={active} onClick={onClick}>
    {title}
  </Button>
);
