import { Navbar } from '../components/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar } from 'react-big-calendar';
import { addHours } from 'date-fns';
import { localizer } from '../helpers/calendarLocalizer';
import { CalendarEvent } from '../components/CalendarEvent';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUIStore } from '../../hooks/useUIStore.js';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';

export const CalendarPage = () => {
  const { events, setActiveEvent, activeEvent, startGettingEvents } =
    useCalendarStore();
  const { openDateModal, isDateModalOpen } = useUIStore();
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
    setActiveEvent(event);
  };

  const onviewChangeEventHandler = (event) => {
    console.log('onviewChangeEventHandler', event);
    localStorage.setItem('lastView', event);
  };

  useEffect(() => {
    startGettingEvents();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div>
        <Calendar
          defaultView={view}
          localizer={localizer}
          events={events}
          startAccessor='startDate'
          endAccessor='endDate'
          style={{ height: 'calc(100vh - 80px)' }}
          eventPropGetter={eventStyleGetter}
          components={{ event: CalendarEvent }}
          onDoubleClickEvent={onDoubleClickHandler}
          onSelectEvent={onSelectEventHandler}
          onView={onviewChangeEventHandler}
        />
        <CalendarModal />
        <FabAddNew />
        {activeEvent && !isDateModalOpen && <FabDelete />}
      </div>
    </>
  );
};
