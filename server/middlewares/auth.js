const { User } = require('../models/index.js');
const { verifyToken } = require('../helpers/jwt.js');

const authentication = async (req, res, next) => {
    const token = req.headers.access_token;

    if(!token) {
        next({
            name: '401 Unauthorized',
            errors: {message: 'You have to logged in'}
        });
    } else {
        const payload = verifyToken(token);

        try {
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            });

            if(!user) {
                next({
                    name: '401 Unauthorized',
                    errors: {message: 'You have to logged in'}
                });     
            } else {
                req.userLogin = user;

                next();
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {authentication};