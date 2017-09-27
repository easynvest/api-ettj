const ImportEttjService = require('../services/import-ettj-service');

exports.post = async(req, res, next) => {
    try {
        ImportEttjService();

        res.status(201).send({
            message: 'Ettj importado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao importar o Ettj!',
            error: error
        });
    }
};