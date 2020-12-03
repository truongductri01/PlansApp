import { Button, Input, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/useFirebase";

const useStyles = makeStyles(() => ({
  button: {
    margin: "10px",
  },
}));

function InputFriendCode(props) {
  const classes = useStyles();
  const [friendCode, setFriendCode] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [friends, setFriends] = useState([]);
  const uid = props?.uid;
  const userName = props?.userName;

  useEffect(() => {
    db.collection("users").onSnapshot((snap) => {
      let tempList = [];
      snap.forEach((doc) => {
        const user = { uid: doc.id, name: doc.data().name };
        tempList.push(user);
      });
      setUsersList(tempList);
    });

    db.collection("users")
      .doc(uid)
      .collection("friends")
      .onSnapshot((snap) => {
        let tempList = [];
        snap.forEach((doc) => {
          const friend = doc.data();
          tempList.push(friend);
        });
        setFriends(tempList);
      });
  }, [uid]);

  const handleChange = (e) => {
    const value = e.target.value;
    setFriendCode(value.trim()); // a code will not have a whitespace
  };

  const handleClick = () => {
    addFriend(friendCode, usersList, uid, userName, friends);
    // Testing code: sO80t1p7Mob37w667JjxbZQThcB2
  };

  return (
    <div>
      <Input
        onChange={handleChange}
        placeholder="Your friend's code"
        value={friendCode}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
          handleClick();
          setFriendCode("");
        }}
      >
        Submit
      </Button>
    </div>
  );
}

export default InputFriendCode;

function addFriend(friendCode, usersList, userId, userName, friends) {
  // Check of the friend is already added or not.
  // If yes, return a message
  // Else: added
  let inUserList = false;
  let isFriend = false;
  let isUser = friendCode === userId;
  friends.forEach((friend) => {
    const friendId = friend.friendCode;
    const friendName = friend.name;
    if (friendId === friendCode) {
      isFriend = true;
      console.log(`${friendName} is already added to your friendlist`);
    }
  });

  if (!isFriend && !isUser) {
    usersList.forEach((user) => {
      const id = user.uid;
      const name = user.name;
      if (id === friendCode) {
        inUserList = true;
        // add to both friends as a mutual connection
        console.log("Valid code, adding friends...");
        db.collection("users")
          .doc(userId)
          .collection("friends")
          .add({ friendCode, name });

        db.collection("users")
          .doc(friendCode)
          .collection("friends")
          .add({ friendCode: userId, name: userName });
      }
    });
    if (!inUserList) {
      alert("Not a valid friend code");
    }
  } else {
    if (isFriend) {
      alert("Your are friends already");
    } else {
      alert("Do not put your own id ");
    }
  }

  return usersList;
}
