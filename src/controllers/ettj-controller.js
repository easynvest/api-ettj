'use strict';

var mongoose = require('mongoose');
var ettjRepositorio = require('../repositorios/ettj-repositorio');

exports.post = async(req, res, next) => {
    try {
        console.log(req.body);
        await ettjRepositorio.create(req.body);
        res.status(201).send({
            message: 'Ettj criado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao criar o Ettj!',
            error: error
        });
    }
};

exports.get = async(req, res, next) => {
    var ettj = await ettjRepositorio.get();
    res.status(200).send(ettj);
};

exports.getById = async(req, res, next) => {
    var ettj = await ettjRepositorio.getById(req.params.id);
    if (ettj === null) {
        res.status(404).send().end();
        return;
    }

    res.status(200).send(ettj);
};

exports.getByIndex = async(req, res, next) => {
    var ettj = await ettjRepositorio.getByIndex(req.params.index);
    res.status(200).send(ettj);
};