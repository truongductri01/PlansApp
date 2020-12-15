import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TasksModal from "./TasksModal";
import retrieveData from "../todo/retrieveData";
import RetrieveProgress from "../todo/retrieveProgress";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderBottom: "1px solid black",
    boxShadow: "3px 2px lightgrey",
    borderRadius: "0 0 10px 0",
  },
}));

function User(props) {
  const classes = useStyles();
  const uid = props?.uid;
  const userName = props?.userName;
  const [open, setOpen] = useState(false);
  const progressRetrieved = RetrieveProgress(props?.uid);
  const [progress, setProgress] = useState(progressRetrieved);

  // console.log("Progress of", userName, ">>>", progress);

  useEffect(() => {
    setProgress(progressRetrieved);
  }, [progressRetrieved]);
  const { tasks } = retrieveData(uid);

  return (
    <div className={classes.root}>
      <div
        className={classes.root}
        onClick={() => {
          // console.log("Tasks of the user >>>", tasks);
          setOpen(!open);
        }}
      >
        <p>{userName}</p>
      </div>
      {open && (
        <TasksModal
          setOpen={setOpen}
          open={open}
          tasks={tasks}
          userName={userName}
          progress={progress}
        />
      )}
    </div>
  );
}

export default User;
