'use strict';

var mongoose = require('mongoose');
var ipcaRepositorio = require('../repositorios/ipca-repositorio');

exports.post = async(req, res, next) => {
    try {

        await ipcaRepositorio.create(req.body);
        res.status(201).send({
            message: 'IPCA criado com sucesso!'
        });

    } catch (error) {
        res.status(500).send({
            message: 'Falha ao criar o IPCA!',
            error: error
        });
    }
};

exports.get = async(req, res, next) => {
    var ipca = await ipcaRepositorio.get();
    res.status(200).send(ipca);
};