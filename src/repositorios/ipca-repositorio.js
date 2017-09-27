'use strict';

const mongoose = require('mongoose');
const IPCAModel = mongoose.model('IPCA');

exports.create = async(data) => {
    var ipcaModel = new IPCAModel(data);
    await ipcaModel.save();
};

exports.get = async() => {
    var ipca = await IPCAModel.find({}, 'businessDays rateValue');
    return ipca;
};

exports.clear = async() => {
    await IPCAModel.remove();
};