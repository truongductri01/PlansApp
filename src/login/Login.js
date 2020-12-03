import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import * as firebase from "firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    // border: "5px solid black",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "98vh",
    width: "75%",
  },
  form: {
    // border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  signUp: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const userIdInput = (event) => {
    const value = event.target.value;
    // console.log("Value >>>", value);
    setUserId(value);
  };

  const passwordInput = (event) => {
    const value = event.target.value;
    // console.log("Value >>>", value);
    setPassword(value);
  };

  const LogIn = (event) => {
    event.preventDefault();

    if (userId && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(userId, password)
        .then((user) => {
          // Signed in
          // ...
          console.log(user.user);
          props.setUid(user.user.uid);
          history.push("/main");
        })
        .catch((err) => {
          console.error("Error >>>", err);
          alert("Your email or Password is not correct");
        });
    } else {
      alert("Your email or Password is empty");
      console.log("Empty");
    }
  };

  const SignUp = (event) => {
    history.push("/signup");
  };

  // console.log("User id hereeee >>>", userId);
  // console.log("Password hereeee >>>", password);

  return (
    <div className={classes.root}>
      <h1>Login</h1>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="User id"
          onChange={userIdInput}
          required
        />
        <TextField
          id="standard-basic"
          label="Password"
          onChange={passwordInput}
          required
          type="password"
        />
        <Button variant="contained" color="secondary" onClick={LogIn}>
          Login
        </Button>
      </form>
      <div className={classes.signUp}>
        <h4>New user?</h4>
        <Button variant="outlined" color="primary" onClick={SignUp}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
