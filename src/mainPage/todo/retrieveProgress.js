import { db } from "../../firebase/useFirebase";
const { useState, useEffect } = require("react");

const RetrieveProgress = (uid) => {
  const [progress, setProgress] = useState([]);

  // Retrieve the cards and render it to the screen

  useEffect(() => {
    if (uid) {
      db.collection("tasks")
        .doc(uid)
        .get()
        .then((doc) => {
          const data = doc.data();

          setProgress({
            completed: data.completed,
            notCompleted: data.notCompleted,
            startingAmount: data.startingAmount,
            notCompletedBeforeIncrement: data.notCompletedBeforeIncrement,
            increment: data.increment,
            showMoney: data.showMoney,
          });

          if (
            data.completed == null ||
            data.notCompleted == null ||
            data.startingAmount == null ||
            data.increment == null ||
            data.showMoney == null ||
            data.notCompletedBeforeIncrement == null
          ) {
            db.collection("tasks").doc(uid).set({
              completed: 0,
              notCompleted: 0,
              startingAmount: 5,
              increment: 5,
              notCompletedBeforeIncrement: 3,
              showMoney: true,
            });
          }
        });
    }
  }, [uid]);

  return progress;
};

export default RetrieveProgress;
