import React from "react";
import ResponsiveDrawer from "./drawer";
import "./MainPage.css";
import Todo from "./todo/Todo";
/*
-----------------------------
1. A nav bar showing the user name and the date
2. a small menu button
3. A menu bar on the left side
-----------------------------
*/

function MainPage(props) {
  return (
    <div>
      <ResponsiveDrawer
        function={Todo}
        uid={props.uid}
        userName={props.userName}
        setUid={props.setUid}
      ></ResponsiveDrawer>
    </div>
  );
}

export default MainPage;
