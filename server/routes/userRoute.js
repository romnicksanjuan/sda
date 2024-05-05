const express = require('express');
const {Register,Welcome,Login,Dashboard, Profile, uploadProfile,uploadVideo,} = require('../controller/userController')
const verifyToken = require('../awt/awt')

const router = express.Router();

router.get('/', Welcome )
router.post('/register', Register)
router.post('/login', Login)
router.get('/dashboard',Dashboard)
router.get('/profile',verifyToken, Profile)
router.put('/profileImage/:userId', uploadProfile)
router.post('/uploadVideo/:userId', uploadVideo)

module.exports = router