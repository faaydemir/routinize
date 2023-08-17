import _ from "lodash";
import { PROGRESS_TYPE, PROGRESS_STATE } from "./enums";

class TaskProgress {
    constructor({
        progressType = PROGRESS_TYPE.SINGLE,
        progressState = PROGRESS_STATE.NOT_SET,
        stepCount = null,
        completedStepCount = 0,
        subTasks = null,
         subTaskProgress = null
    }) {
        this.progressState = progressState;
        this.stepCount = stepCount;
        this.progressType = progressType;
        this.completedStepCount = completedStepCount;
        if ( subTaskProgress) {
            this. subTaskProgress =  subTaskProgress;
        }
        else if (!_.isEmpty(subTasks)) {
            this. subTaskProgress = subTasks.reduce((agg, cur) => ({ ...agg, [cur]: PROGRESS_STATE.NOT_DONE }), {})
        }
        if (!_.isEmpty(this. subTaskProgress)) {
            this.progressType = PROGRESS_TYPE.SUB_TASK
        }
    }

    isCompleted() {
        return this.progressState == PROGRESS_STATE.DONE;
    }

    getSubTaskState(subTask) {
        if (!this. subTaskProgress) {
            return PROGRESS_STATE.NOT_SET;
        }
        return this. subTaskProgress[subTask] || PROGRESS_STATE.NOT_SET;
    }

    isAllSubTasksCompleted() {
        Object.values(this. subTaskProgress).forEach(state => {
            if (state !== PROGRESS_STATE.DONE) {
                return false;
            }
        });
        return true;
    }

    gotoNextSubState(subTask) {
        const currentState = this.getSubTaskState(subTask);
        const nextState = (currentState == PROGRESS_STATE.DONE)
            ? PROGRESS_STATE.NOT_DONE
            : PROGRESS_STATE.DONE
        this. subTaskProgress[subTask] = nextState;

        if (this.isAllSubTasksCompleted())
            this.progressState = PROGRESS_STATE.DONE;
    }
    gotoNextState() {
        if (this.progressType === PROGRESS_TYPE.SINGLE) {
            if (this.isCompleted()) {
                this.progressState = PROGRESS_STATE.NOT_DONE;
            } else {
                this.progressState = PROGRESS_STATE.DONE;
            }
        }
        else {
            if (this.isCompleted()) {
                this.progressState = PROGRESS_STATE.NOT_DONE;
                this.completedStepCount = 0;
            } else {
                this.completedStepCount += 1;
                if (this.completedStepCount >= this.stepCount) {
                    this.progressState = PROGRESS_STATE.DONE;
                }
                else {
                    this.progressState = PROGRESS_STATE.PARTIAL_DONE;
                }
            }
        }
    }
    toDoc() {
        return {
            progressState: this.progressState,
            stepCount: this.stepCount,
            progressType: this.progressType,
            completedStepCount: this.completedStepCount,
             subTaskProgress: this. subTaskProgress ?? {},
        };
    }
    static fromDoc(doc) {
        return new TaskProgress(doc ?? {})
    }
}
export default TaskProgress