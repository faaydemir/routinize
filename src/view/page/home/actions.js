
import _ from "lodash";
import Calendar from "model/calendar";
import DateLog from "model/date-log";
import Task from "model/task";
import calendarState, { calendarLoaded, calendarModified, calendarPeriodChanged, loadingCalendar } from "state/calendar";
import { taskDeleteCompleted as taskProcessingCompleted, taskDeleteStarted as taskProcessingStarted, taskEditCanceled, taskEditStarted, taskSavingCompleted, taskSavingStarted, taskValidationFailed } from "state/taskEdit";
import { detailedTaskLogOpened, logProgressed, taskLoggingCanceled } from "state/taskLog";
import JustDate, { TIME_PERIODS } from "utils/just-date";

const _loadCalendar = async ({ startOfCalendar = undefined, calendarPeriod }) => {

    if (!calendarPeriod) {   
        calendarPeriod = localStorage.getItem("calendarPeriod") ?? TIME_PERIODS.WEEK;
        calendarPeriodChanged(calendarPeriod);
    }

    loadingCalendar();
    startOfCalendar = startOfCalendar ?? JustDate.Now()
    const end = startOfCalendar.endOf(calendarPeriod);
    const start = startOfCalendar.startOf(calendarPeriod);
    const calendar = await Calendar.getCalendar(start, end);
    calendarLoaded({
        calendar,
        startOfCalendar,
        calendarPeriod
    });
}

export const changeCalendarPeriod = async ({ startOfCalendar, calendarPeriod }) => {
    localStorage.setItem("calendarPeriod", calendarPeriod);
    calendarPeriodChanged(calendarPeriod);
    await _loadCalendar({ startOfCalendar, calendarPeriod });
}

export const loadCurrentCalendar = async ({ startOfCalendar = undefined, calendarPeriod }) => {
    await _loadCalendar({ startOfCalendar, calendarPeriod })
}
export const loadPreviousCalendar = async ({ startOfCalendar, calendarPeriod }) => {
    const endOfPreviousPeriod = startOfCalendar.startOf(calendarPeriod).previous();
    const startOfPreviousPeriod = endOfPreviousPeriod.startOf(calendarPeriod);

    await _loadCalendar({ startOfCalendar: startOfPreviousPeriod, calendarPeriod });
}
export const loadNextCalendar = async ({ startOfCalendar, calendarPeriod }) => {
    const startOfNextPeriod = startOfCalendar.endOf(calendarPeriod).next();
    await _loadCalendar({ startOfCalendar: startOfNextPeriod, calendarPeriod });
}

export const cancelTaskEditing = () => {
    taskEditCanceled()
}

export const editTask = (selectedTask) => {
    taskEditStarted(selectedTask)
}

/**
 * @param  {{task:Task}} obj
 */
export const deleteTask = async ({ task }) => {
    taskProcessingStarted();
    await task.delete();
    const { startOfCalendar, calendarPeriod } = calendarState.state();
    await _loadCalendar({ startOfCalendar, calendarPeriod });
    taskProcessingCompleted();
}

/**
 * @param  {{task:Task}} obj
 */
export const endTask = async ({ task }) => {
    taskProcessingStarted();
    await task.complete();
    const { startOfCalendar, calendarPeriod } = calendarState.state();
    await _loadCalendar({ startOfCalendar, calendarPeriod });
    taskProcessingCompleted();
}

/**
 * @param  {{selectedTask:Task,inputs:Object}} obj
 */
export const saveTask = async ({ inputs, selectedTask }) => {

    const isNewTask = !Boolean(selectedTask);

    taskSavingStarted();

    const { task, errors } = (isNewTask)
        ? await Task.createFromForm(inputs)
        : await selectedTask.updateFromForm(inputs)

    if (!_.isEmpty(errors)) {
        taskValidationFailed(errors)
    } else {
        taskSavingCompleted(task);
    }

    const { startOfCalendar, calendarPeriod } = calendarState.state();
    _loadCalendar({ startOfCalendar, calendarPeriod });
}

export const cancelTaskLogging = () => {
    taskLoggingCanceled()
}

/**
 * @param  {{log:DateLog}} obj
 */
export const logTaskProgress = async ({ log }) => {
    if (log.isLocked) return
    if (log.hasSubTask()) {
        detailedTaskLogOpened(log);
    }
    else {
        log.progressNext();
        _saveLog(log)
    }
}
/**
 * @param  {{log:DateLog,subTask:string}} obj
 */
export const logSubTaskProgress = async ({ log, subTask }) => {
    await log.progressSubTaskNext(subTask);
    await _saveLog(log);
}


async function _saveLog(log) {
    logProgressed(log);
    const { calendar } = calendarState.state();
    calendarModified(calendar);
    try {
        await log.save();
    } catch (err) {
        const { startOfCalendar, calendarPeriod } = calendarState.state();
        _loadCalendar({ startOfCalendar, calendarPeriod });
        throw err;
    }
}