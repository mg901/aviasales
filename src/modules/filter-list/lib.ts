import { Ticket } from '../search/types';
import { NomalizedTicket, NormalizedSegment } from './types';
import { CARRIERS_MAP } from './constants';
import { CDN_URL } from '../../api';
import { compare } from '../../lib';
import { Segment } from '../search/types';

const uniq = <T>(x: T[]): T[] => Array.from(new Set(x));

const establishCase = (x: number | string, list: string[]): string => {
  const value = Number(x);
  const index = value > 19 ? value % 10 : value % 100;

  switch (index) {
    case 1:
      return list[0];
    case 2:
    case 3:
    case 4:
      return list[1];
    default:
      return list[2];
  }
};

export const makeStopsList = (x: Ticket[]): number[] => {
  const result = x
    .map(({ segments }) => segments.map(({ stops }) => stops.length))
    .flat();

  return uniq(result)
    .slice(0)
    .sort(compare);
};

export const makeTransferTitle = (x: number): string => {
  const word = establishCase(x, ['пересадка', 'пересадки', 'пересадок']);

  return x === 0 ? `Без ${word}` : `${x} ${word}`;
};

export const makePriceTitle = (x: number): string =>
  String(x).replace(/(\d{2})(\d+)/g, '$1 $2') + ' p';

const calcTimeFormat = (x: Date, separator = ':'): string => {
  const hours = String(x.getHours()).padStart(2, '0');
  const minutes = String(x.getMinutes()).padStart(2, '0');

  return `${hours}${separator}${minutes}`;
};

const calcDepartureAndArrivalTime = ({ date, duration }: Segment): string => {
  const departure = new Date(date);
  const arrival = new Date(departure.getTime() * duration * 60000);

  return `${calcTimeFormat(departure)} - ${calcTimeFormat(arrival)}`;
};

const calcTravelTime = ({ duration }: Segment): string => {
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
    content: calcTravelTime(x),
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

export const normalize = (x: Ticket[]): NomalizedTicket[] =>
  x.map(({ price, carrier, segments: [head, tail] }) => {
    const title = makePriceTitle(price);
    const logo = makeLogoURL(carrier);
    const [logoWidth, logoHeigth] = getLogoSize(CDN_URL);
    const there = normalizeSegment(head);
    const back = normalizeSegment(tail);
    const duration = there.duration.value + back.duration.value;

    return {
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
  });
