'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ettjSchema = new Schema({
    businessDays: {
        type: Number,
        required: true
    },
    rateValue: {
        type: Number,
        required: true
    },    
});

module.exports = mongoose.model('Ettj', ettjSchema);