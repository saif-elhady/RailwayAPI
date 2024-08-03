import express from 'express';
import mongoose, { Error } from 'mongoose';
import tripRouter from './routes/router'; 
import bodyParser from 'body-parser';
require('dotenv').config();

//expressApp
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//connectToDatabase
const dbURI = process.env.db_URI || '';
const PORT = process.env.PORT;
mongoose.connect(dbURI)
    .then(() => {
        app.listen(process.env.PORT || 3000);
        console.log(`listening on port ${PORT}`)
    })
    .catch((err: Error) => console.log(err));
    
//router
app.use('/', tripRouter);

