
const cdiRepositorio = require('../repositorios/cdi-repositorio');

exports.get = async(req, res, next) => {
    var cdi = await cdiRepositorio.get();
    res.status(200).send(cdi);
};