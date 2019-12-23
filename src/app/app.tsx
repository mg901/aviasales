import React from 'react';
import { Header, Logo } from '../ui';
import { AppGate } from './model';
import { Content } from '../content';
import './index.css';

export const App: React.FC = () => (
  <div className="app">
    <AppGate />
    <Header>
      <Logo />
    </Header>
    <Content />
  </div>
);
