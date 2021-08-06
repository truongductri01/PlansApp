import {
  addCollectionData,
  deleteCollectionDocData,
  generateId,
  getCollectionData,
  updateCollectionData,
} from "../../commands/commands";

import * as express from "express";
const app = express();

const isValidUserPost = (body: any) => {
  return (
    body.name &&
    body.email &&
    body.allow_email !== null && // as allow_email can be false based on its value
    body.time_zone &&
    body.time_format
  );
};

const isValidUpdateUser = (body: any) => {
  const standardRequestObject = {
    name: "updated name",
    email: "user_1",
    allow_email: false,
    friends: [],
    completed_tasks: 1,
    in_progress_tasks: 1,
    not_completed_tasks: 1,
    history: [],
    time_zone: "UTC",
    time_format: "DD/MM/YYYY",
    last_time_log_in: Date.now(),
    days_count: 0,
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
  const users = await getCollectionData("users");
  res.json(users);
});

app.post("/", (req, res) => {
  const body = req.body;
  if (isValidUserPost(body)) {
    const user_id = generateId("users", null, body.name);
    const requestUser = {
      // generated or input
      id: body.id || user_id, // can be used later
      name: body.name,
      email: body.email,
      allow_email: body.allow_email,
      time_zone: body.time_zone,
      time_format: body.time_format,

      // default
      friends: [],
      completed_tasks: 0,
      in_progress_tasks: 0,
      not_completed_tasks: 0,
      history: [],
      created_at: Date.now(),
      last_time_log_in: Date.now(),
      days_count: 0,
    };
    addCollectionData("users", requestUser)
      .then(() => res.json(requestUser))
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } else {
    console.log("body >>>", body.allow_email);
    res.status(403);
    res.send(
      "Missing some required component. Need: name, email, allow_email, time_zone, and time_format"
    );
  }
});

app.put("/:user_id", (req, res) => {
  const body = req.body;
  const user_id = req.params.user_id;
  if (user_id && body) {
    if (isValidUpdateUser(body)) {
      updateCollectionData("users", user_id, body)
        .then(() => res.json(user_id))
        .catch((err) => {
          res.status(400).json({ error: err });
        });
    } else {
      res.status(400).json({ error: "body content invalid attributes" });
    }
  } else {
    res.status(400).json({ error: "missing user_id" });
  }
});

app.delete("/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  console.log("users id >>>", user_id);
  deleteCollectionDocData("users", user_id)
    .then(() => {
      res.status(200).send("Success");
    })
    .catch((err) => {
      res.status(400).send("err");
    });
});

module.exports = app;
