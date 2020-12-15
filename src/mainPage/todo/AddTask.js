import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";

// eslint-disable-next-line
import { db } from "../../firebase/useFirebase";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function AddTask(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [taskName, setTaskName] = useState("");

  const handleChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleSubmit = () => {
    const task = {
      name: taskName,
      checked: false,
    };

    const uid = props.uid;
    const dbRef = db.collection("tasks").doc(uid).collection("tasks");

    dbRef.add(task);

    setTaskName("");
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => setOpen(true)}
      >
        New Task
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                label="Task Name"
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
                disabled={taskName === ""}
              >
                New Task
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
