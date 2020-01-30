const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const bodyParser = require('body-parser');
/*const dbData = {
    url: "mongodb+srv://daniil_kholodkov:rammstein1994201447@cluster0-3eao9.mongodb.net/test?retryWrites=true&w=majority"
}*/
const dbData = require('./config/db');
const app = express();

const schoolRoute = require("./routes/schoolRoutes");
const userRoute = require('./middleware/ware_routes');

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


