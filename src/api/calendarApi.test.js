import calendarApi from './calendarApi';

describe('Testing calendarApi', () => {
  test('should have the correct base url', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test('should headers have x-token property', async () => {
    const mockToken = 'ABC123';
    localStorage.setItem('token', mockToken);
    const resp = await calendarApi.get('/auth');
    expect(resp.config.headers['x-token']).toBe(mockToken);
  });
});
