/* eslint-disable no-eval */
import DateLog from "model/date-log";
import React from "react";
import { PROGRESS_STATE } from "../../../model/enums";
import "./style.scss"

/**
 * @param  {Object} obj
 * @param  {DateLog} obj.taskLog
 * @param  {any} obj.onTaskChecked
 * @param  {String=} obj.sizeClass
 */
const TaskCheck = ({ taskLog, onTaskChecked, sizeClass = undefined }) => {
    const getSizeClass = (unit) => (unit ? `box-${unit.range}-1` : "box-1-1");

    const renderCheck = (taskState, isLocked) => {
        const lockedClass = isLocked ? ' task-locked' : ''
        switch (taskState.progressState) {
            case PROGRESS_STATE.DONE:
                return <i className={"material-icons task-check task-done" + lockedClass}>done</i>;
            case PROGRESS_STATE.PARTIAL_DONE:
                return (
                    <div className="box-partial">
                        <i className={"material-icons task-check task-done" + lockedClass}>done</i>
                        <span>{Math.round((taskState.completedStepCount / taskState.stepCount) * 100)}%</span>
                    </div >
                )
            case PROGRESS_STATE.NOT_SET:
            case PROGRESS_STATE.NOT_DONE:
            default:
                return <i className={"material-icons task-check task-not-set" + lockedClass}>remove</i>;

        }
    };
    return (
        <div className={`box  ${sizeClass ?? getSizeClass(taskLog.unit)}`}
            onClick={onTaskChecked}
        >
            {renderCheck(taskLog.progress, taskLog.isLocked)}
        </div>
    );
};


export default TaskCheck;