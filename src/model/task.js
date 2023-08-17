import { PROGRESS_TYPE, TASK_PRIORITY } from "./enums";
import JustDate, { TIME_PERIODS } from "utils/just-date";
import is, { validateSchema } from "core/validate";
import _ from "lodash";
import taskStore from "storage/task-store";

export default class Task {
    constructor({
        id,
        title,
        subtasks = [],
        description,
        period = TIME_PERIODS.DAY,
        priority = TASK_PRIORITY.normal,
        progressType = PROGRESS_TYPE.SINGLE,
        startDate,
        endDate,
        color,
        userId,
        isDeleted = false,
        isCompleted = false,
        createDate = Date.now(),
        updatedAt = Date.now(),
        stepCount = 0
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.stepCount = stepCount;
        this.subtasks = subtasks;
        this.progressType = progressType;
        this.period = period;
        this.color = color;
        this.startDate = startDate ?? createDate;
        this.endDate = endDate;
        this.userId = userId;
        this.createDate = createDate;
        this.updateDate = updatedAt;
        this.isCompleted = isCompleted;
        this.isDeleted = isDeleted;
    }

    /** 
     * @param  {JustDate} rangeStart
     * @param  {JustDate} rangeEnd
     */
    isActiveInDateRange(rangeStart, rangeEnd) {
        const rangeStartTime = rangeStart.date().getTime();
        const rangeEndTime = rangeEnd.date().getTime();
        const isStartMatch = !Boolean(this.startDate) || (this.startDate <= rangeEndTime)
        const isEndMatch = !Boolean(this.endDate) || (this.endDate >= rangeStartTime)
        return isStartMatch && isEndMatch
    }

    hasSubTask() {
        return this.subtasks && this.subtasks.length > 0
    }
    async updateFromForm(formInput) {
        const errors = Task.validate(formInput);
        if (_.isEmpty(errors)) {
            this.title = formInput.title;
            this.description = formInput.description;
            this.priority = formInput.priority;
            this.stepCount = formInput.stepCount;
            this.subtasks = formInput.subtasks;
            this.progressType = formInput.progressType;
            this.period = formInput.period;
            this.color = formInput.color;
            this.startDate = formInput.startDate;
            this.endDate = formInput.endDate;
            this.updateDate = Date.now();
            await this.save()
        }
        return { task: this, errors };
    }
    async save() {
        if (this.id) {
            await taskStore.update(this);
        }
        else {
            await taskStore.add(this);
        }
    }

    async delete() {
        this.isDeleted = true;
        this.updateDate = Date.now();
        await taskStore.updateProps(
            this.id,
            {
                isDeleted: this.isDeleted,
                updateDate: this.updateDate,
            }
        )
    }
    async complete() {
        this.isCompleted = true;
        this.updateDate = Date.now();
        this.endDate = Date.now();
        await taskStore.updateProps(
            this.id,
            {
                isCompleted: this.isCompleted,
                updateDate: this.updateDate,
                endDate: this.endDate,
            }
        )
    }

    toDoc() {
        return JSON.parse(JSON.stringify(this));
    }

    static fromDoc(doc) {
        return new Task(doc);
    }

    static orderTaskByPeriod(tasks) {
        const getTaskPriority = (task) => {
            let factor = 1
            if (task.isCompleted) {
                factor = factor * 10
            }
            switch (task.period) {
                case TIME_PERIODS.DAY: return 1 * factor;
                case TIME_PERIODS.WEEK: return 2 * factor;
                case TIME_PERIODS.MONTH: return 3 * factor;
                case TIME_PERIODS.QUARTER: return 4 * factor;
                case TIME_PERIODS.YEAR: return 5 * factor;
                default: return 1;
            }
        };
        return tasks.sort((l, r) => (getTaskPriority(l) - getTaskPriority(r)));
    }
    static validate(formInput) {
        const taskValidationSchema = {
            title: is().string().min(1).max(100).required(),
            description: is().string().max(100),
            period: is().string().valid(...Object.values(TIME_PERIODS)).required(),
            priority: is().string().valid(...Object.values(TASK_PRIORITY)).required(),
            progressType: is().string().valid(...Object.values(PROGRESS_TYPE)).required(),
        };
        return validateSchema(taskValidationSchema, formInput);
    }

    //create firestore entity from inputs
    static async createFromForm(formInput) {
        const errors = this.validate(formInput);
        let task;
        if (_.isEmpty(errors)) {
            task = new Task(formInput);
            await task.save();
        }
        return { task, errors };
    }
}
