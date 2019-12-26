import React from 'react';
import './index.css';

type Carrier = {
  logo: string;
  logoWidth: number;
  logoHeigth: number;
  name: string;
};

type Props = {
  price: string;
  carrier: Carrier;
  chilren?: React.ReactNode;
};

export const Ticket: React.FC<Props> = ({
  price,
  carrier: { logo, logoWidth, logoHeigth, name },
  children,
}) => {
  return (
    <div className="ticket">
      <div className="ticket__header">
        <span className="ticket__price">{price}</span>
        <img
          src={logo}
          width={logoWidth}
          height={logoHeigth}
          className="ticket__carrier-img"
          alt={name}
        />
      </div>
      {children}
    </div>
  );
};
