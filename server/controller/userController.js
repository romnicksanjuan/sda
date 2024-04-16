const e = require('express')
const User = require('../model/user')
const jwt = require('jsonwebtoken')

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

                const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

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
    res.json({ message: 'this home' })
    console.log('this is home server')

    console.log(req.userId)
}

const verifyToken = (req, res, next) => {
    // Get token from authorization header
    // const token = req.headers['authorization'];
    const {token} = req.body
    console.log(token)

    // if (!token) {
    //     console.log({ error: 'Token not provided' })
    //     return res.json({ error: 'Token not provided' });
    // }
    // Verify token
    try {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // Invalid token
                console.log({ error: 'Invalid token' })
                return res.status(401).json({ error: 'Invalid token' });
            }

            // Token is valid, attach decoded user ID to request object
            req.userId = decoded.userId;
            next();
        });
    } catch (error) {
        console.log(error)
    }
}


module.exports = { Register, Welcome, Login, Home, verifyToken }