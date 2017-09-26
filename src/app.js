'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const router = express.Router();

mongoose.connect(config.connectionString, {
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
app.use('/ettj', ettjRoute);

module.exports = app;