'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

mongoose.connect('mongodb://admin:admin@ds040017.mlab.com:40017/node-store', {
    useMongoClient: true
});

//Models
const ettjModel = require('../src/model/ettj/ettj');

//Rotas
const indexRoute = require('../src/routes/index');
const ettjRoute = require('../src/routes/ettj-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/ettjs/', ettjRoute);

module.exports = app;