
const ipcaRepositorio = require('../repositorios/ipca-repositorio');

exports.get = async(req, res, next) => {
    var ipca = await ipcaRepositorio.get();
    res.status(200).send(ipca);
};