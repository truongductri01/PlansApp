import { db } from "../../firebase/useFirebase";
const { useState, useEffect } = require("react");

const useFirestore = (uid) => {
  const [tasks, setTasks] = useState([]);

  // Retrieve the cards and render it to the screen

  useEffect(() => {
    if (uid) {
      db.collection("tasks")
        .doc(uid)
        .collection("tasks")
        .onSnapshot((snap) => {
          let tasksList = [];
          snap.forEach((doc) => {
            tasksList.push({ ...doc.data(), id: doc.id });
          });

          setTasks(tasksList);
        });
    }
  }, [uid]);

  // Return cards to later renders
  // console.log("Cards >>>", tasks);
  return { tasks };
};

export default useFirestore;
