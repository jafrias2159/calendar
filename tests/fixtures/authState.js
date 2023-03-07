export const initialState = {
  status: 'checking', // authenticated, not-authenticated, checking
  user: {},
  errorMessage: null,
};

export const authenticatedState = {
  status: 'authenticated', // authenticated, not-authenticated, checking
  user: {
    id: '123ABC',
    name: 'Jorge',
  },
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: 'not-authenticated', // authenticated, not-authenticated, checking
  user: {},
  errorMessage: null,
};
