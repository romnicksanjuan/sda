const express = require('express');
const multer =require('multer')
const {Register,Welcome,Login,Dashboard, Profile, uploadProfile,uploadVideo,} = require('../controller/userController')
const verifyToken = require('../awt/awt')
const path = require('path')

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to store uploaded videos
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique file names
    },
  });

  const upload = multer({ storage });

router.get('/', Welcome )
router.post('/register', Register)
router.post('/login', Login)
router.get('/dashboard', verifyToken,Dashboard)
router.get('/profile',verifyToken, Profile)
router.put('/profileImage/:userId', uploadProfile)
router.post('/uploadVideo/:userId', uploadVideo)

module.exports = router