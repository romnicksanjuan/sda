const express = require('express');
const {Register,Welcome} = require('../controller/userController')

const router = express.Router();

router.get('/', Welcome )
router.post('/register', Register)

module.exports = router