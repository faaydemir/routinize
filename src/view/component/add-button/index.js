import React from "react";
import "./style.scss"
// TODO move unde home
const AddButton = ({ ...props }) => {

    return (
        <button {...props}
            className={"button primary add-new-task"}>
            <i className="material-icons">add</i><span className="add-task-button-text">Add Task</span>
        </button>
    )
}

export default AddButton