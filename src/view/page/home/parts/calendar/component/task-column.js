import React from "react";
import TaskCheck from "view/component/task-check";

const TaskColumn = ({ header, color, taskLogs, onTaskChecked, onHeaderClick }) => {
    return (
        <div 
            className="calendar-column"
            style={
                {
                    color: color ?? "#52C6A2",
                    backgroundColor: (color && color + "10") ?? "inherit",
                    borderColor: (color && color + "40") ?? "#52C6A240"
                }
            }
        >
            <header className="box box-3-1 task-header day-task-header">
                <a
                    href="#"
                    onClick={onHeaderClick}
                    style={
                        {
                            borderColor: color ?? "#52C6A2",
                        }
                    }
                >
                    <span>{header}</span>
                </a>
            </header>
            <div className="calendar-units flex-row">
                {taskLogs && taskLogs.map((taskLog) => (
                    <TaskCheck
                        taskLog={taskLog}
                        onTaskChecked={() => onTaskChecked && onTaskChecked(taskLog)}
                    ></TaskCheck>
                ))}
            </div>
        </div >
    );
};
export default TaskColumn