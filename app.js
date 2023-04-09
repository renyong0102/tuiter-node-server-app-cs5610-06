// const express = require('express')
import express from 'express';
// CORS stands for Cross Origin Resource Sharing and establishes the rules by which resources can be
// shared across domains(origins). Configure CORS in app.js by importing it and using it as the
// first middleware.
import cors from 'cors'
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";

import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
// mongoose.connect('mongodb://127.0.0.1:27017/tuiter')
// mongoose.connect("mongodb+srv://1067491607zry:0102554ZHENG@cluster0.ebed3da.mongodb.net/tuiter-sp23-06?retryWrites=true&w=majority")
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter'
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(express.json());
app.use(cors())
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/',(req, res) => {res.send('Welcome to Full Stack Development!')})
// move the both to a new file called hello-controller.js
HelloController(app)
TuitsController(app);
UserController(app)
app.listen(process.env.PORT || 4000);