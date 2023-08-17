import statefy from "core/statefy";

const dateLogState = statefy({
    log: undefined,
    isLoggingVisible: false,
});

export const detailedTaskLogOpened = (log) => {
    dateLogState.mutate({ log, isLoggingVisible: true });
}
export const logProgressed = (log) => {
    dateLogState.mutate({ log });
}
export const taskLoggingCanceled = () => {
    dateLogState.mutate({
        log: undefined,
        isLoggingVisible: false
    });
}

export default dateLogState;