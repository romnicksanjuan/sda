
const jwt = require('jsonwebtoken');
const secretKey = 'nick14'
const verifyToken = (req,res,next) => {
    // Get token from authorization header
    const token = req.headers['Authorization'];
    console.log(!token)

    if (!token) {
        // No token provided
        console.log({ error: 'Token not provided' })
        return res.json({ error: 'Token not provided' });
    }

    // Verify token
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
}

module.exports = verifyToken