import { parseISO } from 'date-fns';

/**
 * Convierte los eventos con fechas en formato ISO a objetos Date
 * @param {Array} events - Lista de eventos a convertir
 * @returns {Array} - Lista de eventos con fechas convertidas a objetos Date
 */
export const convertEventsToDateObjects = (events = []) => {
    return events.map(event => {
        event.end = parseISO(event.end);
        event.start = parseISO(event.start);

        return event;
    });
}
