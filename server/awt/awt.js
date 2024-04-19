
const jwt = require('jsonwebtoken');
const secretKey = 'nick14'
const verifyToken = (req, res, next) => {

    try {
        const token = req.headers['authorization'].split(' ')[1];
        console.log({token:token})
        if(!token){
            return res.json({ err: 'no token provided' })
        }

            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return res.json({ err: 'token expired' })
                }
                req.userId = decoded.userId
                req.name = decoded.name
                req.username = decoded.username
                
            })
            next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = verifyToken