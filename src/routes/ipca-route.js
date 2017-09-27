'use strict';

const express = require('express');
const router = express.Router();
const ipcaController = require('../controllers/ipca-controller');

router.get('/', ipcaController.get);
router.get('/:businessDays', ipcaController.getByBusinessDays);

module.exports = router;