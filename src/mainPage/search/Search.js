import React, { useEffect, useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { db } from "../../firebase/useFirebase";
import UserDisplay from "./UsersDisplay";
import TasksModal from "./TasksModal";

const useStyles = makeStyles((theme) => ({
  root: {
    objectFit: "contain",
    maxWidth: "75%",
    minWidth: "50%",
    border: "1px solid black",
    margin: "auto",
  },
  search: {
    position: "relative",
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "100%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    borderRadius: theme.shape.borderRadius,

    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    border: "1px solid black",
    margin: "auto",

    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const uid = props?.uid;
  const [friends, setFriends] = useState([]);

  // console.log("User id in search >>>", uid);

  useEffect(() => {
    if (uid) {
      db.collection("users")
        .doc(uid)
        .collection("friends")
        .onSnapshot((snap) => {
          let tempList = [];
          snap.forEach((doc) => {
            // console.log("Friends >>>", doc.data());
            tempList.push(doc.data());
          });

          setFriends(tempList);
        });
    }
  }, [uid]);

  // console.log("List of users >>>", friends);

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      {friends.length >= 1 ? (
        <UserDisplay usersList={friends} />
      ) : (
        <h4>There is no friend</h4>
      )}
      <TasksModal />
    </div>
  );
}
