import { useCalendarStore } from '../../hooks/useCalendarStore';

export const FabDelete = () => {
  const { startDeletingEvent } = useCalendarStore();
  const onDeleteHandler = () => {
    startDeletingEvent();
  };

  return (
    <button className='btn btn-danger fab-delete' onClick={onDeleteHandler}>
      <i className='fas fa-trash-alt'></i>
    </button>
  );
};
