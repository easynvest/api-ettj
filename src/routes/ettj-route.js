'use strict';

const express = require('express');
const router = express.Router();
const ettjController = require('../controllers/ettj-controller');

router.get('/', ettjController.get);
router.get('/:id', ettjController.getById);
router.get('/index/:index', ettjController.getByIndex);

router.post('/', ettjController.post);

module.exports = router;