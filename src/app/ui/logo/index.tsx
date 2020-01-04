import React from 'react';
import { useStore } from 'effector-react';
import { $loading } from '../../../search/model';
import './index.css';

export const Logo: React.FC = () => {
  const loading = useStore($loading);

  return (
    <div className="logo" data-active={loading}>
      <div></div>
      <div></div>
    </div>
  );
};
