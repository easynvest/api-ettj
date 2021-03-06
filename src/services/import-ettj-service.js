const convert = require('xml-js');
const axios = require('axios');

const IpcaRepository = require('../repositories/ipca-repositorio');
const CdiRepository = require('../repositories/cdi-repositorio');

const XmlFileUrl = 'http://www.anbima.com.br/est_termo/xml/CurvaZero.xml'

const downloadXmlFile = async (url) => {
    console.log(`- downloading xml file from (${url})`);
    const response = await axios.get(url, { responseType: 'json' });
    return response.data;
}

const parseJson = (xml) => {

    console.log('- parsing xml to structured json object');

    var json = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 4 }));

    // ATENÇÃO: 
    // Oss valores dos campos IPCA e Prefixados estão invertidos no xml baixado no link 'http://www.anbima.com.br/est_termo/xml/CurvaZero.xml'
    // Então:  IPCA => Pre
    //         Prefixados => IPCA

    const ettj = json.CURVA_ZERO.ETTJ.VERTICES.map(e => ({
        days: Number.parseInt(e._attributes.Vertice.replace(/\./g, '')),
        ipca: Number.parseFloat(e._attributes.Prefixados.replace(/\,/g, '.')), // => IPCA
        pre: e._attributes.IPCA.length > 0 ? Number.parseFloat(e._attributes.IPCA.replace(/\,/g, '.')) : null, // => Prefixados
        inflacao: e._attributes.Inflacao.length > 0 ? Number.parseFloat(e._attributes.Inflacao.replace(/\,/g, '.')) : null
    }));

    const circular_3316 = json.CURVA_ZERO.CIRCULAR_3361.CIRCULAR.map(c => ({
        days: Number.parseInt(c._attributes.Vertice.replace(/\./g, '')),
        rate: c._attributes.Taxa.length > 0 ? Number.parseFloat(c._attributes.Taxa.replace(/\,/g, '.')) : null
    }));

    const ettjMinDays = ettj.map(function (el) {
        return el.days;
    }).reduce(function (days) {
        return Math.min(days);
    });

    const circularDiff = circular_3316.filter(function (item) {
        return item.days < ettjMinDays;
    }).map(c => ({
        days: c.days,
        ipca: null,
        pre: c.rate,
        inflacao: null
    }));

    circularDiff.forEach(function (element) {
        ettj.push(element);
    }, this);

    return ettj;
}

const clearDatabase = async () => {

    console.log('- cleaning database');

    await IpcaRepository.clear();
    await CdiRepository.clear();
}

const importData = (data) => {

    console.log('- importing data');

    const ipca = data.filter(function (item) {
        return item.ipca != null
    }).map(e => ({
        businessDays: e.days,
        rateValue: e.ipca
    }));

    const cdi = data.filter(function (item) {
        return item.pre != null
    }).map(e => ({
        businessDays: e.days,
        rateValue: e.pre
    }));

    ipca.forEach(function (item) {
        IpcaRepository.create(item);
    }, this);

    cdi.forEach(function (item) {
        CdiRepository.create(item);
    }, this);
}

const sync = async () => {

    console.log('- sync process started');

    try {

        const xml = await downloadXmlFile(XmlFileUrl);
        const data = parseJson(xml);

        await clearDatabase();
        importData(data);

        console.log('- sync process finalized');

    } catch (error) {
        return console.error(error);
    }
}

module.exports = sync