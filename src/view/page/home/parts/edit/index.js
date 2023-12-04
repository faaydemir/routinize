import React, { useEffect, useState } from "react";
import ReactModal from 'react-modal';
import { CirclePicker } from 'react-color';
import _ from "lodash";
import { PROGRESS_TYPE, TASK_PRIORITY } from "model/enums";
import InputError from "view/component/error-message";
import { TIME_PERIODS } from "utils/just-date";
import { useStatefy } from "react-statefy";
import taskEditState from "state/taskEdit";
import { cancelTaskEditing, deleteTask, endTask, saveTask } from "view/page/home/actions";
import "./style.scss";
import IncrementalInputList from "view/page/home/parts/edit/component/incremental-input-list";

const defaultTaskDraft = {
  color: undefined,
  subtasks: [],
  period: TIME_PERIODS.DAY,
  priority: TASK_PRIORITY.normal,
  progressType: PROGRESS_TYPE.SINGLE,
  stepCount: 0
}
const EditTask = () => {


  const { selectedTask, isTaskEditVisible, taskValidationErrors } = useStatefy(taskEditState)

  const [inputs, setTaskDraft] = useState(defaultTaskDraft);

  const [isEdit, setIsEdit] = useState(false);

  const setField = (field, value) => {
    setTaskDraft({ ...inputs, [field]: value });
  };

  const setProgressType = (value) => {
    let stepCount = 0;
    let progressType = PROGRESS_TYPE.SINGLE;
    switch (value) {
      case "single":
        stepCount = 1;
        progressType = PROGRESS_TYPE.SINGLE;
        break;
      case "stepped-2":
        stepCount = 2;
        progressType = PROGRESS_TYPE.STEPPED;
        break;
      case "stepped-5":
        stepCount = 5;
        progressType = PROGRESS_TYPE.STEPPED;
        break;
      case "stepped-10":
        stepCount = 10;
        progressType = PROGRESS_TYPE.STEPPED;
        break;
      default:
        stepCount = 1;
        progressType = PROGRESS_TYPE.SINGLE;
        break;
    }
    setTaskDraft({ ...inputs, progressType, stepCount });
  };

  const getProgressType = (value, stepCount) => {
    switch (value) {
      case PROGRESS_TYPE.SINGLE:
        return "single";
      case PROGRESS_TYPE.STEPPED:
        return "stepped-" + stepCount;
      default:
        return "single";
    }
  };

  useEffect(() => {
    if (isTaskEditVisible === false) {
      setTaskDraft({});
      return;
    }

    if (!_.isEmpty(selectedTask)) {
      setTaskDraft({ ...selectedTask });
      setIsEdit(true);
    } else {
      setTaskDraft(defaultTaskDraft)
      setIsEdit(false);
    }
  }, [selectedTask, isTaskEditVisible]);

  return (
    <ReactModal
      isOpen={isTaskEditVisible}
      className="add-task-modal modal"
      overlayClassName="modal-overlay"
      onRequestClose={() => cancelTaskEditing()}
    >
      <div className="flex-column">
        <label className="form-field-label">task name</label>
        <InputError errors={taskValidationErrors?.title} />
        <input
          className="task-input"
          type="text"
          value={inputs.title}
          onChange={(event) => setField("title", event.target.value)}
          placeholder="task"
        ></input>
        <IncrementalInputList
          values={inputs.subtasks}
          onChangeValues={(value) => setField("subtasks", value)}
        />

        <label className="form-field-label">description</label>
        <InputError errors={taskValidationErrors?.description} />
        <textarea
          value={inputs.description}
          onChange={(event) => setField("description", event.target.value)}
          placeholder="description"
        >
        </textarea>


        <label className="form-field-label">repetition period</label>
        <div>
          <select
            name="period" id="period"
            value={inputs.period}
            onChange={(event) => setField("period", event.target.value)}
          >
            <option value="day">day</option>
            <option value="week">week</option>
            <option value="month">month</option>
            <option value="year">year</option>
            <option value="quarter">quarter</option>
          </select>
          <InputError errors={taskValidationErrors?.period}></InputError>
        </div>
        <label className="form-field-label">color</label>
        <CirclePicker color={inputs.color} width="100%" onChange={({ hex }) => setField("color", hex)}></CirclePicker>
        <label className="form-field-label">priority</label>
        <div>
          <select
            name="priority" id="priority"
            value={inputs.priority}
            onChange={(event) => setField("priority", event.target.value)}
          >
            <option value="low">low</option>
            <option value="normal">normal</option>
            <option value="high">high</option>
            <option value="highest">highest</option>
          </select>
          <InputError errors={taskValidationErrors?.priority}></InputError>
        </div>
        <div>
          {/** TODO make date input with place holder component */}
          {/* <label className="form-field-label">from date</label>
          <input type="date"
            value={taskDraft.fromDate}
            onChange={(event) => setField("fromDate", event.target.value)}>
          </input>
          <label className="form-field-label">to date</label>
          <input type="date"
            value={taskDraft.toDate}
            onChange={(event) => setField("toDate", event.target.value)}>
          </input> */}
          {/*
          add picker day,week month year quarter 
          https://reactdatepicker.com/#example-year-picker
         */}
        </div>
        {(inputs.subtasks && inputs.subtasks.length > 0) ? null :
          <div>
            <label className="form-field-label">task progress</label>
            <select
              name="type"
              id="type"
              value={getProgressType(inputs.progressType, inputs.stepCount)}
              onChange={(event) => setProgressType(event.target.value)}
            >
              <option value="single">single step</option>
              <option value="stepped-2">2</option>
              <option value="stepped-3">3</option>
              <option value="stepped-4">4</option>
              <option value="stepped-5">5</option>
              <option value="stepped-6">6</option>
              <option value="stepped-7">7</option>
              <option value="stepped-8">8</option>
              <option value="stepped-9">9</option>
              <option value="stepped-10">10</option>
            </select>
          </div>
        }
        <div className="button-container">
          {isEdit ?
            <div>
              <button
                className="button danger"
                onClick={async () => await deleteTask({ task: selectedTask, })}
              >
                delete task
              </button>
              <button
                className="button info"
                onClick={async () => await endTask({ task: selectedTask, })}
              >
                finalize task
              </button>
            </div>
            :
            <div></div>
          }
          <div>
            <button
              className="button info"
              onClick={() => cancelTaskEditing()}
            >
              cancel
            </button>
            <button
              className="button primary save-button"
              onClick={() => saveTask({ inputs, selectedTask })}
            >
              save
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default EditTask;
