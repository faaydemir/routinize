import statefy from "core/statefy";

const calendarState = statefy({
    calendar: undefined,
    calendarPeriod: undefined,
    startOfCalendar: undefined,
    isCalendarLoading: false,
});

export const loadingCalendar = () => {
    calendarState.mutate({ isCalendarLoading: true });
}
export const calendarPeriodChanged = (calendarPeriod) => {
    calendarState.mutate({ calendarPeriod });
}
export const calendarLoaded = ({ calendar, startOfCalendar, calendarPeriod }) => {
    calendarState.mutate({
        isCalendarLoading: false,
        calendar,
        startOfCalendar,
        calendarPeriod
    });
}
export const calendarModified = (calendar) => {
    calendarState.mutate({
        calendar
    });
}

export default calendarState;