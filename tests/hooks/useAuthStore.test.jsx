import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import calendarApi from '../../src/api/calendarApi';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { authSlice } from '../../src/store/auth/authSlice';
import { initialState, notAuthenticatedState } from '../fixtures/authState';
import { testUser } from '../fixtures/testUser';

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: { auth: { ...initialState } },
  });
};

describe('Tests on useAuthStore hook', () => {
  let spyOnCalendarApiPost = jest.fn();
  let spyOnCalendarApiGet = jest.fn();
  let spyOnlocalStorage = jest.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    spyOnCalendarApiPost.mockRestore();
    spyOnCalendarApiGet.mockRestore();
    spyOnlocalStorage.mockRestore();
  });

  test('should return the default values', () => {
    const mockStore = getMockStore({ ...initialState });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    const { result } = renderHook(() => useAuthStore(), { wrapper });

    expect(result.current).toEqual({
      status: expect.any(String),
      user: expect.any(Object),
      errorMessage: null,

      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkauthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });
  test('should startLogin works on correct credentials', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    const { result } = renderHook(() => useAuthStore(), { wrapper });

    await act(async () => {
      await result.current.startLogin(testUser);
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        status: 'authenticated',
        user: { name: 'Alex Fernandes', uid: '64077794217fc73ff628f406' },
        errorMessage: null,
      })
    );

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('tokenInitDate')).toEqual(expect.any(String));
  });

  test('should startLogin works on Incorrect credentials', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    const { result } = renderHook(() => useAuthStore(), { wrapper });

    await act(async () => {
      await result.current.startLogin({
        password: 'incorrectPassword',
        email: 'incorrect@gmail.com',
      });
    });
    expect(result.current).toEqual(
      expect.objectContaining({
        status: 'not-authenticated',
        user: {},
        errorMessage: 'Incorrect credentials',
      })
    );

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('tokenInitDate')).toBeNull();

    await waitFor(() => expect(result.current.errorMessage).toBeNull());
  });

  test('should startRegister works on correct credentials', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    const { result } = renderHook(() => useAuthStore(), { wrapper });
    spyOnCalendarApiPost = jest.spyOn(calendarApi, 'post');
    spyOnCalendarApiPost.mockReturnValue({
      data: {
        ok: true,
        uid: '640a17ae0c7f88a75b12b007',
        name: 'Alex Fernandes',
        token: 'some-token',
      },
    });

    await act(async () => {
      await result.current.startRegister({
        password: 'incorrectPassword',
        email: 'incorrect@gmail.com',
      });
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        status: 'authenticated',
        user: { name: 'Alex Fernandes', uid: '640a17ae0c7f88a75b12b007' },
        errorMessage: null,
      })
    );

    expect(localStorage.getItem('token')).not.toBeNull();
    expect(localStorage.getItem('tokenInitDate')).not.toBeNull();
  });

  test('should startRegister works on Incorrect credentials', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    const { result } = renderHook(() => useAuthStore(), { wrapper });
    spyOnCalendarApiPost = jest.spyOn(calendarApi, 'post');
    spyOnCalendarApiPost.mockRejectedValue();

    await act(async () => {
      await result.current.startRegister({
        password: 'incorrectPassword',
        email: 'incorrect@gmail.com',
      });
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        status: 'not-authenticated',
        user: {},
        errorMessage: 'Incorrect register data',
      })
    );

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('tokenInitDate')).toBeNull();
  });

  test('should checkauthToken works on null token', async () => {
    const mockStore = getMockStore({ ...initialState });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    const { result } = renderHook(() => useAuthStore(), { wrapper });

    await act(async () => {
      await result.current.checkauthToken();
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        status: 'not-authenticated',
        user: {},
        errorMessage: null,
      })
    );
  });

  test('should checkauthToken works on a working token', async () => {
    const mockStore = getMockStore({ ...initialState });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    const { result } = renderHook(() => useAuthStore(), { wrapper });
    localStorage.setItem('token', 'old-toke');
    spyOnCalendarApiPost = jest.spyOn(calendarApi, 'get').mockReturnValue({
      data: {
        name: 'jorge',
        uid: 'some-uid',
        token: 'new-token',
      },
    });
    await act(async () => {
      await result.current.checkauthToken();
    });
    console.log(result.current);
    expect(result.current).toEqual(
      expect.objectContaining({
        status: 'authenticated',
        user: { name: 'jorge', uid: 'some-uid' },
        errorMessage: null,
      })
    );

    expect(localStorage.getItem('token')).not.toBeNull();
    expect(localStorage.getItem('tokenInitDate')).not.toBeNull();
  });

  test('should checkauthToken works on a working token but on a backend issue', async () => {
    const mockStore = getMockStore({ ...initialState });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    const { result } = renderHook(() => useAuthStore(), { wrapper });
    localStorage.setItem('token', 'old-toke');
    spyOnCalendarApiPost = jest.spyOn(calendarApi, 'get').mockRejectedValue();
    await act(async () => {
      await result.current.checkauthToken();
    });
    console.log(result.current);
    expect(result.current).toEqual(
      expect.objectContaining({
        status: 'not-authenticated',
        user: {},
        errorMessage: null,
      })
    );

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('tokenInitDate')).toBeNull();
  });

  test('should startLogout works properly', async () => {
    const mockStore = getMockStore({ ...initialState });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    const { result } = renderHook(() => useAuthStore(), { wrapper });
    spyOnlocalStorage = jest.spyOn(Storage.prototype, 'clear');
    await act(async () => {
      await result.current.startLogout();
    });
    console.log(result.current);
    expect(result.current).toEqual(
      expect.objectContaining({
        status: 'not-authenticated',
        user: {},
        errorMessage: null,
      })
    );

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('tokenInitDate')).toBeNull();
  });
});
