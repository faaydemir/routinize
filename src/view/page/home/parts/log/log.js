import React from "react";
import ReactModal from 'react-modal';
import { cancelTaskLogging, logSubTaskProgress, logTaskProgress } from "view/page/home/actions";
import { useStatefy } from "react-statefy";
import dateLogState from "state/taskLog";
import DateLog from "model/date-log";
import "./style.scss"
import TaskCheck from "view/component/task-check";
import { PROGRESS_STATE } from "model/enums";

const Log = () => {
  /** @type {{log:DateLog,isLoggingVisible:Boolean}} */
  const { log, isLoggingVisible } = useStatefy(dateLogState)
  return (
    <ReactModal
      isOpen={isLoggingVisible}
      className="modal"
      overlayClassName="modal-overlay"
      onRequestClose={() => cancelTaskLogging()}
    >
      {log
        ? <div className="flex-column" >
          <div className="flex-row">
            <TaskCheck
              sizeClass="box-1-1"
              taskLog={log}
              onTaskChecked={() => logTaskProgress({ log })}
            />
            <div className="flex-row flex-align-center">
              <span className="header-text">task.title</span>
              <span className="info-text">{log.unit.id}</span>
            </div>
          </div>
          {log.hasSubTask()
            ? Object.entries(log.progress.subTaskProgress).map(
              ([key, value]) =>
                <div className="sub-task">
                  <input
                    className="task-item"
                    name="task"
                    type="checkbox"
                    id={`subtask-${key}`}
                    onChange={(e) => logSubTaskProgress({
                      log: log,
                      subTask: key
                    })}
                    checked={value === PROGRESS_STATE.DONE} />
                  <label htmlFor={`subtask-${key}`}>
                    <span className="checkbox-label info-text">{key}</span>
                  </label>
                </div>

            )
            : <></>
          }
        </div >
        : <span>not selected any task !!</span>
      }
    </ReactModal>);
};

export default Log;
