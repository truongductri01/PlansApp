import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { Fade, makeStyles, Modal, TextField } from "@material-ui/core";
import { db } from "../../firebase/useFirebase";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import SaveIcon from "@material-ui/icons/Save";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px",
    height: "50%",
    marginLeft: "auto",
    marginRight: "0",
  },
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
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const handleDelete = (uid, id) => {
  db.collection("tasks").doc(uid).collection("tasks").doc(id).delete();
};

// const handleEdit

// eslint-disable-next-line

function Task(props) {
  const [finished, setFinished] = useState();
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const classes = useStyles();

  // console.log("Task prop >>>", props);

  const handleEdit = (uid, id) => {
    db.collection("tasks")
      .doc(uid)
      .collection("tasks")
      .doc(id)
      .update({ name: newName });

    setOpen(false);
  };

  const handleCheck = (uid, id, isChecked) => {
    db.collection("tasks")
      .doc(uid)
      .collection("tasks")
      .doc(id)
      .update({ checked: isChecked });
  };

  useEffect(() => {
    setFinished(props.checked);
  }, [props.checked]);

  return (
    <div className={`task ${finished ? "task--checked" : ""}`} key={props.id}>
      <div
        className="task_check"
        onClick={() => {
          let stateChange = !finished;
          setFinished(stateChange);
          handleCheck(props.uid, props.id, stateChange);
        }}
      >
        {finished ? <span>✓</span> : null}
      </div>
      <p className="task_name">{props.taskName}</p>
      <div className="task_btn">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<EditIcon />}
          onClick={() => setOpen(true)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          // size="small"
          onClick={() => handleDelete(props.uid, props.id)}
        >
          Delete
        </Button>
      </div>

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
                label="New Task Name"
                onChange={(event) => {
                  setNewName(event.target.value);
                  console.log(event.target.value);
                }}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => handleEdit(props.uid, props.id)}
                disabled={newName === ""}
              >
                Save change
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Task;
