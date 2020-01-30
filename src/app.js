const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const bodyParser = require('body-parser');
const dbData = require('./config/db');
const app = express();

const schoolRoute = require("./routes/schoolRoutes");
const userRoute = require('./middleware/ware_routes');

const stud = require('./db/models/StudentModel.js').schema;
const port = 8000;
const db = mongoose.connect(dbData.url, { useNewUrlParser: true }, () => {
    console.log("Connected to DB!");
    
    
});

app.use(bodyParser.urlencoded({ extended: true })) 
app.use('/school', schoolRoute)
app.use('/signin', userRoute)

app.listen(port, () => {
    console.log('We are live on ' + port);
  });      


