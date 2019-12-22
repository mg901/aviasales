import React from "react";
import { Filters, Header, Logo } from "../ui";
import { AppGate } from "./model";

export const App: React.FC = () => (
  <div className="app">
    <AppGate />
    <Header>
      <Logo />
    </Header>
    <section data-layout="grid">
      <aside data-layout="sidebar"></aside>
      <main data-layout="main"></main>
    </section>
  </div>
);
