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
                return res.json({ message: 'Username or Password Incorrect' })
            } else {

                const token = jwt.sign({ userId: user._id, username: user.username }, secretKey, { expiresIn: '1h' });

                res.json({ message: 'Login Successfully', token })
            }
        } else {
            return res.json({ message: 'Username or Password Incorrect' })
        }
    } catch (error) {
        console.log(error)
    }
}

const Home = (req, res) => {
    const username = req.username
    console.log('this is home server')

    console.log(req.userId)
    res.json({ message: 'this home', username })

}

const verifyToken = (req, res, next) => {

    try {
        const token = req.headers['authorization'].split(' ')[1];
        console.log(token)

            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return res.json({ err: 'invalid token' })
                }
                req.userId = decoded.userId
                req.username = decoded.username
                
            })
            next()
    } catch (error) {
        console.log(error)
    }
}


module.exports = { Register, Welcome, Login, Home, verifyToken }