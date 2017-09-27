'use strict';

const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    res.status(200).send({
        titulo: "Easynvest Api ETTJ",
        version: '0.0.4'
    });
});

module.exports = router;