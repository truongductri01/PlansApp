"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../../commands/commands");
const express = require("express");
const app = express();
const isValidTaskPost = (body) => {
    return body.description && body.time_zone && body.complexity && body.user_id;
};
const isValidUpdateTask = (body) => {
    const standardRequestObject = {
        status: "in_progress",
        description: "first Task",
        due_date: "07/11/2001",
        is_deleted: false,
        created_at: Date.now(),
        user_id: "tri_truong_1627954819248",
        complexity: 1,
        time_zone: "UTC",
    };
    let isValid = true;
    Object.keys(body).forEach((attribute) => {
        if (standardRequestObject[attribute] == undefined ||
            standardRequestObject[attribute] == null) {
            isValid = false;
        }
    });
    return isValid;
};
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield commands_1.getCollectionData("tasks");
    res.json(tasks);
}));
app.post("/", (req, res) => {
    const body = req.body;
    if (isValidTaskPost(body)) {
        const task_id = commands_1.generateId("tasks", body.user_id, null);
        commands_1.addCollectionData("tasks", {
            id: task_id,
            status: "in_progress",
            description: body.description,
            due_date: body.due_date || null,
            is_deleted: false,
            created_at: Date.now(),
            user_id: body.user_id,
            complexity: body.complexity,
            time_zone: body.time_zone,
        })
            .then(() => res.json(task_id))
            .catch((err) => {
            res.status(400).json({ error: err });
        });
    }
    else {
        res.status(403).json({ error: "missing required field" });
    }
});
app.put("/:task_id", (req, res) => {
    const task_id = req.params.task_id;
    const body = req.body;
    if (task_id && body) {
        if (isValidUpdateTask(body)) {
            commands_1.updateCollectionData("tasks", task_id, body)
                .then(() => res.json(task_id))
                .catch((err) => {
                res.status(400).json({ error: err });
            });
        }
        else {
            res.status(403).json({ error: "body contains invalid attribute or key" });
        }
    }
    else {
        res.status(400).json({ error: "invalid task_id or body" });
    }
});
app.delete("/:task_id", (req, res) => {
    const task_id = req.params.task_id;
    if (task_id) {
        commands_1.deleteCollectionDocData("tasks", task_id)
            .then(() => {
            res.status(200).send("Success");
        })
            .catch((err) => {
            res.status(400).json({ error: err });
        });
    }
});
module.exports = app;
