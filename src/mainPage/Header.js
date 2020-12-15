import Button from "@material-ui/core/Button";
import { Fade, makeStyles, Modal, TextField } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import SaveIcon from "@material-ui/icons/Save";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase/useFirebase";
import RetrieveProgress from "./todo/retrieveProgress";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px",
    height: "50%",
    marginTop: "20px",
    marginLeft: "auto",
    marginRight: "0",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
  },
}));

function Header(props) {
  const progressRetrieved = RetrieveProgress(props.uid);
  const [progress, setProgress] = useState(progressRetrieved);
  const [show, setShow] = useState();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [completed, setCompleted] = useState(-1);
  const [notCompleted, setNotCompleted] = useState(-1);
  const [startingAmount, setStartingAmount] = useState(-1);
  const [increment, setIncrement] = useState(-1);
  const [
    notCompletedBeforeIncrement,
    setNotCompletedBeforeIncrement,
  ] = useState(-1);

  useEffect(() => {
    setProgress(progressRetrieved);
    setShow(progressRetrieved?.showMoney);
  }, [progressRetrieved]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateInfo = {
      completed: completed,
      notCompleted: notCompleted,
      startingAmount: startingAmount,
      increment: increment,
      notCompletedBeforeIncrement: notCompletedBeforeIncrement,
      showMoney: true,
    };

    db.collection("tasks").doc(props.uid).update(updateInfo);
    setProgress(updateInfo);
    setOpen(false);
  };

  const handleShow = (status) => {
    db.collection("tasks").doc(props.uid).update({
      showMoney: status,
    });
    setShow(status);
  };

  const calculateMoney = (nC, sA, iC, nCiC) => {
    /*
      nC: notCompleted
      sA: starting Amount
      ic: increment
      nCic */
    if (nC === 0) {
      return 0;
    } else {
      let money = 0;
      const remainder = nC % nCiC;
      const quotient = (nC - remainder) / nCiC;
      for (let i = 0; i <= quotient; i++) {
        if (i === quotient) {
          money = money + (sA + i * iC) * remainder;
        } else {
          money += (sA + i * iC) * nCiC;
        }
      }
      return money;
    }
  };
  return (
    <div className="header">
      <div className="header_welcome">
        <h1>
          Welcome,
          {props.userName}
        </h1>
        <p
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Id: {props.uid}
        </p>
      </div>

      <div className="header_buttons">
        <button
          className="button hide_button"
          onClick={() => {
            handleShow(!show);
          }}
        >
          {show ? "Hide" : "Show"} Money
        </button>
        {show && (
          <button className="button edit_button" onClick={() => setOpen(true)}>
            Edit Money
          </button>
        )}
      </div>

      {show && progress && (
        <div className="header_progress">
          <p className="completed">Completed: {progress.completed}</p>
          <p className="not_completed">
            Not Completed: {progress.notCompleted}
          </p>
          <p className="starting_amount">
            Starting Amount: {progress.startingAmount}
          </p>
          <p className="total">Increment: {progress.increment}</p>
          <div className="money">
            <p className="money_header">Punished Money:</p>
            <span className="money_number">
              {calculateMoney(
                progress.notCompleted,
                progress.startingAmount,
                progress.increment,
                progress.notCompletedBeforeIncrement
              )}
            </span>
          </div>
        </div>
      )}

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
          <div className="header_modal">
            <form className="header_form" noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                label="Completed"
                type="number"
                required
                className="header_form_input"
                helperText="Only natural numbers larger than or equal to 0"
                onChange={(event) => setCompleted(parseInt(event.target.value))}
              />
              <TextField
                id="standard-basic"
                label="Not Completed"
                type="number"
                required
                className="header_form_input"
                helperText="Only natural numbers larger than or equal to 0"
                onChange={(event) =>
                  setNotCompleted(parseInt(event.target.value))
                }
              />
              <TextField
                id="standard-basic"
                label="Starting amount"
                type="number"
                required
                className="header_form_input"
                helperText="Only natural numbers larger than or equal to 0"
                onChange={(event) =>
                  setStartingAmount(parseInt(event.target.value))
                }
              />
              <br />
              <br />
              <TextField
                id="standard-basic"
                label="Increment"
                type="number"
                required
                className="header_form_input"
                helperText="Only natural numbers larger than or equal to 0"
                onChange={(event) => setIncrement(parseInt(event.target.value))}
              />
              <TextField
                id="standard-basic"
                label="Not Completed times Before Increment"
                type="number"
                required
                className="header_form_input"
                helperText="Only natural numbers larger than 0"
                onChange={(event) =>
                  setNotCompletedBeforeIncrement(parseInt(event.target.value))
                }
              />
              {!(
                completed < 0 ||
                notCompleted < 0 ||
                startingAmount < 0 ||
                increment < 0 ||
                notCompletedBeforeIncrement <= 0
              ) && (
                <p>
                  Punished money will be: {"   "}
                  {calculateMoney(
                    notCompleted,
                    startingAmount,
                    increment,
                    notCompletedBeforeIncrement
                  )}
                </p>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                disabled={
                  completed < 0 ||
                  notCompleted < 0 ||
                  startingAmount < 0 ||
                  increment < 0 ||
                  notCompletedBeforeIncrement <= 0
                }
                onClick={handleSubmit}
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

export default Header;
