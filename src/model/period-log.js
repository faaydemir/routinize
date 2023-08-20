import { getTimeUnitsInRange } from "model/date-unit";
import Task from "model/task";
import JustDate, { TIME_PERIODS } from "utils/just-date";
import DateLog from "./date-log";

//TODO rename contains all logs of task 
export default class PeriodLog {
    /**
     * @param  {Task} task
     */
    constructor(task) {
        this.task = task;
        this.logs = [];
    }
    /**
     * @param  {Task} task
     * @param  {Object.<string, DateLog>} logs={}
     * @param  {JustDate} startDate
     * @param  {JustDate} endDate
     */
    static create(task, logs = {}, startDate, endDate) {
        const activity = new PeriodLog(task);
        // get time units for task period
        const units = getTimeUnitsInRange(task.period || TIME_PERIODS.DAY, startDate, endDate);
        units.forEach(unit => {
            const log = DateLog.create({
                taskId: task.id,
                progressType: task.progressType,
                unit,
                stepCount: task.stepCount,
                subTasks: task.subtasks
            });
            //TODO move to DateLog class 
            if (logs[unit.id]) {
                log.progress = logs[unit.id].progress
            }
            log.isLocked = !task.isActiveInDateRange(unit.start, unit.end)
            activity.logs.push(log);

        });
        return activity;
    }
}

