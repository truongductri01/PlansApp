import {
  addCollectionData,
  deleteCollectionDocData,
  generateId,
  getCollectionData,
  updateCollectionData,
} from "../../commands/commands";

import * as express from "express";
const app = express();

const isValidTaskPost = (body: any) => {
  return body.description && body.time_zone && body.complexity && body.user_id;
};

const isValidUpdateTask = (body: any) => {
  const standardRequestObject = {
    status: "in_progress",
    description: "first Task",
    due_date: "07/11/2001",
    is_deleted: false, // use to hide data instead of completely remove it from the system
    created_at: Date.now(),
    user_id: "tri_truong_1627954819248",
    complexity: 1,
    time_zone: "UTC",
  };
  let isValid = true;
  Object.keys(body).forEach((attribute) => {
    if (
      standardRequestObject[attribute] == undefined ||
      standardRequestObject[attribute] == null
    ) {
      isValid = false;
    }
  });

  return isValid;
};

app.get("/", async (req, res) => {
  const tasks = await getCollectionData("tasks");
  res.json(tasks);
});

app.post("/", (req, res) => {
  const body = req.body;
  if (isValidTaskPost(body)) {
    const task_id = generateId("tasks", body.user_id, null);
    addCollectionData("tasks", {
      id: task_id,
      status: "in_progress",
      description: body.description,
      due_date: body.due_date || null,
      is_deleted: false, // use to hide data instead of completely remove it from the system
      created_at: Date.now(),
      user_id: body.user_id,
      complexity: body.complexity,
      time_zone: body.time_zone,
    })
      .then(() => res.json(task_id))
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } else {
    res.status(403).json({ error: "missing required field" });
  }
});

app.put("/:task_id", (req, res) => {
  const task_id = req.params.task_id;
  const body = req.body;
  if (task_id && body) {
    if (isValidUpdateTask(body)) {
      updateCollectionData("tasks", task_id, body)
        .then(() => res.json(task_id))
        .catch((err) => {
          res.status(400).json({ error: err });
        });
    } else {
      res.status(403).json({ error: "body contains invalid attribute or key" });
    }
  } else {
    res.status(400).json({ error: "invalid task_id or body" });
  }
});

app.delete("/:task_id", (req, res) => {
  const task_id = req.params.task_id;
  if (task_id) {
    deleteCollectionDocData("tasks", task_id)
      .then(() => {
        res.status(200).send("Success");
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  }
});

module.exports = app;
