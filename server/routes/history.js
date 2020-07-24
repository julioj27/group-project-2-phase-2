const express = require('express');

const historyController = require('../controllers/history-controller.js');
const { authentication } = require('../middlewares/auth.js');

const router = express();

router.get('/', authentication, historyController.getPlayerHistoryHandler);
router.post('/', authentication, historyController.postPlayerHistoryHandler);

module.exports = router;