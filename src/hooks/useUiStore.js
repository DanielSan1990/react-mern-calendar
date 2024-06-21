import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';

/**
 * Hook personalizado para manejar el estado de la UI relacionado con el modal de fechas
 * @returns {Object} - Estado y métodos del store de la UI
 */
export const useUiStore = () => {
    const dispatch = useDispatch();
    const { isDateModalOpen } = useSelector(state => state.ui);

    /**
     * Abrir el modal de fecha
     */
    const handleOpenDateModal = () => {
        dispatch(onOpenDateModal());
    }

    /**
     * Cerrar el modal de fecha
     */
    const handleCloseDateModal = () => {
        dispatch(onCloseDateModal());
    }

    /**
     * Alternar el estado del modal de fecha
     */
    const handleToggleDateModal = () => {
        isDateModalOpen ? handleCloseDateModal() : handleOpenDateModal();
    }

    return {
        //* Propiedades
        isDateModalOpen,

        //* Métodos
        handleCloseDateModal,
        handleOpenDateModal,
        handleToggleDateModal,
    };
}
