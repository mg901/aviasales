import nanoid from 'nanoid';
import { Ticket, Segment } from '../../search/types';
import { NomalizedTicket, NormalizedSegment } from '../types';
import { CARRIERS_MAP } from './constants';
import { CDN_URL } from '../../api';
import { compareNumeric, uniq, addMinutes, makeTransferTitle } from '../../lib';

export const makeStopsList = (x: Ticket[]): number[] => {
  const result = x
    .map(({ segments }) => segments.map(({ stops }) => stops.length))
    .flat();

  return uniq(result)
    .slice(0)
    .sort(compareNumeric);
};

export const makePriceTitle = (x: number): string =>
  String(x).replace(/(\d{2})(\d+)/g, '$1 $2') + ' p';

const makeTimeFormat = (x: Date, separator = ':'): string => {
  const hours = String(x.getHours()).padStart(2, '0');
  const minutes = String(x.getMinutes()).padStart(2, '0');

  return `${hours}${separator}${minutes}`;
};

const calcDepartureAndArrivalTime = ({ date, duration }: Segment): string => {
  const departure = new Date(date);
  const arrival = addMinutes(departure, duration);

  return `${makeTimeFormat(departure)} - ${makeTimeFormat(arrival)}`;
};

const makeTravelTime = ({ duration }: Segment): string => {
  const hour = 60;
  const hours = Math.floor(duration / hour);
  const minutes = duration % hour;

  return `${hours}ч ${minutes}м`;
};

export const normalizeSegment = (x: Segment): NormalizedSegment => ({
  direction: {
    title: `${x.origin} - ${x.destination}`,
    content: calcDepartureAndArrivalTime(x),
  },
  duration: {
    title: 'в пути',
    content: makeTravelTime(x),
    value: x.duration,
  },
  stops: {
    title: makeTransferTitle(x.stops.length),
    content: x.stops.join(', '),
    value: x.stops.length,
  },
});

const getLogoSize = (url: string): number[] =>
  url
    .replace(/\/\/pics.avs.io\//, '')
    .split('/')
    .map(Number);

const makeLogoURL = (x: string): string => {
  const CDN_URL = `//pics.avs.io/99/36`;
  const isRetina = devicePixelRatio > 0;
  const img = isRetina ? `${x}@2x` : x;

  return `${CDN_URL}/${img}.png`;
};

export const normalizeTicket = ({
  price,
  carrier,
  segments: [head, tail],
}: Ticket): NomalizedTicket => {
  const title = makePriceTitle(price);
  const logo = makeLogoURL(carrier);
  const [logoWidth, logoHeigth] = getLogoSize(CDN_URL);
  const there = normalizeSegment(head);
  const back = normalizeSegment(tail);
  const duration = there.duration.value + back.duration.value;

  return {
    id: nanoid(),
    price,
    priceTitle: title,
    carrier: {
      logo,
      logoWidth,
      logoHeigth,
      name: CARRIERS_MAP[carrier],
    },
    segments: [there, back],
    duration,
    stops: [there.stops.value, back.stops.value],
  };
};
