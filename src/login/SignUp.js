import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import * as firebase from "firebase";
import { db } from "../firebase/useFirebase";
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
    marginTop: "20px",
    width: "80%",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  goBack: {
    marginTop: "30%",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
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
  const nameInput = (event) => {
    const value = event.target.value;
    // console.log("Value >>>", value);
    setName(value);
  };

  const SignUp = (event) => {
    event.preventDefault();
    console.log("Sign Up clicked");
    const userRef = db.collection("users");

    if (userId && password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userId, password)
        .then((user) => {
          console.log(user);
          userRef.doc(user.user.uid).set({ name: name });
          props.setUid(user.user.uid);
          history.push("/main");
        })
        .catch((err) => {
          // console.error("Error >>>", err);
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
        <TextField
          id="standard-basic"
          label="Display Name"
          onChange={nameInput}
          required
        />
        <Button
          variant="contained"
          color="primary"
          onClick={SignUp}
          className={classes.signUp}
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
