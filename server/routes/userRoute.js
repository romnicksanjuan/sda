const express = require('express');
const {Register,Welcome,Login,Home} = require('../controller/userController')

const router = express.Router();

router.get('/', Welcome )
router.post('/register', Register)
router.post('/login', Login)
router.get('/home', Home)

module.exports = router