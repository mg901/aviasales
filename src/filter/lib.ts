import { Ticket } from '../search/types';
import { uniq, compare, establishCase } from '../lib';
import { NomalizedTicket, NormalizedSegment } from './types';
import { CARRIERS_MAP } from './constants';
import { CDN_URL } from '../api';
import { Segment } from '../search/types';

export const makeStopsList = (x: Ticket[]): number[] => {
  const result = x
    .map(({ segments }) => segments.map(({ stops }) => stops.length))
    .flat();

  return uniq(result).sort(compare);
};

export const makeTransferTitle = (x: number): string => {
  const word = establishCase(x, ['пересадка', 'пересадки', 'пересадок']);

  return x === 0 ? `Без ${word}` : `${x} ${word}`;
};

export const normalizePrise = (x: number): string =>
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
    const title = normalizePrise(price);
    const logo = makeLogoURL(carrier);
    const [logoWidth, logoHeigth] = getLogoSize(CDN_URL);
    const there = normalizeSegment(head);
    const back = normalizeSegment(tail);
    const totalDuration = there.duration.value + back.duration.value;

    return {
      price: {
        title,
        value: price,
      },
      carrier: {
        logo,
        logoWidth,
        logoHeigth,
        name: CARRIERS_MAP[carrier],
      },
      segments: [there, back],
      totalDuration,
      stops: [there.stops.value, back.stops.value],
    };
  });
