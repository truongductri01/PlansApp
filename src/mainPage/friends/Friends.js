import React from "react";
import FriendsDisplay from "./FriendsDisplay";
import InputFriendCode from "./InputFriendCode";
import "./Friends.css";

function Friends(props) {
  console.log("User id in friends >>>", props?.uid);
  return (
    <div>
      <InputFriendCode uid={props?.uid} userName={props.userName} />
      <FriendsDisplay uid={props?.uid} />
    </div>
  );
}

export default Friends;
