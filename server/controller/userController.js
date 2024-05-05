const User = require('../model/user')
const Video = require('../model/video')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const secretKey = 'nick14'

const Welcome = (req, res) => {
    res.json({ message: 'This is Welcome Page' })
}

const Register = async (req, res) => {
    const { name, username, password, profileImage } = req.body;

    try {
        const user = await User.findOne({ username })
        if (user) {
            return res.json({ messageError: 'User Already Exist' })
        }
        const saveUser = new User({ name, username, password, profileImage })
        await saveUser.save();
        res.json({ message: 'registered success' })

    } catch (error) {
        console.error(error)
    }
}

const Login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username })

        if (user) {
            if (user.password !== password) {
                res.json({ error: 'Username or Password Incorrect' })
            } else {

                const token = jwt.sign({
                    userId: user._id,
                    name: user.name,
                    username: user.username,
                    // profileImage:user.profileImage
                }, secretKey,);

                res.status(200).json({ message: 'Login Successfully', token })
            }
        } else {
            res.json({ error: 'Username or Password Incorrect' })
        }
    } catch (error) {
        console.log(error)
    }
}

const Dashboard = async(req, res) => {
    // const _id = req.userId

    
    try {
        const video = await Video.find().populate('authorId').exec()
        
        const videos = video.map((vid) =>(
            {
                video:vid.video.toString('base64'),
                title:vid.title,
                author:vid.authorId.name,
                authorProfile:vid.authorId.profileImage
            }
        ))

        res.json(videos)
    } catch (error) {
        console.log(error)
    }
    

}

const Profile = async (req, res) => {
    const _id = req.userId

    try {
        const user = await User.findOne({_id})
        // console.log(user)
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
    
}

const uploadProfile = async (req, res) => {
    const _id = req.params.userId
    console.log(_id)

    const base64Image = req.body.uploadProfile
    // console.log(base64Image)
    try {
        await User.findByIdAndUpdate({_id}, { profileImage: base64Image })
        res.status(200).json({message:'Image Uploaded Successfully'})
        console.log('update success')
    } catch (error) {
        console.log(error)
    }
}


const uploadVideo = async(req,res) =>{
    const {userId} = req.params
    const {video} = req.body
    console.log(userId)
    console.log(video)
    const videoBuffer = Buffer.from(video, 'base64');
    try {
        const saveVideo = new Video({video:videoBuffer, authorId: userId})
        await saveVideo.save();
    } catch (error) {
        console.log(error)
    }
}




module.exports = { Register, Welcome, Login, Dashboard, Profile, uploadProfile,uploadVideo }