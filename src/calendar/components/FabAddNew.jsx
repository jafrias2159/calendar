import { addHours } from 'date-fns';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUIStore } from '../../hooks/useUIStore';

export const FabAddNew = () => {
  const { openDateModal } = useUIStore();
  const { setActiveEvent } = useCalendarStore();
  const onClickHandler = () => {
    setActiveEvent({
      title: '',
      notes: '',
      startDate: new Date(),
      endDate: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        _id: '123',
        name: 'Jorge',
      },
    });
    openDateModal();
  };

  return (
    <button className='btn btn-primary fab' onClick={onClickHandler}>
      <i className='fas fa-plus'></i>
    </button>
  );
};
