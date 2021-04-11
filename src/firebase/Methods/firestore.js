import {db} from "../index";

export const addToCollection = (collectionName,payload)=>{
    return db.collection(collectionName).add(payload);
}
export const updateDocument = (collectionName,docId,payload)=>{
    return db.collection(collectionName).doc(docId).update(payload);
}
export const getCollection = (collectionName)=>{
    return db.collection(collectionName).get();
}
export const deleteFromCollection = (collectionName,docId)=>{
    return db.collection(collectionName).doc(docId).delete();
}