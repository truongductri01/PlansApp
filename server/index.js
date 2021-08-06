"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const cors = require("cors");
const usersAPI = require("./api/users/users");
const tasksAPI = require("./api/tasks/tasks");
app.use(cors());
app.use(express.json());
app.use("/api/users", usersAPI);
app.use("/api/tasks", tasksAPI);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
});
