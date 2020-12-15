import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import Login from "./login/Login";
import * as firebase from "firebase";
import SignUp from "./login/SignUp";
import { db } from "./firebase/useFirebase";

function App() {
  const [uid, setUid] = useState();
  const [userName, setUserName] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const id = authUser.uid;

        await db
          .collection("users")
          .doc(id)
          .get()
          .then((data) => {
            const name = data.data()?.name;

            setUserName(name);
          });

        setUid(authUser.uid);
      } else {
        console.log("No user logged in");
      }
    });
  }, []);

  return (
    <div className="App">
      <React.StrictMode>
        <Router>
          <Switch>
            <Route path="/main">
              {uid ? (
                <MainPage uid={uid} userName={userName} setUid={setUid} />
              ) : (
                <Login setUid={setUid} />
              )}
            </Route>
            <Route path="/signup">
              <SignUp setUid={setUid} />
            </Route>
            <Route path="/">
              {uid ? (
                <MainPage uid={uid} userName={userName} setUid={setUid} />
              ) : (
                <Login setUid={setUid} />
              )}
            </Route>
          </Switch>
        </Router>
      </React.StrictMode>
    </div>
  );
}

export default App;
