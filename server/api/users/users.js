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
const isValidUserPost = (body) => {
    return (body.name &&
        body.email &&
        body.allow_email !== null && // as allow_email can be false based on its value
        body.time_zone &&
        body.time_format);
};
const isValidUpdateUser = (body) => {
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
        if (standardRequestObject[attribute] == undefined ||
            standardRequestObject[attribute] == null) {
            isValid = false;
        }
    });
    return isValid;
};
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield commands_1.getCollectionData("users");
    res.json(users);
}));
app.post("/", (req, res) => {
    const body = req.body;
    if (isValidUserPost(body)) {
        const user_id = commands_1.generateId("users", null, body.name);
        const requestUser = {
            // generated or input
            id: body.id || user_id,
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
        commands_1.addCollectionData("users", requestUser)
            .then(() => res.json(requestUser))
            .catch((err) => {
            res.status(400).json({ error: err });
        });
    }
    else {
        console.log("body >>>", body.allow_email);
        res.status(403);
        res.send("Missing some required component. Need: name, email, allow_email, time_zone, and time_format");
    }
});
app.put("/:user_id", (req, res) => {
    const body = req.body;
    const user_id = req.params.user_id;
    if (user_id && body) {
        if (isValidUpdateUser(body)) {
            commands_1.updateCollectionData("users", user_id, body)
                .then(() => res.json(user_id))
                .catch((err) => {
                res.status(400).json({ error: err });
            });
        }
        else {
            res.status(400).json({ error: "body content invalid attributes" });
        }
    }
    else {
        res.status(400).json({ error: "missing user_id" });
    }
});
app.delete("/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    console.log("users id >>>", user_id);
    commands_1.deleteCollectionDocData("users", user_id)
        .then(() => {
        res.status(200).send("Success");
    })
        .catch((err) => {
        res.status(400).send("err");
    });
});
module.exports = app;
