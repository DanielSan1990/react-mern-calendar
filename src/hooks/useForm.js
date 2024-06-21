import { useEffect, useMemo, useState } from 'react';

/**
 * Hook personalizado para manejar formularios con validación
 * @param {Object} initialForm - Estado inicial del formulario
 * @param {Object} formValidations - Validaciones del formulario
 * @returns {Object} - Estado y métodos del formulario
 */
export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    // Crear validadores cuando cambia el estado del formulario
    useEffect(() => {
        createValidators();
    }, [formState]);

    // Actualizar el estado del formulario cuando cambian los valores iniciales
    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);
    
    // Validar si el formulario es válido
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation]);

    // Manejar cambios en los campos del formulario
    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    // Resetear el formulario a su estado inicial
    const handleResetForm = () => {
        setFormState(initialForm);
    }

    // Crear validadores para los campos del formulario
    const createValidators = () => {
        const checkedValues = {};
        for (const field of Object.keys(formValidations)) {
            const [validationFn, errorMessage] = formValidations[field];
            checkedValues[`${field}Valid`] = validationFn(formState[field]) ? null : errorMessage;
        }
        setFormValidation(checkedValues);
    }

    return {
        ...formState,
        formState,
        handleInputChange,
        handleResetForm,
        ...formValidation,
        isFormValid
    };
}
