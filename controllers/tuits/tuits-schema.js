import mongoose from 'mongoose';

const schema = mongoose.Schema({
    tuit: String,
    likes: Number,
    liked: Boolean,
    image: String,
    dislikes: Number,
    disliked: Boolean,
    handle: String,
    replies: Number,
    time: String,
    title: String,
    username: String,
    retuits: Number,
    topic: String
},
    {collection: 'tuits'});
export default schema;

