import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  // to do list state
  const [toDo, setToDo] = useState([
    { id: 1, title: "Task 1", status: false },
    // { id: 2, title: "Task 2", status: false },
  ]);
  //temp state
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  // add task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };
  //delete task
  const deleteTask = (id) => {
    let newTask = toDo.filter((task) => task.id !== id);
    setToDo(newTask);
  };

  // change task
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  // task completed
  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };
  //cancel update
  const cancelUpdate = () => {
    setUpdateData("");
  };
  //update task
  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updateObject = [...filterRecords, updateData];
    setToDo(updateObject);
    setUpdateData("");
  };

  return (
    <div className="container-app">
      <br></br>
      <h1>Just do it.</h1>
      <br></br>

      {/* update task */}
      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className="from-control-up"
              />
            </div>
            <div className="col-auto">
              <button onClick={updateTask} className="btn btn-lg btn-succes">
                Update
              </button>
              <button onClick={cancelUpdate} className="btn btn-lg btn-warning">
                cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          {/* add task */}

          <div className="row">
            <div className="col addTask">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="from-control-lg"
              />
            </div>
            <div className="col-auto">
              <button onClick={addTask} className="btn btn-lg btn-succes">
                Add Task
              </button>
            </div>
          </div>
        </>
      )}

      {/* display */}
      {toDo && toDo.length ? "" : "No task.."}
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskbg">
                  <div className={task.status ? "done" : ""}>
                    <span className="tasknumber">{index + 1}</span>
                    <span className="tasktext">{task.title}</span>
                  </div>
                  <div className="Icon">
                    <span title="completed" onClick={(e) => markDone(task.id)}>
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>

                    {task.status ? null : (
                      <span
                        title="edit"
                        onClick={() =>
                          setUpdateData({
                            id: task.id,
                            title: task.title,
                            status: task.status ? true : false,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}

                    <span title="delete" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
}

export default App;
