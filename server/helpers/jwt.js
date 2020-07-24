const jwt = require('jsonwebtoken');

const signToken = (payload) => {
    const token = jwt.sign(payload, 'secret');

    return token;
}

const verifyToken = (token) => {
    const payload = jwt.verify(token, 'secret');

    return payload;
}

module.exports = {signToken, verifyToken};