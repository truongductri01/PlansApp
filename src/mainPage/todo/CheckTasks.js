import { Button } from "@material-ui/core";
import React from "react";
import { db } from "../../firebase/useFirebase";
import RetrieveProgress from "./retrieveProgress";

function CheckTasks(props) {
  // console.log("Tasks >>>", props.tasks);
  const tasks = props?.tasks;
  const uid = props?.uid;
  const progressRetrieved = RetrieveProgress(uid);

  console.log("Progress >>", progressRetrieved);

  const handleDelete = () => {
    tasks.forEach((task) => {
      db.collection("tasks").doc(uid).collection("tasks").doc(task.id).delete();
    });
  };

  const handleNotFinish = async () => {
    const notCompleted = progressRetrieved.notCompleted;
    db.collection("tasks")
      .doc(uid)
      .update({
        notCompleted: notCompleted + 1,
      });
    console.log("Not finished");
  };

  const handleComplete = async () => {
    tasks.forEach((task) => {
      db.collection("tasks")
        .doc(uid)
        .collection("tasks")
        .doc(task.id)
        .update({ checked: true });
    });

    const completed = progressRetrieved.completed;
    db.collection("tasks")
      .doc(uid)
      .update({
        completed: completed + 1,
      });
  };
  return (
    <div className="checkTasks">
      <form action="submit">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleNotFinish}
          disabled={progressRetrieved.length === 0}
          type="submit"
          style={{ marginRight: "10px" }}
        >
          Not Finish
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleComplete}
          disabled={progressRetrieved.length === 0}
          type="submit"
        >
          Complete All
        </Button>
      </form>

      <Button
        color="secondary"
        variant="contained"
        onClick={handleDelete}
        style={{
          marginLeft: "20px",
          marginRight: "10px",
        }}
      >
        Delete All
      </Button>
    </div>
  );
}

export default CheckTasks;
