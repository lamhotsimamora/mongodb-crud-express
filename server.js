const express = require('express')
const path = require('path');
const bodyparser = require("body-parser");
const dotenv = require('dotenv').config({ path: 'config.env' });
const connectDB = require('./database/connection')
const controller = require('./controller/controller')

const PORT = process.env.PORT || 8080

connectDB();

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/add-user', function(req, res) {
    controller.addUser(req, res);
})

app.post('/add-product', function(req, res) {
    controller.addProduct(req, res);
})

app.get('/view-users', function(req, res) {
    controller.getUsers(req, res);
})

app.post('/delete-user', function(req, res) {
    controller.deleteUser(req, res);
})

app.post('/search-user', function(req, res) {
    controller.searchUser(req, res);
})


app.post('/update-user', function(req, res) {
    controller.updateUser(req, res);
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})