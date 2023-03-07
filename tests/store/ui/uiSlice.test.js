import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store/ui/uiSlice';

describe('Testing uiSlice', () => {
  test('should have the default initial state', () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
  });

  test('should isDateModalOpen change on reducers action', () => { 
    let state = uiSlice.getInitialState();

    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy()

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy()
   })
});
