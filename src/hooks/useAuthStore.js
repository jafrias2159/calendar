import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { clearErrorMessage, onLogin, onLogout } from '../store/auth/authSlice';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      dispatch(onLogin({ name: data.name, uid: data.uid }));
      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenInitDate', new Date().getTime());
    } catch (error) {
      console.log(error);
      dispatch(onLogout('Incorrect credentials'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 50);
    }
  };

  const startRegister = async ({ email, password, name }) => {
    try {
      const { data } = await calendarApi.post('/auth/new', {
        email,
        password,
        name,
      });
      dispatch(onLogin({ name: data.name, uid: data.uid }));
      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenInitDate', new Date().getTime());
    } catch (error) {
      console.log(error);
      dispatch(onLogout('Incorrect register data'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 50);
    }
  };

  const checkauthToken = async () => {
    const token = localStorage.getItem('token');

    // token does not exist
    if (!token) {
      return dispatch(onLogout());
    }

    try {
      const { data } = await calendarApi.get('/auth/renew');
      dispatch(onLogin({ name: data.name, uid: data.uid }));
      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenInitDate', new Date().getTime());
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    checkauthToken,
    startLogout,
  };
};
