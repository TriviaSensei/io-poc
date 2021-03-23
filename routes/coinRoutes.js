const express = require('express');
const router = express.Router();
const coinController = require('../controllers/coinController');

router.route('/').get(coinController.flipCoin);
module.exports = router;
