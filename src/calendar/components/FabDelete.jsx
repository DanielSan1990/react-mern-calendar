import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    // Maneja el clic en el botón para eliminar un evento
    const handleDeleteEvent = () => {
        startDeletingEvent();
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDeleteEvent}
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    );
}
