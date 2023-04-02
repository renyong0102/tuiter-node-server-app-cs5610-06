import posts from "./tuits.js";
let tuits = posts;

const createTuit = (req, res) => {
    // retrieve data from http body
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime()+'';
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.disliked = false;
    newTuit.dislikes = 0;
    newTuit.image = "nasa.webp";
    newTuit.username = "NASA";
    newTuit.handle = "@nasa";
    // append new tuit to tuits array
    tuits.push(newTuit);
    res.json(newTuit);

}
const findTuits  = (req, res) => {
    res.json(tuits)
}
const updateTuit = (req, res) => {
    // get ID of tuit to update from path
    const tuitdIdToUpdate = req.params.tid;
    // get updates from HTTP body
    const updates = req.body;
    const tuitIndex = tuits.findIndex(
        (t) => t._id === tuitdIdToUpdate)
    tuits[tuitIndex] =
        {...tuits[tuitIndex], ...updates};
    res.sendStatus(200);

}
const deleteTuit = (req, res) => {
    // retrieve the ID of the tuit we want to remove
    const tuitdIdToDelete = req.params.tid;
    tuits = tuits.filter((t) =>
        t._id !== tuitdIdToDelete);
    res.sendStatus(200);

}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
