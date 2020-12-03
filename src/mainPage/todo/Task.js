import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { db } from "../../firebase/useFirebase";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px",
  },
}));

const handleDelete = (uid, id) => {
  db.collection("tasks").doc(uid).collection("tasks").doc(id).delete();
};

// eslint-disable-next-line
const handleEdit = (uid, id) => {};

function Task(props) {
  const classes = useStyles();
  return (
    <div className="task" key={props.id}>
      <p>{props.taskName}</p>
      <div className="task_btn">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<EditIcon />}
          // size="small"
          style={{ height: "50%", marginLeft: "auto", marginRight: "0" }}
          onClick={() => handleEdit(props.uid, props.id)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          // size="small"
          style={{ height: "50%", marginLeft: "auto", marginRight: "0" }}
          onClick={() => handleDelete(props.uid, props.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Task;
