import { useMemo, useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';

// Registrar el idioma español para el DatePicker
registerLocale('es', es);

// Estilos personalizados para el modal
const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Establecer el elemento raíz para el modal
Modal.setAppElement('#root');

export const CalendarModal = () => {
    const { isDateModalOpen, handleCloseDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [eventFormValues, setEventFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleInputClass = useMemo(() => {
        if (!isFormSubmitted) return '';

        return eventFormValues.title.length > 0 ? '' : 'is-invalid';
    }, [eventFormValues.title, isFormSubmitted]);

    useEffect(() => {
        if (activeEvent !== null) {
            setEventFormValues({ ...activeEvent });
        }
    }, [activeEvent]);

    const handleInputChange = ({ target }) => {
        setEventFormValues({
            ...eventFormValues,
            [target.name]: target.value,
        });
    };

    const handleDateChange = (event, changing) => {
        setEventFormValues({
            ...eventFormValues,
            [changing]: event,
        });
    };

    const handleCloseModal = () => {
        handleCloseDateModal();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsFormSubmitted(true);

        const timeDifference = differenceInSeconds(eventFormValues.end, eventFormValues.start);

        if (isNaN(timeDifference) || timeDifference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        if (eventFormValues.title.length <= 0) return;

        await startSavingEvent(eventFormValues);
        handleCloseDateModal();
        setIsFormSubmitted(false);
    };

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={handleCloseModal}
            style={customModalStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={eventFormValues.start}
                        onChange={(event) => handleDateChange(event, 'start')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        minDate={eventFormValues.start}
                        selected={eventFormValues.end}
                        onChange={(event) => handleDateChange(event, 'end')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Título y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${titleInputClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={eventFormValues.title}
                        onChange={handleInputChange}
                    />
                    <small className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={eventFormValues.notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small className="form-text text-muted">Información adicional</small>
                </div>

                <button type="submit" className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    );
};
