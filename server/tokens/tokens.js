const jwt = require("jsonwebtoken");

const tokens = {
    generateAccessToken(userId) {
        return jwt.sign({userId}, process.env.ACCESS_SECRET, {expiresIn: '15m'});
    },
    generateRefreshToken(userId) {
        return jwt.sign({userId}, process.env.REFRESH_SECRET, {expiresIn: '30d'});
    },
    verifyToken(token, secret) {
        try {
            return jwt.verify(token, secret);
        } catch (err) {
            console.error('Failed to verify token:', err);
            return null;
        }
    },
}

module.exports = tokens