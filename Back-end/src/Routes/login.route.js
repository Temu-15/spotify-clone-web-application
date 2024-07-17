const express = require('express');
const router = express.Router();
const {Login}  = require('../Controllers/login.controller');

// setting up '/login' get request handler
router.get('/', Login);

module.exports = router;