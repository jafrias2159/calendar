import {
  authSlice,
  clearErrorMessage,
  onCheking,
  onLogin,
  onLogout,
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/authState';
import { testUser } from '../../fixtures/testUser';

describe('Testing authSlice', () => {
  test('should have the initial state', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });
  test('should set the values on login', () => {
    let state = authSlice.reducer(initialState, onLogin(testUser));

    expect(state).toEqual(
      expect.objectContaining({
        status: 'authenticated',
        user: testUser,
        errorMessage: null,
      })
    );
  });

  test('should set the values on logout', () => {
    let state = authSlice.reducer(authenticatedState, onLogout());

    expect(state).toEqual(
      expect.objectContaining({
        status: 'not-authenticated',
        user: {},
        errorMessage: null,
      })
    );
  });

  test('should set the values on logout with msg', () => {
    const msg = 'Not valid credentials';
    let state = authSlice.reducer(authenticatedState, onLogout(msg));

    expect(state).toEqual(
      expect.objectContaining({
        status: 'not-authenticated',
        user: {},
        errorMessage: msg,
      })
    );
  });

  test('should clean the erro msg', () => {
    let state = {
      ...notAuthenticatedState,
      errorMessage: 'invalid credentials',
    };

    state = authSlice.reducer(state, clearErrorMessage());

    expect(state.errorMessage).toEqual(null);
  });

  test('should set the values on cheking action', () => {
    const state = authSlice.reducer(notAuthenticatedState, onCheking());
    expect(state).toEqual(
      expect.objectContaining({
        errorMessage: null,
        status: 'checking',
        user: {},
      })
    );
  });
});
