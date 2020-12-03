import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid red",
    width: "75%",
    maxHeight: "80vh",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  task: {
    margin: "10px 10px 10px 0",
    padding: "5px",
    backgroundColor: "#e0e0e0",
    borderRadius: "0 0 10px 0",
  },
}));

export default function TasksModal(props) {
  const classes = useStyles();
  const open = props?.open;

  const tasks = props?.tasks;
  const numberOfTasks = tasks?.length;
  //   console.log("Tasks in Task Modal >>>", tasks);

  const tasksJSX = tasks?.map((task) => (
    <div className={classes.task} key={task.id}>
      <span>{task.name}</span>
    </div>
  ));

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => props.setOpen(!open)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Tasks of {props?.userName}</h2>
            <p>{`${numberOfTasks} task(s)`}</p>
            {tasksJSX}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
