import { fireEvent, render } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/FabDelete';

const mockStartDeletingEvent = jest.fn();
jest.mock('../../../src/hooks/useCalendarStore', () => {
  return {
    useCalendarStore: () => {
      return { startDeletingEvent: mockStartDeletingEvent };
    },
  };
});
describe('Testing <FabDelete/> component', () => {
  test('should render properly', () => {
    const fabDeleteComponent = render(<FabDelete />);
    fireEvent.click(fabDeleteComponent.getByRole('button'))
    
    expect(mockStartDeletingEvent).toHaveBeenCalled();
    expect(mockStartDeletingEvent).toHaveBeenCalledTimes(1);

  });
});
