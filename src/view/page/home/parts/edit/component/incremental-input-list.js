import React, { useState } from "react";
const IncrementalInputList = ({ values, onChangeValues }) => {

    const [newSubTask, setNewSubTask] = useState("")

    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    }

    const updateField = (index, value) => {
        const newValues = values;
        newValues.splice(index, 1, value);
        onChangeValues([...newValues.filter(unique)]);
    }

    const deleteField = (index) => {
        const newValues = values;
        newValues.splice(index, 1);
        onChangeValues([...newValues.filter(unique)]);
    }

    const addNewSubTask = () => {
        if (newSubTask) {
            let newValues = values || [];
            newValues = [...newValues, newSubTask];
            onChangeValues([...newValues.filter(unique)]);
            setNewSubTask("");
        }
    }

    return (
        <>
            {values && values.map((v, i) =>
                <div className="input-with-icon-container">
                    <input className="sub-task-edit"
                        type="text"
                        value={v}
                        onChange={(event) => updateField(i, event.target.value)}

                    ></input>
                    <a href="#" onClick={() => deleteField(i)}>
                        <i className="material-icons icon icon-delete">delete</i>
                    </a>
                </div>
            )}
            <div className="input-with-icon-container">
                <input className="sub-task-edit"
                    type="text"
                    value={newSubTask}
                    placeholder="Add sub task"
                    onChange={(event) => setNewSubTask(event.target.value)}
                ></input>
                <a href="#" onClick={addNewSubTask}>
                    <i className="material-icons icon icon-add">add</i>
                </a>
            </div>
        </>
    )
};

export default IncrementalInputList;