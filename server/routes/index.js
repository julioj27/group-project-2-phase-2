const express = require('express');

const login = require('./login');
const register = require('./register');
const history = require('./history');

const router = express();

router.use('/login', login);
router.use('/register', register);
router.use('/history', history);

module.exports = router;