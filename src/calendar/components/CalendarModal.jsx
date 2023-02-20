import { addHours, differenceInSeconds } from 'date-fns';
import { useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

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
Modal.setAppElement('#root');

export const CalendarModal = () => {
  const [isOpen, setisOpen] = useState(true);
  const [formValues, setFormValues] = useState({
    title: 'Note 1',
    notes:
      'Commodo irure nostrud consequat ex veniam do occaecat occaecat commodo.',
    startDate: new Date(),
    endDate: addHours(new Date(), 2),
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const titleClass = useMemo(() => {
    if (!isFormSubmitted) {
      return '';
    }

    return formValues.title.length > 0 ? '' : 'is-invalid';
  }, [formValues.title, isFormSubmitted]);

  const onCloseModalHandler = () => {
    setisOpen((isOpen) => !isOpen);
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

  const onSubmitHandler = (event) => {
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

    console.log(formValues);
  };

  return (
    <Modal
      isOpen={isOpen}
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
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
            value={formValues.title}
            onChange={onInputChangedHandler}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
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
            Información adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
