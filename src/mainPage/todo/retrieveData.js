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
            if (doc.data().checked) {
              tasksList.push({ ...doc.data(), id: doc.id });
            } else {
              tasksList.push({ ...doc.data(), id: doc.id, checked: false });
            }
          });

          setTasks(tasksList);
        });
    }
  }, [uid]);
  return { tasks };
};

export default useFirestore;
