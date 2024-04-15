const express = require('express');
const {Register,Welcome,Login} = require('../controller/userController')

const router = express.Router();

router.get('/', Welcome )
router.post('/register', Register)
router.post('/login', Login)

module.exports = router