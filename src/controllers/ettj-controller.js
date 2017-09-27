'use strict';

const mongoose = require('mongoose');
const ettjRepositorio = require('../repositorios/ettj-repositorio');
const SyncEttjService = require('../services/sync-ettj');

exports.post = async(req, res, next) => {
    try {
        SyncEttjService();

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