import statefy from "react-statefy";

const taskEditState = statefy({
    selectedTask: undefined,
    isTaskEditVisible: false,
    isTaskEditProcessing: false,
    taskValidationErrors: undefined,
});

export const taskEditStarted = (selectedTask) => {
    taskEditState.mutate({ selectedTask, isTaskEditVisible: true });
}
export const taskEditCanceled = () => {
    taskEditState.mutate({ selectedTask: undefined, isTaskEditVisible: false, taskValidationErrors: undefined });
}

export const taskDeleteStarted = () => {
    taskEditState.mutate({
        isTaskEditProcessing: true,
        taskValidationErrors: undefined,
    });
}

export const taskDeleteCompleted = () => {
    taskEditState.mutate({
        selectedTask: undefined,
        isTaskEditProcessing: false,
        isTaskEditVisible: false,
    });
}

export const taskSavingStarted = () => {
    taskEditState.mutate({
        isTaskEditProcessing: true,
        taskValidationErrors: undefined,
    });
}

export const taskSavingCompleted = (updatedTask) => {
    taskEditState.mutate({
        selectedTask: updatedTask,
        isTaskEditProcessing: false,
        isTaskEditVisible: false,
        taskValidationErrors: undefined
    });
}

export const taskValidationFailed = (taskValidationErrors) => {
    taskEditState.mutate({
        taskValidationErrors
    });
}

export default taskEditState;