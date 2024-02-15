import express from 'express';
import Connection from './Database/db.js';
import cors from 'cors';
import Router from './Routes/router.js'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(bodyParser.json({extended:true}))
app.use(cors({ origin: true, credentials: true }));
app.use('/',Router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server is listening on port 5000")
})
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@mern-projects.a1khghl.mongodb.net/?retryWrites=true&w=majority`

Connection(URL);