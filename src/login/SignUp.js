import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import * as firebase from "firebase";
import { db } from "../firebase/useFirebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "98vh",
    width: "75%",
    overflow: "hidden",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  signUp: {
    marginTop: "20px",
    width: "80%",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  goBack: {
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
    width: "50%",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [name, setName] = useState();
  const history = useHistory();

  const SignUp = (event) => {
    event.preventDefault();
    // console.log("Sign Up clicked");
    const userRef = db.collection("users");

    if (userEmail && password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userEmail, password)
        .then((user) => {
          console.log(user);
          userRef.doc(user.user.uid).set({ name: name });
          props.setUid(user.user.uid);

          db.collection("tasks").doc(user.user.uid).set({
            completed: 0,
            notCompleted: 0,
            startingAmount: 5,
            increment: 5,
            notCompletedBeforeIncrement: 3,
            showMoney: true,
          });

          history.push("/main");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Empty Email and Password");
    }
  };
  return (
    <div className={classes.root}>
      <h1>Sign Up</h1>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="User Email"
          onChange={(event) => setUserEmail(event.target.value)}
          required
          helperText="Example: testing@gmail.com"
        />
        <TextField
          id="standard-basic"
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
        />
        <TextField
          id="standard-basic"
          label="Confirm Password"
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          type="password"
          helperText={
            password && confirmPassword
              ? confirmPassword !== password
                ? "Password not matched"
                : "Matched"
              : null
          }
        />
        <TextField
          id="standard-basic"
          label="Display Name"
          onChange={(event) => setName(event.target.value)}
          required
        />
        <Button
          variant="contained"
          color="primary"
          onClick={SignUp}
          className={classes.signUp}
          disabled={
            !(userEmail && password && password === confirmPassword && name)
          }
        >
          Sign Up
        </Button>
      </form>
      <div className={classes.goBack}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => history.push("/")}
          className={classes.signUp}
        >
          Go back to Log In
        </Button>
      </div>
    </div>
  );
}

export default SignUp;
