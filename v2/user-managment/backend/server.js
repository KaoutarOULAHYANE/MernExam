const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

/* to create environment variables in the DMV file */
require('dotenv').config();

/* to create an express server with specified port */
const app = express();
const port = process.env.PORT || 5000;

/* the cores midleware */
app.use(cors());
/* to parse JSON */
app.use(express.json());
/* Our database URI we get it from MongoDB Dashboard */
const uri = process.env.COMPASS;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

/* tell the server to use this two files ( see routes folder) */
const usersRouter = require('./routes/users');

/* users and exercises are the name of collections */
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});