import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';

jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/calendar/pages/CalendarPage', () => {
  return { CalendarPage: () => <h3>Calendar Page</h3> };
});

describe('Testing <AppRouter/> component', () => {
  const mockCheckauthToken = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render loading h1', () => {
    useAuthStore.mockReturnValue({
      status: 'checking',
      checkauthToken: mockCheckauthToken,
    });

    render(<AppRouter />);
    expect(screen.getByText('Loading')).toBeTruthy();
    expect(mockCheckauthToken).toHaveBeenCalled();
    expect;
  });

  test('should show the calendar page', () => {
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkauthToken: mockCheckauthToken,
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText('Ingreso')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('should show the calendar page', () => {
    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkauthToken: mockCheckauthToken,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText('Calendar Page')).toBeTruthy();
  });
});
