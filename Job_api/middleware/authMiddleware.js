const jwt = require("jsonwebtoken");
const secretKey = 'your-secret-key';

// Middleware function to authenticate JWT
function authenticateJWT(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        req.user = user; // Save user information for future use
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = authenticateJWT;