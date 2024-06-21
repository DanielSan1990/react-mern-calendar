export const CalendarEvent = ({ event }) => {
    const { title: eventTitle, user: eventUser } = event;

    return (
        <>
            <strong>{ eventTitle }</strong>
            <span> - { eventUser.name }</span>
        </>
    );
};
