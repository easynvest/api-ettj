const parser = require('xml-js');
const path = require('path');
const fs = require('fs');

const XML_PATH = path.resolve('EttjCurvaZero.xml');
const IpcaRepository = require('../repositorios/ipca-repositorio');
const CdiRepository = require('../repositorios/cdi-repositorio');

function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(XML_PATH, (err, data) => {
            try {
                var xml = data.toString();
                var json = parser.xml2json(xml, {compact: true, spaces: 4});
                resolve(json);
            } catch (error) {
                reject(err)
            }
        })
    })
}

function parseJson(jsonString){
    const originalJsonData = JSON.parse(jsonString);
   
    const circular_3316 = originalJsonData.CURVAZERO.CIRCULAR_3316.CIRCULAR.map(c => ({
        days: Number.parseInt(c._attributes.Vertices.replace(/\./g, '')),
        rate: c._attributes.Taxa.length > 0 ? Number.parseFloat(c._attributes.Taxa.replace(/\,/g, '.')) : null
    }));

    const ettj = originalJsonData.CURVAZERO.ETTJ.VERTICES.map(e => ({
        days: Number.parseInt(e._attributes.Vertice.replace(/\./g, '')),
        ipca: Number.parseFloat(e._attributes.IPCA.replace(/\,/g, '.')),
        pre: e._attributes.Prefixados.length > 0 ? Number.parseFloat(e._attributes.Prefixados.replace(/\,/g, '.')) : null,
        inflacao: e._attributes.Inflacao.length > 0 ? Number.parseFloat(e._attributes.Inflacao.replace(/\,/g, '.')) : null
    }));

    const ettjMinDays = ettj.map(function(el) {
        return el.days;
    }).reduce(function(days) {
        return Math.min(days);
    });

    const circularDiff = circular_3316.filter(function(item){
        return item.days < ettjMinDays;
    }).map(c=> ({
        days: c.days,
        ipca: null,
        pre: c.rate,
        inflacao: null
    }));

    circularDiff.forEach(function(element) {
        ettj.push(element);
    }, this);

    return ettj;
}

async function sync() {
    const jsonString = await readFile();
    const ettjData = parseJson(jsonString);

    const ipca = ettjData.filter(function(item){
        return item.ipca != null
    }).map(e=> ({
        businessDays: e.days,
        rateValue: e.ipca
    }));

    const cdi = ettjData.filter(function(item){
        return item.pre != null
    }).map(e=> ({
        businessDays: e.days,
        rateValue: e.pre
    }));
    
    await IpcaRepository.clear();
    await CdiRepository.clear();

    ipca.forEach(function(item){
        IpcaRepository.create(item);
    }, this);

    cdi.forEach(function(item){
        CdiRepository.create(item);
    }, this);
}

module.exports = sync