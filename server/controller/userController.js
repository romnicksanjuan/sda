const e = require('express')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const user = require('../model/user')

const secretKey = 'nick14'

const Welcome = (req, res) => {
    res.json({ message: 'This is Welcome Page' })
}

const Register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const user = await User.findOne({username})
        if(user){
            return res.json({message:'User Already Exist'})
        }
        const saveUser = new User({ name, username, password })
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
                return res.status(400).json({ message: 'Username or Password Incorrect' })
            } else {

                const token = jwt.sign({ userId: user._id, name: user.name }, secretKey,);

                res.status(200).json({ message: 'Login Successfully', token })
            }
        } else {
            return res.status(400).json({ message: 'Username or Password Incorrect' })
        }
    } catch (error) {
        console.log(error)
    }
}

const Home = (req, res) => {
    const name = req.name
    // console.log(name)

    // console.log(req.userId)
   return res.json({ message: 'this is home', name })

}

const verifyToken = (req, res, next) => {

    try {
        const token = req.headers['authorization'].split(' ')[1];
        console.log(token)
        if(!token){
            return res.json({ err: 'no token provided' })
        }

            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return res.json({ err: 'token expired' })
                }
                req.userId = decoded.userId
                req.name = decoded.name
                
            })
            next()
    } catch (error) {
        console.log(error)
    }
}


module.exports = { Register, Welcome, Login, Home, verifyToken }