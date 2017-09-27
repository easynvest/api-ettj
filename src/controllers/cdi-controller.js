'use strict';

var mongoose = require('mongoose');
var cdiRepositorio = require('../repositorios/cdi-repositorio');

exports.post = async(req, res, next) => {
    try {
        console.log(req.body);

        await cdiRepositorio.create(req.body);
        res.status(201).send({
            message: 'CDI criado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao criar o CDI!',
            error: error
        });
    }
};

exports.get = async(req, res, next) => {
    var cdi = await cdiRepositorio.get();
    res.status(200).send(cdi);
};