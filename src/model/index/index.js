'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const indexSchema = new Schema({
    businessDays: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    rateValue: {
        type: Number,
        required: true
    },
});

module.exports = {
    cdi: mongoose.model('CDI', indexSchema),
    ipca: mongoose.model('IPCA', indexSchema)
}