'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const jobDataImport = require('./helpers/jobs/data-import')

const app = express();
const router = express.Router();

mongoose.connect(config.connectionString, {
    useMongoClient: true
});

//Models
const ettjModel = require('../src/model/ettj/ettj');
const indexModel = require('../src/model/index/index');

//Rotas
const indexRoute = require('../src/routes/index-route');
const cdiRoute = require('../src/routes/cdi-route');
const ipcaRoute = require('../src/routes/ipca-route');
const dataImportRoute = require('../src/routes/data-import-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/data-import', dataImportRoute)
app.use('/ipca', ipcaRoute);
app.use('/cdi', cdiRoute);

jobDataImport.start();

app.set('port', (process.env.PORT || 3000))
app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'))
});

// module.exports = app;