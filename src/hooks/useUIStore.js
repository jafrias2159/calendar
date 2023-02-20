import { useDispatch, useSelector } from 'react-redux';
import { onOpenDateModal, onCloseDateModal } from '../store/ui/uiSlice';

export const useUIStore = () => {
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDatemodal = () => {
    dispatch(onCloseDateModal());
  };

  return {
    //* Properties
    isDateModalOpen,
    
    openDateModal,
    closeDatemodal
  };
};
