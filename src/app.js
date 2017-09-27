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
const indexModel = require('../src/model/index/index');

//Rotas
const cdiRoute = require('../src/routes/cdi-route');
const ipcaRoute = require('../src/routes/ipca-route');
const dataImportRoute = require('../src/routes/data-import-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//app.use('/', indexRoute);
app.use('/data-import', dataImportRoute)
app.use('/ipca', ipcaRoute);
app.use('/cdi', cdiRoute);

module.exports = app;