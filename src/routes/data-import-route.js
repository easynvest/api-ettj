const express = require('express');
const router = express.Router();
const dataImportController = require('../controllers/data-import-controller');

router.post('/', dataImportController.post);

module.exports = router;