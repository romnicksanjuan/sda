const express = require('express');
const {Register,Welcome,Login,Home, Profile} = require('../controller/userController')
const verifyToken = require('../awt/awt')

const router = express.Router();

router.get('/', Welcome )
router.post('/register', Register)
router.post('/login', Login)
router.get('/home', verifyToken,Home)
router.get('/profile',verifyToken, Profile)

module.exports = router