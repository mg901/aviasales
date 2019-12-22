import React from "react";
import "./index.css";

type Props = {
  children: React.ReactNode;
};

export const Tabs: React.FC<Props> = ({ children }) => (
  <div className="tabs">{children}</div>
);
