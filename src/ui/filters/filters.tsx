import React from "react";
import "./index.css";

type Props = {
  children: React.ReactNode;
};

export const Filters: React.FC<Props> = ({ children }) => (
  <article className="filters__wrapper">
    <h1>Количество пересадок</h1>
    <ul className="filters__list">{children}</ul>
  </article>
);
