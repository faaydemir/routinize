import _ from "lodash";
import { getTimeUnitsInRange } from "model/date-unit";
import logStore from "storage/log-store";
import taskStore from "storage/task-store";
import JustDate, { TIME_PERIODS } from "utils/just-date";
import PeriodLog from "./period-log";
import Task from "./task";

export default class Calendar {
    constructor() {
        this.unitType = TIME_PERIODS.DAY;
        this.days = [];
        this.activities = [];
    }
    static create(startDate, endDate, tasks, logs) {

        const mapLogsToTask = (logs) => {

            if (!logs && logs.length === 0) {
                return {};
            }
            const logMap = {};
            logs.forEach(item => {
                if (item.taskId && item?.unit.id) {
                    if (!(item.taskId in logMap)) {
                        logMap[item.taskId] = {};
                    }
                    logMap[item.taskId][item.unit.id] = item;
                }
            });
            return logMap;
        };

        const calendar = new Calendar();
        calendar.days = getTimeUnitsInRange(TIME_PERIODS.DAY, startDate, endDate);
        if (tasks && logs) {
            tasks = Task.orderTaskByPeriod(tasks);
            const mappedLogs = mapLogsToTask(logs);
            tasks.forEach((task) => {
                const activity = PeriodLog.create(
                    task,
                    mappedLogs[task.id],
                    startDate,
                    endDate
                );
                calendar.activities.push(activity);
            });
        }
        return calendar;
    }

    /**
     * @param {JustDate} startDate 
     * @param {JustDate} endDate 
     * @returns {Calendar}
     */
    static empty(startDate, endDate) {
        const calendar = new Calendar();
        calendar.days = getTimeUnitsInRange(TIME_PERIODS.DAY, startDate, endDate);
        return calendar;
    }

    /**
     * @param {JustDate} startDate 
     * @param {JustDate} endDate 
     * @returns {Promise<Calendar>}
     */
    static async getCalendar(startDate, endDate) {


        const [tasks, taskLogs] = await Promise.all(
            [
                taskStore.getActiveTasks(),
                logStore.getLogsInRange(startDate.date(), endDate.date())
            ]
        )

        if (_.isEmpty(tasks) && _.isEmpty(taskLogs)) {
            return Calendar.empty(startDate, endDate)
        }

        const activeTaskIds = tasks.map(l => l.id);
        const loggedTaskIds = _.uniq(taskLogs.map(l => l.taskId)).filter(id => !activeTaskIds.includes(id));

        const loggedTasks = await taskStore.getTasksById(loggedTaskIds);

        return Calendar.create(
            startDate,
            endDate,
            [...tasks, ...loggedTasks],
            taskLogs
        );
    }
}

