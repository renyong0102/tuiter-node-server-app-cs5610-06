
import * as tuitsDao from './tuits-dao.js';

// import posts from "./tuits.js";
// let tuits = posts;

const createTuit = async (req, res) => {
    // retrieve data from http body
    const newTuit = req.body;
    // newTuit._id = (new Date()).getTime()+'';
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.disliked = false;
    newTuit.dislikes = 0;
    newTuit.image = "nasa.webp";
    newTuit.username = "NASA";
    newTuit.handle = "@nasa";
    newTuit.retuits = 0;
    newTuit.replies = 0;
    newTuit.time = "2h";
    newTuit.topic = "Nasa"

    // append new tuit to tuits array
    // tuits.push(newTuit);
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(insertedTuit);
}
const findTuits  = async (req, res) => {
    const tuits = await tuitsDao.findTuits()
    res.json(tuits)
}

const updateTuit = async (req, res) => {
    // get ID of tuit to update from path
    const tuitdIdToUpdate = req.params.tid;
    // get updates from HTTP body
    const updates = req.body;
    // const tuitIndex = tuits.findIndex(
    //     (t) => t._id === tuitdIdToUpdate)
    // tuits[tuitIndex] =
    //     {...tuits[tuitIndex], ...updates};
    const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updates);
    res.json(status);

}
const deleteTuit = async (req, res) => {
    // retrieve the ID of the tuit we want to remove
    const tuitdIdToDelete = req.params.tid;
    // tuits = tuits.filter((t) =>
    //     t._id !== tuitdIdToDelete);
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
    res.json(status);

}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
