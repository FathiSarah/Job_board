const jwt = require("jsonwebtoken");
const secretKey = 'your-secret-key';

// Middleware function to authenticate JWT
function authenticateJWT(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token

    if (!token) {
        return res.sendStatus(403); // If no token, return an error
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403); // If the token is invalid, return an error
        }

        req.user = user; // If valid, store the user information in req.user
        next(); // Next middleware or route handler
    });
}

module.exports = authenticateJWT;