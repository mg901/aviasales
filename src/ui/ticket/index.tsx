import React from "react";
import "./index.css";

type Props = {
  price: number;
  carrier: string;
  chilren: React.ReactNode;
};

export const Ticket: React.FC<Props> = ({ price, carrier, children }) => (
  <article className="ticket">
    <header>
      <span className="ticket__price">{price}p</span>
      <span className="ticket__carrier">{carrier}</span>
    </header>
    {children}
  </article>
);
