import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice';
import {
  calendarWithActiveEventState,
  events,
  initialState,
} from '../../fixtures/calendarStates';

describe('Testing calendarSlice', () => {
  test('should set an active event', () => {
    const [activeEvent] = events;
    const state = calendarSlice.reducer(
      initialState,
      onSetActiveEvent(activeEvent)
    );
    expect(state.activeEvent).toEqual(activeEvent);
  });

  test('should push a new event', () => {
    const [firstEvent] = events;
    const state = calendarSlice.reducer(
      initialState,
      onAddNewEvent(firstEvent)
    );
    expect(state.events.length).toBe(1);
  });

  test('should update an event', () => {
    const newTitle = 'cumpleaños de la jefa';
    const customEvent = { ...events[0], title: newTitle };
    let state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onUpdateEvent(customEvent)
    );
    expect(state.events[0].title).toEqual(newTitle);
  });

  test('should delete the active event', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );

    expect(state.events.length).toEqual(1);
    expect(state.events[0].id).toEqual('2');
  });

  test('should load new events', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.isLoading).toBeFalsy();
    expect(state.events.length).toEqual(2);
  });

  test('should set values on logout calendar', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );

    expect(state).toEqual(
      expect.objectContaining({
        isLoading: true,
        events: [],
        activeEvent: null,
      })
    );
  });
});
