const cdiRepositorio = require('../repositorios/cdi-repositorio');

exports.get = async(req, res, next) => {
    var cdi = await cdiRepositorio.get();
    res.status(200).send(cdi);
};

exports.getByBusinessDays = async(req, res, next) => {
    var cdi = await cdiRepositorio.getByBusinessDays(req.params.businessDays);
    res.status(200).send(cdi);
};