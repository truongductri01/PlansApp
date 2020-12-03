import React from "react";

import "./Todo.css";

import AddTask from "./AddTask";
import Task from "./Task";
import useFirestore from "./retrieveData";
import CheckTasks from "./CheckTasks";
/*
-----------------------------
Goal - Add and delete tasks
User stories:
1. User can input a task - Done
2. User can edit the task - not yet
3. User can delete the task - done
4. User can delete the whole task table
5. User can mark a task as finished.

Components:
1. Submit button - done
2. Edit button
3. Finish symbol - not yet
4. Delete button - done
5. Delete the whole table option

Tools:
1. Firebase - store the task based on the user id
-----------------------------
*/

function Todo(props) {
  const uid = props?.uid;
  const { tasks } = useFirestore(uid);
  // console.log("Tasks >>>", tasks);

  const tasksJSX = tasks.map((element) => (
    <Task taskName={element.name} id={element.id} uid={uid} />
  ));

  return (
    <div className="todo">
      <div className="todo_header">
        <AddTask uid={uid} />
        <CheckTasks uid={uid} tasks={tasks} />
      </div>

      <div className="container">{tasksJSX}</div>
    </div>
  );
}

export default Todo;
