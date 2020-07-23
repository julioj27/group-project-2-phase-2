const { User } = require('../models/index');
const { comparePassword } = require('../helpers/bcryptjs.js');
const { signToken } = require('../helpers/jwt.js'); 

class UserController {
    static async postUserRegisterHandler(req, res, next) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        try {
            const user = await User.create(newUser);

            const createdUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt : user.updatedAt
            }

            res.status(201).json(createdUser);
        } catch (error) {
            next(error);
        }
    }

    static async postUserLoginHandler(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        try {
            const user = await User.findOne({
                where: {
                    email
                }
            });

            const dataPassword = user ? user.password : '';

            if(!user) {
                next({
                    name: '400 Bad Request',
                    errors: {message: 'Invalid username or password'}
                });
            } else if(!comparePassword(password, dataPassword)) {
                next({
                    name: '400 Bad Request',
                    errors: {message: 'Invalid username or password'}
                });
            } else {
                const payload = {
                    email: user.email
                };

                const token = signToken(payload);

                res.status(200).json({
                    name: user.name,
                    access_token: token
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;