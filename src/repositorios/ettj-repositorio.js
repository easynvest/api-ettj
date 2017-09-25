'use strict';

const mongoose = require('mongoose');
const EttjModel = mongoose.model('Ettj');

exports.create = async (data) => {
    var novoEttj = new EttjModel(data);
    await novoEttj.save();
};

exports.get = async () => {
    var ettj = await EttjModel.find({

    }, 'dataSet');
    return ettj;
};

exports.getByIndex = async (index) => {
    var ettj = await EttjModel
        .find({
            index: index
        }, 'dataSet');
    return ettj;
};