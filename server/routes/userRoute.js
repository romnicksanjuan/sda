const express = require('express');
const {Register} = require('../controller/userController')

const router = express.Router();
router.post('/register', Register)

module.exports = router