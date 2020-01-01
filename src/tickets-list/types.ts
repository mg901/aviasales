export type NormalizedSegment = {
  direction: {
    title: string;
    content: string;
  };
  duration: {
    title: string;
    content: string;
    // Общее время перелёта в минутах
    value: number;
  };
  stops: {
    title: string;
    content: string;
    // Массив кодов (iata) городов с пересадками
    value: number;
  };
};

export type NomalizedTicket = {
  price: {
    title: string;
    value: number;
  };
  carrier: {
    logo: string;
    logoWidth: number;
    logoHeigth: number;
    name: string;
  };
  segments: [NormalizedSegment, NormalizedSegment];
  totalDuration: number;
};
