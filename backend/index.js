<<<<<<< HEAD
=======
//require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const connectToMongo = require('./db')
connectToMongo();
>>>>>>> d1f65f931d4e8d1ffa0bbf6c44783eed7e1b403e

import dotenv from "dotenv"
import cors from 'cors';
import express from 'express';
import createUserRouter from "./Routes/CreateUser.js";
import DisplayData from "./Routes/DisplayData.js";
import OrderData from "./Routes/OrdersData.js";

dotenv.config({
  path: './.env'
})

const app = express()
const port = 3000

import connectToMongo from './db.js'

connectToMongo();

app.use(cors());

app.use(express.json())
app.use('/api' , createUserRouter)
app.use('/api' , DisplayData)
app.use('/api' , OrderData)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
