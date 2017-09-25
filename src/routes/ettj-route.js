'use strict';

const express = require('express');
const router = express.Router();
const ettjController = require('../controllers/ettj-controller');

router.get('/', ettjController.get);
router.post('/', ettjController.post);
router.get('/index/:index', ettjController.getByIndex);

module.exports = router;