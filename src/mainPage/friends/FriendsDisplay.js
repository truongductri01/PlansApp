import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/useFirebase";

function retrieveFriends(userId, setFriends) {
  db.collection("users")
    .doc(userId)
    .collection("friends")
    .onSnapshot((snap) => {
      let friends = [];
      snap.forEach((doc) => {
        const friendCode = doc.data().friendCode;
        const name = doc.data().name;
        const id = doc.id;
        friends.push({ friendCode, name, id });
      });

      setFriends(friends);
    });
}

function FriendsDisplay(props) {
  const uid = props.uid;
  const [friends, setFriends] = useState([]);

  const deleteFriend = (friendCode, id) => {
    // perform a mutual deletion
    console.log("Id of the doc >>>", id);
    db.collection("users").doc(uid).collection("friends").doc(id).delete();
    db.collection("users")
      .doc(friendCode)
      .collection("friends")
      .onSnapshot((snap) => {
        snap.forEach((doc) => {
          const code = doc.data().friendCode;
          if (code === uid) {
            db.collection("users")
              .doc(friendCode)
              .collection("friends")
              .doc(doc.id)
              .delete();
          }
        });
      });
  };

  useEffect(() => {
    retrieveFriends(uid, setFriends);
    // eslint-disable-next-line
  }, [uid]);
  const friendsJSX = friends.map((friend) => (
    <div className="display_friend">
      <p>{friend.name}</p>
      <p>{friend.friendCode}</p>

      <Button
        variant="contained"
        color="secondary"
        key={friend.id}
        className="display_btn"
        onClick={() => deleteFriend(friend.friendCode, friend.id)}
      >
        Delete Friend
      </Button>
    </div>
  ));

  return (
    <div className="display">
      <h1>This is your friends</h1>
      {friendsJSX}
    </div>
  );
}

export default FriendsDisplay;
