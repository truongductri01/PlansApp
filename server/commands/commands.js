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
exports.generateId = exports.deleteCollectionDocData = exports.updateCollectionData = exports.addCollectionData = exports.getCollectionData = void 0;
const firebase_1 = require("../firebase/firebase");
// User commands
const getCollectionData = (collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    const responseData = [];
    yield firebase_1.db
        .collection(collectionName)
        .get()
        .then((result) => result.docs)
        .then((docs) => {
        docs.forEach((doc) => responseData.push(doc.data()));
    });
    return responseData;
});
exports.getCollectionData = getCollectionData;
const addCollectionData = (collectionName, dataObject) => {
    return firebase_1.db
        .collection(collectionName)
        .doc(dataObject.id)
        .set(dataObject)
        .then(() => { })
        .catch((err) => {
        throw Error(err);
    });
};
exports.addCollectionData = addCollectionData;
const updateCollectionData = (collectionName, objectId, dataObject) => {
    return firebase_1.db
        .collection(collectionName)
        .doc(objectId)
        .update(dataObject)
        .then(() => { })
        .catch((err) => {
        throw Error(err);
    });
};
exports.updateCollectionData = updateCollectionData;
const deleteCollectionDocData = (collectionName, objectId) => {
    return firebase_1.db
        .collection(collectionName)
        .doc(objectId)
        .delete()
        .catch((err) => {
        throw Error(err);
    });
};
exports.deleteCollectionDocData = deleteCollectionDocData;
const generateId = (collectionName, userId, userName) => {
    if (collectionName === "users" && userName) {
        const joinName = userName.split(" ").join("_").toLocaleLowerCase();
        return `${joinName}_${Date.now()}`;
    }
    else if (collectionName === "tasks" && userId) {
        return `${collectionName}_${Date.now()}_${userId}`;
    }
    throw Error("Not valid collection type or missing requirement");
};
exports.generateId = generateId;
