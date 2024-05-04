const User = require('../model/user')
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

const Home = async(req, res) => {
    const _id = req.userId
    // console.log(name)

    // console.log(req.userId)
    try {
        const data = await User.find({})
        return res.json(data)
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





const Video = (req,res) =>{
    res.json({ message: 'Video uploaded', file: req.file.path });
}


module.exports = { Register, Welcome, Login, Home, Profile, uploadProfile,Video }