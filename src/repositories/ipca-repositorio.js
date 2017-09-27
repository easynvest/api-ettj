'use strict';

const mongoose = require('mongoose');
const IPCAModel = mongoose.model('IPCA');

exports.create = async(data) => {
    var ipcaModel = new IPCAModel(data);
    await ipcaModel.save();
};

exports.get = async() => {
    let ipca = await IPCAModel.find({}, 'businessDays rateValue');
    return ipca;
};

exports.getByBusinessDays = async(businessDays) => {
    let ipcaResult = [];

    try {

        let ipca = await IPCAModel.find({}, 'businessDays rateValue');

        let ipcaMin = ipca
            .filter(function (item) {
                return item.businessDays <= businessDays;
            })
            .map(x => ({
                rateValue: x.rateValue,
                businessDays: x.businessDays
            })).sort(function (a, b) {
                return b.businessDays - a.businessDays
            })[0];

        let ipcaMax = ipca
            .filter(function (item) {
                return item.businessDays >= businessDays;
            })
            .map(x => ({
                rateValue: x.rateValue,
                businessDays: x.businessDays
            })).sort(function (a, b) {
                return a.businessDays - b.businessDays
            })[0];

        ipcaResult.push(ipcaMin);
        ipcaResult.push(ipcaMax);
    } catch (error) {
        throw error;
    }

    return ipcaResult;
};

exports.clear = async() => {
    await IPCAModel.remove();
};