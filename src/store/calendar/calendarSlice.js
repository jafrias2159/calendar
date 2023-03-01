import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

// const temporaryEvent = {
//   id: new Date().getTime(),
//   title: 'Cumpleaños del Jefe',
//   notes: 'Hay que comprar el pastel',
//   startDate: new Date(),
//   endDate: addHours(new Date(), 2),
//   bgColor: '#fafafa',
//   user: {
//     id: '123',
//     name: 'Jorge',
//   },
// };

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoading: true,
    events: [
      //temporaryEvent
    ],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },

    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter(
        (event) => event?.id !== state.activeEvent.id
      );
      state.activeEvent = null;
    },
    onLoadEvents: (state, { payload }) => {
      state.isLoading = false;
      state.events = payload;
    },
    onLogoutCalendar: (state, { payload }) => {
      state.isLoading = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar
} = calendarSlice.actions;
