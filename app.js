const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/books_catalog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',routes)

app.listen(port, () => {
    console.log("App is listening to port 3000");
})