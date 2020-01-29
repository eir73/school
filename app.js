const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');

const bodyParser = require('body-parser');
const dbData = require('./config/db');
const app = express();

const schoolRoute = require("./routes/posts")

const stud = require('./db/models/StudentModel.js').schema
const port = 8000;
const db = mongoose.connect(dbData.url, { useNewUrlParser: true }, () => {
    console.log("Connected to DB!")
})

const User = require("./db/models/usermodel.js")
const School = require("./db/models/SchoolModel.js")


console.log(School)


app.use(bodyParser.urlencoded({ extended: true })); 
app.use("/school", schoolRoute);

app.listen(port, () => {
    console.log('We are live on ' + port);
  });      


