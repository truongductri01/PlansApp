import { User, Task } from "../dataSchema/dataSchema";
import { db } from "../firebase/firebase";

// User commands
export const getCollectionData = async (
  collectionName: string
): Promise<Array<any>> => {
  const responseData = [];
  await db
    .collection(collectionName)
    .get()
    .then((result) => result.docs)
    .then((docs) => {
      docs.forEach((doc) => responseData.push(doc.data()));
    });
  return responseData;
};

export const addCollectionData = (
  collectionName: string,
  dataObject: User | Task
) => {
  return db
    .collection(collectionName)
    .doc(dataObject.id)
    .set(dataObject)
    .then(() => {})
    .catch((err) => {
      throw Error(err);
    });
};

export const updateCollectionData = (
  collectionName: string,
  objectId: string,
  dataObject: User | Task
) => {
  return db
    .collection(collectionName)
    .doc(objectId)
    .update(dataObject)
    .then(() => {})
    .catch((err) => {
      throw Error(err);
    });
};

export const deleteCollectionDocData = (
  collectionName: string,
  objectId: string
) => {
  return db
    .collection(collectionName)
    .doc(objectId)
    .delete()
    .catch((err) => {
      throw Error(err);
    });
};

export const generateId = (
  collectionName: string,
  userId: string | null,
  userName: string | null
): string => {
  if (collectionName === "users" && userName) {
    const joinName = userName.split(" ").join("_").toLocaleLowerCase();
    return `${joinName}_${Date.now()}`;
  } else if (collectionName === "tasks" && userId) {
    return `${collectionName}_${Date.now()}_${userId}`;
  }
  throw Error("Not valid collection type or missing requirement");
};
