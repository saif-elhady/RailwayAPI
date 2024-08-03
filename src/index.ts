import express from 'express';
import mongoose, { Error } from 'mongoose';
require('dotenv').config();

//expressApp
const app = express();

//connectToDatabase
const dbURI = process.env.db_URI || '';
mongoose.connect(dbURI)
    .then(() => app.listen(process.env.PORT || 3000))
    .catch((err: Error)=> console.log(err));
