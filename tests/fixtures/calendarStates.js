export const events = [
  {
    id: '1',
    title: 'Cumpleaños del Jefe',
    notes: 'Hay que comprar el pastel',
    startDate: new Date('2023-12-05 13:00:00'),
    endDate: new Date('2023-12-05 15:00:00'),
  },

  {
    id: '2',
    title: 'Cumpleaños de melissa',
    notes: 'Llevar chocolates',
    startDate: new Date('2023-22-05 13:00:00'),
    endDate: new Date('2023-22-05 15:00:00'),
  },
];

export const initialState = {
  isLoading: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoading: true,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoading: true,
  events: [...events],
  activeEvent: { ...events[0] },
};
