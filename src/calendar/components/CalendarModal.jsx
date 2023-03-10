import { differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { useUIStore } from '../../hooks/useUIStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { getEnvVariables } from '../../helpers/getEnvVariables';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
if (getEnvVariables().VITE_MODE !== 'test') {
  Modal.setAppElement('#root');
}

export const CalendarModal = () => {
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const { isDateModalOpen, closeDateModal } = useUIStore();
  const [formValues, setFormValues] = useState(null);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // todo: edited
  const titleClass = useMemo(() => {
    if (!isFormSubmitted) {
      return '';
    }

    return formValues?.title.length > 0 ? '' : 'is-invalid';
  }, [formValues?.title, isFormSubmitted]);

  useEffect(() => {
    if (activeEvent) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onCloseModalHandler = () => {
    // setisOpen((isOpen) => !isOpen);
    closeDateModal();
  };

  const onInputChangedHandler = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChangedHandler = (event, inputDateType) => {
    setFormValues({
      ...formValues,
      [inputDateType]: event,
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    const difference = differenceInSeconds(
      formValues.endDate,
      formValues.startDate
    );

    if (isNaN(difference) || difference <= 1) {
      console.log('Error in the dates fields');
      Swal.fire('Error in the form', 'Check the date fields', 'error');
      return;
    }

    if (formValues.title.length <= 0) {
      return;
    }

    await startSavingEvent({ ...formValues });
    closeDateModal();
    setIsFormSubmitted(false);
  };

  return (
    <>
      {formValues && (
        <Modal
          isOpen={isDateModalOpen}
          onRequestClose={onCloseModalHandler}
          style={customStyles}
          className='modal'
          overlayClassName='modal-fondo'
          closeTimeoutMS={200}
        >
          <h1> Nuevo evento </h1>
          <hr />
          <form className='container' onSubmit={onSubmitHandler}>
            <div className='form-group mb-2'>
              <label>Fecha y hora inicio</label>
              <DatePicker
                selected={formValues.startDate}
                className='form-control'
                dateFormat='Pp'
                onChange={(event) => {
                  onDateChangedHandler(event, 'startDate');
                }}
                showTimeSelect
              />
            </div>

            <div className='form-group mb-2'>
              <label>Fecha y hora fin</label>
              <DatePicker
                minDate={formValues.startDate}
                selected={formValues.endDate}
                className='form-control'
                dateFormat='Pp'
                onChange={(event) => {
                  onDateChangedHandler(event, 'endDate');
                }}
                showTimeSelect
              />
            </div>

            <hr />
            <div className='form-group mb-2'>
              <label>Titulo y notas</label>
              <input
                type='text'
                className={`form-control ${titleClass}`}
                placeholder='T??tulo del evento'
                name='title'
                autoComplete='off'
                value={formValues.title}
                onChange={onInputChangedHandler}
              />
              <small id='emailHelp' className='form-text text-muted'>
                Una descripci??n corta
              </small>
            </div>

            <div className='form-group mb-2'>
              <textarea
                type='text'
                className='form-control'
                placeholder='Notas'
                rows='5'
                name='notes'
                value={formValues.notes}
                onChange={onInputChangedHandler}
              ></textarea>
              <small id='emailHelp' className='form-text text-muted'>
                Informaci??n adicional
              </small>
            </div>

            <button type='submit' className='btn btn-outline-primary btn-block'>
              <i className='far fa-save'></i>
              <span> Guardar</span>
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};
