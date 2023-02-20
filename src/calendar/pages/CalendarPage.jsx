import { Navbar } from '../components/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar } from 'react-big-calendar';
import { addHours } from 'date-fns';
import { localizer } from '../helpers/calendarLocalizer';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUIStore } from '../../hooks/useUIStore.js';
const events = [
  {
    title: 'Cumpleaños del Jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Jorge',
    },
  },
];
export const CalendarPage = () => {
  const { openDateModal } = useUIStore();
  const [view, setView] = useState(localStorage.getItem('lastView') || 'week');
  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: 'orange',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return { style };
  };

  const onDoubleClickHandler = (event) => {
    openDateModal();
  };
  const onSelectEventHandler = (event) => {
    console.log('onSelectEventHandler', event);
  };

  const onviewChangeEventHandler = (event) => {
    console.log('onviewChangeEventHandler', event);
    localStorage.setItem('lastView', event);
  };

  return (
    <>
      <Navbar></Navbar>
      <div>
        <Calendar
          defaultView={view}
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 'calc(100vh - 80px)' }}
          eventPropGetter={eventStyleGetter}
          components={{ event: CalendarEvent }}
          onDoubleClickEvent={onDoubleClickHandler}
          onSelectEvent={onSelectEventHandler}
          onView={onviewChangeEventHandler}
        />
        <CalendarModal />
      </div>
    </>
  );
};
