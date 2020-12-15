import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import User from "./User";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function UserDisplay(props) {
  const classes = useStyles();
  const usersList = props?.usersList;

  // console.log("User List >>>", usersList);

  const usersJSX = usersList?.map((user) => (
    <ListItem button key={user.friendCode}>
      <User userName={user.name} uid={user.friendCode} />
    </ListItem>
  ));

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Users List
        </ListSubheader>
      }
      className={classes.root}
    >
      {usersJSX}
    </List>
  );
}
