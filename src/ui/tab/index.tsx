import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Tab: React.FC<Props> = ({ children }) => (
  <button type="button">{children}</button>
);
