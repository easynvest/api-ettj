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

exports.getByBusinessDays = async(businessDays) => {
    let cdiResult = [];

    try {

        let cdi = await CDIModel.find({}, 'businessDays rateValue');

        let cdiMin = cdi
            .filter(function (item) {
                return item.businessDays <= businessDays;
            })
            .map(x => ({
                rateValue: x.rateValue,
                businessDays: x.businessDays
            }))
            .sort(function (a, b) {
                return b.businessDays - a.businessDays
            })[0];

        let cdiMax = cdi
            .filter(function (item) {
                return item.businessDays <= businessDays;
            })
            .map(x => ({
                rateValue: x.rateValue,
                businessDays: x.businessDays
            }))
            .sort(function (a, b) {
                return a.businessDays - b.businessDays
            })[0];

        if (cdiMin !== null) {
            cdiResult.push(cdiMin);
        }

        if (cdiMax !== null) {
            cdiResult.push(cdiMax);
        }


    } catch (error) {
        throw error;
    }

    return cdiResult;
};

exports.clear = async() => {
    await CDIModel.remove();
};