const ipcaRepositorio = require('../repositories/ipca-repositorio');

exports.get = async(req, res, next) => {
    var ipca = await ipcaRepositorio.get();
    res.status(200).send(ipca);
};

exports.getByBusinessDays = async(req, res, next) => {
    var ipca = await ipcaRepositorio.getByBusinessDays(req.params.businessDays);
    res.status(200).send(ipca);
};