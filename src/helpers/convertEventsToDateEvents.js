import { parseISO } from 'date-fns';

export const convertEventsToDateEvents = (events = []) => {
  return events.map((event) => {
    event.startDate = parseISO(event.startDate);
    event.endDate = parseISO(event.endDate);
    return event;
  });
};
