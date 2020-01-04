export type SearchID = Readonly<{
  searchId: string;
}>;

export type SearchResult = Readonly<{
  tickets: Ticket[];
  stop: boolean;
}>;

// Массив перелётов.
// В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
export type Segment = Readonly<{
  // Код города (iata)
  origin: string;
  // Код города (iata)
  destination: string;
  // Дата и время вылета туда
  date: string;
  // Массив кодов (iata) городов с пересадками
  stops: string[];
  // Общее время перелёта в минутах
  duration: number;
}>;

export type Ticket = Readonly<{
  // Цена в рублях
  price: number;
  // Код авиакомпании (iata)
  carrier: string;
  segments: [Segment, Segment];
}>;
