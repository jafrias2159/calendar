import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { useUIStore } from '../../src/hooks/useUIStore';
import { uiSlice } from '../../src/store/ui/uiSlice';

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: { ui: { ...initialState } },
  });
};

describe('Testing useUIStore', () => {

  test('should return the correct values 2/2', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(typeof result.current.isDateModalOpen).toBe('boolean');
    expect(typeof result.current.openDateModal).toBe('function');
    expect(typeof result.current.closeDateModal).toBe('function');
  });

  test('should set true on isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    act(() => {
      result.current.openDateModal();
    });

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test('should closeDateModal set isDateModalOpen to false', () => {
    const mockStore = getMockStore({ isDateModalOpen: true });
    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    act(() => {
      result.current.closeDateModal();
    });

    expect(result.current.isDateModalOpen).toBeFalsy();
  });
});
