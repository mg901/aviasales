import React from 'react';
import { Card } from '../../../../ui';
import { NomalizedTicket } from '../../../cache/types';
import './index.css';

type Props = {
  price: string;
  carrier: NomalizedTicket['carrier'];
  chilren?: React.ReactNode;
};

export const Ticket: React.FC<Props> = ({
  price,
  carrier: { logo, logoWidth, logoHeigth, name },
  children,
}) => (
  <Card className="ticket">
    <div className="ticket__header">
      <span className="ticket__title">{price}</span>
      <img
        src={logo}
        width={logoWidth}
        height={logoHeigth}
        className="ticket__carrier-logo"
        alt={name}
      />
    </div>
    {children}
  </Card>
);
