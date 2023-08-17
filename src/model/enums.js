//TODO move enums to related model
const PROGRESS_STATE = {
    NOT_SET: 'notSet',
    DONE: 'done',
    PARTIAL_DONE: 'partialDone',
    NOT_DONE: 'notDone'
};
const PROGRESS_TYPE = {
    SINGLE: 'single',
    STEPPED: 'stepped',
    SUB_TASK: 'subTask'
};
const TASK_PRIORITY = {
    low: 'low',
    normal: 'normal',
    high: 'high',
    highest: 'highest'
};

export {
    PROGRESS_STATE,
    PROGRESS_TYPE,
    TASK_PRIORITY,
}