import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TasksModal from "./TasksModal";
import retrieveData from "../todo/retrieveData";

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

  // console.log("User id in User >>>", uid);

  const { tasks } = retrieveData(uid);
  // console.log("Tasks >>>", tasks);

  // if (uid && userName) {
  //   console.log("User in User >>>", uid, ">>>", userName);
  // }
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
        />
      )}
    </div>
  );
}

export default User;
