import React from 'react';
import { Cell } from './cell';
import './index.css';
import { NormalizedSegment } from '../../../cache/types';

type Props = {
  item: NormalizedSegment;
};

export const TicketItem: React.FC<Props> = ({
  item: { direction, duration, stops },
}) => (
  <div className="ticket__row">
    <Cell title={direction.title} content={direction.content} />
    <Cell title={duration.title} content={duration.content} />
    <Cell title={stops.title} content={stops.content} />
  </div>
);
