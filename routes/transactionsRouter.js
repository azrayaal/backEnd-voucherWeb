const transactionsController = require('../controller/transactionsController.js');

const express = require('express');
const router = express.Router();

router.post('/checkout', transactionsController.chechkOut);

module.exports = router;
