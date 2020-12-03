import { Button } from "@material-ui/core";
import React from "react";
import { db } from "../../firebase/useFirebase";

function CheckTasks(props) {
  console.log("Tasks >>>", props.tasks);
  const tasks = props?.tasks;
  const handleClick = () => {
    const uid = props.uid;
    tasks.forEach((task) => {
      db.collection("tasks").doc(uid).collection("tasks").doc(task.id).delete();
    });
  };
  return (
    <div className="checkTasks">
      <Button color="secondary" onClick={handleClick}>
        Not Finish
      </Button>
      <Button color="primary" onClick={handleClick}>
        Complete
      </Button>
    </div>
  );
}

export default CheckTasks;
