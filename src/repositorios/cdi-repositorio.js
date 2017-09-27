'use strict';

const mongoose = require('mongoose');
const CDIModel = mongoose.model('CDI');

exports.create = async(data) => {
    var novoCDI = new CDIModel(data);
    await novoCDI.save();
};

exports.get = async() => {
    var cdi = await CDIModel.find();
    return cdi;
};

exports.clear = async() => {
    await CDIModel.remove();
};