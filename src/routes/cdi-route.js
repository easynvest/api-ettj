'use strict';

const express = require('express');
const router = express.Router();
const cdiController = require('../controllers/cdi-controller');

router.get('/', cdiController.get);
router.get('/:businessDays', cdiController.getByBusinessDays);

module.exports = router;