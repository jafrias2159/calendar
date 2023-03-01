import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers/convertEventsToDateEvents';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const setActiveEvent = (activeEvent) => {
    dispatch(onSetActiveEvent(activeEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent }));
      } else {
        // creando
        const { data } = await calendarApi.post('/events', calendarEvent);
        console.log(data);
        dispatch(onAddNewEvent({ id: data.event.id, ...calendarEvent, user }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
    }
  };

  const startGettingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const convertEvents = convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(convertEvents));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    events,
    setActiveEvent,
    activeEvent,
    startSavingEvent,
    startDeletingEvent,
    startGettingEvents,
  };
};
